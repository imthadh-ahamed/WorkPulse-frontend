"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Custom404Page() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token and redirect to login page
    Cookies.remove("token", { path: "/" });
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        It seems you&apos;ve hit a broken link or entered a URL that
        doesn&apos;t exist.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
