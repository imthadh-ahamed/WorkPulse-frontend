"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../globals.css";
import Image from "next/image";
import { useCreateTenantMutation } from "@/app/services/Tenant/tenantApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(50, "First Name must be within 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .max(50, "Last Name must be within 50 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  companyName: Yup.string().required("Company Name is required"),
});

export default function CreateOrganizationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createTenant, { isLoading, isSuccess, isError }] =
    useCreateTenantMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
  }

  // const handleSubmit = async (values: FormValues) => {
  //   console.log("Submitting form with values:", values);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8081/api/tenant/create",
  //       {
  //         firstName: values.firstName,
  //         lastName: values.lastName,
  //         email: values.email,
  //         password: values.password,
  //         companyName: values.companyName,
  //       }
  //     );
  //     console.log("Tenant created successfully:", response.data);
  //     alert("Tenant created successfully!");
  //     window.location.href = "/pages/dashboard";
  //   } catch (error: unknown) {
  //     if (axiosInstance.isAxiosError(error)) {
  //       console.error(
  //         "Error creating tenant:",
  //         error.response?.data || error.message
  //       );
  //       alert("Failed to create tenant. Please try again.");
  //     } else {
  //       console.error("Unexpected error:", error);
  //       alert("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  const handleSubmit = async (values: FormValues) => {
    try {
      await createTenant(values).unwrap();
      toast.success("Tenant created successfully!");
      window.location.href = "/pages/dashboard";
    } catch (error) {
      console.error("Failed to create tenant:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side with logo */}
      <Box
        sx={{
          width: "50%",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Work Pulse Logo"
            width={300}
            height={300}
          />
          <Typography variant="h3" component="h1" fontWeight="bold">
            Work Pulse
          </Typography>
          <Typography variant="h6" align="center">
            Create your organization and start managing your team
          </Typography>
        </Box>
      </Box>

      {/* Right side with organization creation form */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Create Organization
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Set up your organization and admin account
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 4 }}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                companyName: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="firstName"
                        label="Admin's First Name"
                        name="firstName"
                        autoFocus
                        error={touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="lastName"
                        label="Admin's Last Name"
                        name="lastName"
                        error={touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                  </Grid>

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Admin's Email"
                    name="email"
                    autoComplete="email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />

                  <FormControl
                    sx={{ mt: 2, width: "100%" }}
                    variant="outlined"
                    required
                    error={touched.password && !!errors.password}
                  >
                    <InputLabel htmlFor="password">
                      Admin&apos;s Password
                    </InputLabel>
                    <Field
                      as={OutlinedInput}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      error={touched.password && !!errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Admin's Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>

                  <FormControl
                    sx={{ mt: 2, width: "100%" }}
                    variant="outlined"
                    required
                    error={touched.confirmPassword && !!errors.confirmPassword}
                  >
                    <InputLabel htmlFor="confirmPassword">
                      Recheck Password
                    </InputLabel>
                    <Field
                      as={OutlinedInput}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Recheck Password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    error={touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Organization"}
                  </Button>
                  {isSuccess && (
                    <Typography color="success.main">
                      Tenant created successfully!
                    </Typography>
                  )}
                  {isError && (
                    <Typography color="error.main">
                      Failed to create tenant. Please try again.
                    </Typography>
                  )}
                </Form>
              )}
            </Formik>
          </Paper>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                href="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: "medium" }}
                >
                  Login
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Container>
        <ToastContainer />
      </Box>
    </Box>
  );
}
