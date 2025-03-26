"use client";

import type React from "react";

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
  Switch,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import type { Employee } from "@/types/Employee";
import type { Project } from "@/types/Projects";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project: Project;
  employees: Employee[];
  currentUser: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .max(100, "Project name can't exceed 100 characters")
    .required("Project name is required"),
  description: Yup.string()
    .max(500, "Description can't exceed 500 characters")
    .required("Description is required"),
  displayName: Yup.string()
    .max(100, "Display name can't exceed 100 characters")
    .required("Display name is required"),
  isActive: Yup.boolean().required("Status is required"),
  users: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
    })
  ),
});

export function EditProjectModal({
  isOpen,
  onClose,
  onSave,
  project,
  employees,
  currentUser,
}: EditProjectModalProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  // Initialize selected employees from project.users
  useEffect(() => {
    if (project && project.users && project.users.length > 0) {
      const employeeIds = project.users.map((user) => user.id);
      setSelectedEmployees(employeeIds);
    } else {
      setSelectedEmployees([]);
    }
  }, [project]);

  const handleSave = (values: Project) => {
    // Update the modified fields
    const updatedProject = {
      ...values,
      modified: new Date(),
      modifiedBy: currentUser,
    };

    onSave(updatedProject);
  };

  const handleClose = () => {
    onClose();
  };

  const handleEmployeeChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setSelectedEmployees(value);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        Edit Project
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: project?.id || 0,
            name: project?.name || "",
            description: project?.description || "",
            isActive: project?.isActive ?? true,
            users: project?.users || [],
            closed: project?.closed || null,
            created: project?.created || null,
            createdBy: project?.createdBy || "",
            modified: project?.modified || null,
            modifiedBy: project?.modifiedBy || "",
            displayName: project?.displayName || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            touched,
            errors,
          }) => (
            <Form>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      name="name"
                      as={TextField}
                      label="Project Name"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={<ErrorMessage name="name" />}
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
                      name="displayName"
                      as={TextField}
                      label="Display Name"
                      fullWidth
                      value={values.displayName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.displayName && Boolean(errors.displayName)}
                      helperText={<ErrorMessage name="displayName" />}
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
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.isActive}
                          onChange={(e) => {
                            setFieldValue("isActive", e.target.checked);
                            // If project is being deactivated, set closed date
                            if (!e.target.checked && !values.closed) {
                              setFieldValue("closed", new Date());
                            } else if (e.target.checked) {
                              // If project is being reactivated, clear closed date
                              setFieldValue("closed", null);
                            }
                          }}
                          name="isActive"
                          color="primary"
                        />
                      }
                      label="Active Project"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <InputLabel id="users-label">Team Members</InputLabel>
                      <Select
                        labelId="users-label"
                        multiple
                        value={selectedEmployees}
                        onChange={(e: SelectChangeEvent<number[]>) => {
                          handleEmployeeChange(e);
                          const selectedIds = e.target.value as number[];
                          const selectedUsers = employees.filter((emp) =>
                            selectedIds.includes(emp.id)
                          );
                          setFieldValue("users", selectedUsers);
                        }}
                        renderValue={(selected) => {
                          const selectedNames = (selected as number[])
                            .map((id) => {
                              const emp = employees.find((e) => e.id === id);
                              return emp
                                ? `${emp.firstName} ${emp.lastName}`
                                : "";
                            })
                            .join(", ");
                          return selectedNames;
                        }}
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        {employees.map((employee) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName} (
                            {employee.role})
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        Manage team members for this project
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {/* Display creation and modification info */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      {project?.created && (
                        <div>
                          Created: {new Date(project.created).toLocaleString()}{" "}
                          by {project.createdBy}
                        </div>
                      )}
                      {project?.modified && project?.modifiedBy && (
                        <div>
                          Last Modified:{" "}
                          {new Date(project.modified).toLocaleString()} by{" "}
                          {project.modifiedBy}
                        </div>
                      )}
                    </Box>
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
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
