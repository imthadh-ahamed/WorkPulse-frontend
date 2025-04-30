"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";
import type { Employee } from "@/types/Employee";


interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<{ title: string; description: string; assignedTo: string; priority: string; status: string; deadline: string; }, "id" | "createdAt">) => void;
  employees: Employee[];
  currentUser: string
}

const validationSchema = Yup.object({
  title: Yup.string().max(100, "Task title can't exceed 100 characters").required("Task title is required"),
  description: Yup.string().max(500, "Description can't exceed 500 characters").required("Description is required"),
  assignedTo: Yup.string().required("Assigned employee is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
  deadline: Yup.date()
    .min(new Date(), "Deadline cannot be in the past")
    .required("Deadline is required"),
});

const isFormValid = (values: any) => {
  return (
    values.title &&
    values.description &&
    values.assignedTo &&
    values.priority &&
    values.status &&
    values.deadline
  );
};

export function AddTaskModal({ isOpen, onClose, onSave, employees, currentUser }: AddTaskModalProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  const handleSave = (values: {
    title: string;
    description: string;
    assignedTo: Employee[];
    priority: string;
    status: string;
    deadline: string;
  }) => {
    // Create a new task object
    const newTask = {
      ...values,
      assignedTo: values.assignedTo.map((emp) => `${emp.firstName} ${emp.lastName}`).join(", "),
      createdAt: new Date(),
      createdBy: currentUser,
    };

    onSave(newTask);
  };

  const handleClose = () => {
    onClose();
  };

  const handleEmployeeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number[]
    setSelectedEmployees(value)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        Add Task
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: "",
            description: "",
            assignedTo:[],
            priority: "",
            status: "",
            deadline: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
            <Form>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      name="title"
                      as={TextField}
                      label="Task Title"
                      fullWidth
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.title && Boolean(errors.title)}
                      helperText={<ErrorMessage name="title" />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "#333",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      name="deadline"
                      as={TextField}
                      label="Deadline"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={values.deadline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.deadline && Boolean(errors.deadline)}
                      helperText={<ErrorMessage name="deadline" />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "#333",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      name="description"
                      as={TextField}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && Boolean(errors.description)}
                      helperText={<ErrorMessage name="description" />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "#333",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <FormControl
                       fullWidth
                       sx={{
                         "& .MuiInputLabel-root": {
                           fontSize: "1.1rem",
                         },
                       }}
                     >
                      <InputLabel id="users-label">Assign Team Members</InputLabel>
                      <Select
                        labelId="users-label"
                        multiple
                        value={selectedEmployees}
                        onChange={(e: any) => {
                          handleEmployeeChange(e)
                          const selectedIds = e.target.value as number[]
                          const selectedUsers = employees.filter((emp) => selectedIds.includes(emp.id))
                          setFieldValue("users", selectedUsers)
                        }}                                                                                 
                        renderValue={(selected) => {
                          const selectedNames = (selected as number[])
                            .map((id) => {
                              const emp = employees.find((e) => e.id === id)
                              return emp ? `${emp.firstName} ${emp.lastName}` : ""
                            })
                            .join(", ")
                          return selectedNames
                        }}
                        sx={{
                          borderRadius: "8px",
                        }}                        
                      >
                        {employees.map((employee) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName} ({employee.role})
                          </MenuItem>
                        ))}                                                        
                      </Select>
                      <FormHelperText>Optional: Select team members for this task</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={touched.priority && Boolean(errors.priority)}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <InputLabel id="priority-label">Priority</InputLabel>
                      <Select
                        labelId="priority-label"
                        name="priority"
                        value={values.priority}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                      </Select>
                      <FormHelperText>
                        <ErrorMessage name="priority" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={touched.status && Boolean(errors.status)}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                      <FormHelperText>
                        <ErrorMessage name="status" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <DialogActions sx={{ mt: 2, justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={!isFormValid(values)}
                  sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  }}
                >
                  Create Task
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}