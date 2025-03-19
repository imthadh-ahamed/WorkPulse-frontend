"use client";

import type React from "react";

import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Footer } from "../../components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onSidebarToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            display: "flex",
            flexDirection: "column",
            pb: 16, // Increased padding at the bottom to prevent content from being hidden behind the footer
          }}
        >
          <Toolbar /> {/* This creates space below the header */}
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
