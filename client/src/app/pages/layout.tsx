"use client";

import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { Footer } from "@/components/common/Footer";

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
      {/* Header */}
      <Header onSidebarToggle={handleDrawerToggle} />
      {/* Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
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
      {/* Footer */}
      <Footer />
      {/* Global Focus Timer */}
    </Box>
  );
}
