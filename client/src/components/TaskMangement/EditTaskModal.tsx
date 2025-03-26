"use client"
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
  Typography,
} from "@mui/material"
import { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Close as CloseIcon } from "@mui/icons-material"
import type { Employee } from "@/types/Employee"
import type { TaskData } from "@/lib/types"

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: TaskData) => void
  task: TaskData
  employees: Employee[]
  currentUser: string
}

const validationSchema = Yup.object({
  title: Yup.string().max(100, "Task title can't exceed 100 characters").required("Task title is required"),
  description: Yup.string().max(500, "Description can't exceed 500 characters").required("Description is required"),
  assignedTo: Yup.string().required("Assigned employee is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
  deadline: Yup.string().required("Deadline is required"),
})

export function EditTaskModal({ isOpen, onClose, onSave, task, employees, currentUser }: EditTaskModalProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  // Format the date for the date input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const handleSave = (values: TaskData) => {
    // Add a work log entry if status has changed
    const updatedTask: TaskData = { ...values };

    onSave(updatedTask);
  };

  const handleClose = () => {
    onClose()
  }
  const handleEmployeeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
        Edit Task
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: task?.id || "",
            title: task?.title || "",
            description: task?.description || "",
            assignedTo: task?.assignedTo || "",
            priority: task?.priority || "",
            status: task?.status || "",
            deadline: formatDateForInput(task?.deadline || ""),
            createdAt: task?.createdAt || new Date().toISOString()
    
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize
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
                                         <InputLabel id="users-label">Team Members</InputLabel>
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
                                         <FormHelperText>Manage team members for this project</FormHelperText>
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
                  {/* Creation Info */}
                  <Grid item xs={12}>
                    <Box sx={{ mt: 2, color: "text.secondary", fontSize: "0.875rem" }}>
                      {task?.createdAt && <div>Created: {new Date(task.createdAt).toLocaleString()}</div>}
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
  )
}

