"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import "../globals.css";
import { useLoginMutation } from "./services/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Validation Schema for Formik
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const cookieOptions = {
    path: "/",
  };

  // These would be connected to a real authentication system in a production app
  const initialValues = {
    email: "",
    password: "",
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values).unwrap();
      toast.success("Login successful!");
      console.log("Token:", response.token);

      if (response?.token) {
        Cookies.set("token", JSON.stringify(response.token), cookieOptions);
        window.location.href = "/pages/dashboard";
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password. Please try again.");
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
            Streamline your HR operations and boost productivity
          </Typography>
        </Box>
      </Box>

      {/* Right side with login form */}
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
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your credentials to access your account
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 4 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, touched, errors }) => (
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />

                  <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      label="Password"
                      error={Boolean(touched.password && errors.password)}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>

                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                  >
                    <Link
                      href="#"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="primary">
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don&apos;t have an organization?{" "}
              <Link
                href="/tenant"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: "medium" }}
                >
                  Create Organization
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
