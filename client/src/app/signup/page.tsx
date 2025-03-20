"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string().max(50, "Too Long!").required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
            Join our platform and streamline your HR operations
          </Typography>
        </Box>
      </Box>

      {/* Right side with signup form */}
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
              Create an account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign up to access Work Pulse
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 4 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                // In a real app, this would register the user and redirect
                setTimeout(() => {
                  console.log("Signup values:", values);
                  router.push("/dashboard");
                  setSubmitting(false);
                }, 500);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        autoFocus
                        error={Boolean(errors.firstName && touched.firstName)}
                        helperText={<ErrorMessage name="firstName" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        error={Boolean(errors.lastName && touched.lastName)}
                        helperText={<ErrorMessage name="lastName" />}
                      />
                    </Grid>
                  </Grid>

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    error={Boolean(errors.email && touched.email)}
                    helperText={<ErrorMessage name="email" />}
                  />

                  <FormControl
                    sx={{ mt: 2, width: "100%" }}
                    variant="outlined"
                    required
                    error={touched.password && !!errors.password}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
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
                      label="Password *"
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
                      Confirm Password
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
                      label="Confirm Password *"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </Button>
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
      </Box>
    </Box>
  );
}
