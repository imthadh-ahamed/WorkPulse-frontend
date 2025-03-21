"use client";

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
} from "@mui/material";
import { Employee } from "@/types/Employee";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, "id">) => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(50, "First name can't exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .max(50, "Last name can't exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});

export function AddEmployeeModal({
  isOpen,
  onClose,
  onSave,
}: AddEmployeeModalProps) {
  const handleSave = (values: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    onSave(values); // Pass the form values to onSave callback
  };

  const handleClose = () => {
    onClose(); // Close the modal
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            role: "Employee",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <Field
                    required
                    name="firstName"
                    as={TextField}
                    label="First Name"
                    fullWidth
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={<ErrorMessage name="firstName" />}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Field
                    required
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={<ErrorMessage name="lastName" />}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Field
                    required
                    name="email"
                    as={TextField}
                    type="email"
                    label="Email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormControl
                    fullWidth
                    error={touched.role && Boolean(errors.role)}
                    required
                  >
                    <InputLabel>Role</InputLabel>
                    <Field
                      required
                      as={Select}
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Role"
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                    </Field>
                    <FormHelperText>
                      {touched.role && errors.role}
                    </FormHelperText>
                  </FormControl>
                </div>
              </div>
              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
