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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { getAllEmployees } from "@/app/services/Employee/employee.service";

interface AddProjectModalProps {
  readonly isOpen: boolean;
  readonly resetForm: () => void
  readonly onClose: () => void;
  readonly onSave: (
    project: Omit<
      Project,
      "id" | "created" | "createdBy" | "modified" | "modifiedBy"
    >
  ) => void;
  readonly employees: Employee[];
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
  users: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required("Employee is required"),
      })
    )
    .min(1, "At least one user must be assigned to the project"),
});

export function AddProjectModal({
  isOpen,
  onClose,
  onSave,
  resetForm,
}: AddProjectModalProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const user = useSelector(
    (state: RootState) => state.user.userData
  ) as Employee | null;

  useEffect(() => {
    if (user?.tenantId) {
      fetchEmployees(user?.tenantId);
    }
  }, [user]);

  const fetchEmployees = async (tenantId: string) => {
    try {
      const fetchedEmployees = await getAllEmployees(
        tenantId,
        1,
        100,
        ""
      );
      setEmployees(fetchedEmployees.employees);
      console.log(fetchedEmployees, "Fetched Employees");
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleSave = (values: {
    name: string;
    description: string;
    displayName: string;
    isActive: boolean;
    users: Employee[];
    closed?: Date | null;
  }) => {
    const newProject = {
      ...values,
      created: new Date(),
      tenantId: user?.tenantId ?? "",
    };

    onSave(newProject);
    resetForm();
  };

  const handleClose = () => {
    onClose();
  };

  const handleEmployeeChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    setSelectedEmployees(selectedIds);
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
        Add Project
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            description: "",
            displayName: "",
            isActive: true,
            users: [],
            closed: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
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
                      <InputLabel id="users-label">
                        Assign Team Members
                      </InputLabel>
                      <Select
                        labelId="users-label"
                        multiple
                        value={selectedEmployees}
                        onChange={(e: SelectChangeEvent<string[]>) => {
                          handleEmployeeChange(e);
                          const selectedIds = e.target.value as string[];
                          setSelectedEmployees(selectedIds);
                          const selectedUsers = employees.filter(
                            (emp) =>
                              emp.id !== undefined &&
                              selectedIds.includes(emp.id)
                          );
                          setFieldValue("users", selectedUsers);
                        }}
                        renderValue={(selected) => {
                          const getEmployeeName = (id: string) => {
                            const emp = employees.find((e) => e.id === id);
                            return emp
                              ? `${emp.firstName} ${emp.lastName}`
                              : "";
                          };

                          const selectedNames = selected
                            .map(getEmployeeName)
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
                        At least one team member must be assigned to the project
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
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  Create Project
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
