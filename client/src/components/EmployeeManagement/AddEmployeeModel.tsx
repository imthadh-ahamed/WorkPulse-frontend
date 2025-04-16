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
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { Employee } from "@/types/Employee";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import { inviteEmployee } from "@/app/services/auth.service";
import "react-toastify/dist/ReactToastify.css";

interface AddEmployeeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (employee: Omit<Employee, "id">) => void;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid email address"
    ),
  role: Yup.string().required("Role is required"),
});

export function AddEmployeeModal({
  isOpen,
  onClose,
  onSave,
}: AddEmployeeModalProps) {

  const handleSave = async (values: {
    email: string;
    role: string;
  }) => {
    try {
      const employee = {
        tenantId: localStorage.getItem("tenantId") || "",
        isAdmin: values.role === "Admin",
        email: values.email,
        role: values.role,
      };

      await inviteEmployee(employee);
      toast.success("Employee invited successfully!");
      onSave(employee);
      onClose();
    } catch (error) {
      console.log("Error inviting employee:", error);
      toast.error("Failed to invite employee. Please try again.");
    }
  };

  const handleClose = () => {
    onClose(); // Close the modal
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
        Add Employee
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            email: "",
            role: "Employee",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                    <FormControl
                      fullWidth
                      error={touched.role && Boolean(errors.role)}
                      required
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                        },
                      }}
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
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                      </Field>
                      <FormHelperText>
                        {touched.role && errors.role}
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
                  Add Employee
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}
