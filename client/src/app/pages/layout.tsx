"use client";

import React, { useEffect, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { Footer } from "@/components/common/Footer";
import { useSelector, useDispatch } from "react-redux";
import { isAdmin, userData } from "../redux/reducer/userSlice";
import { getCurrentUser } from "../services/auth.service";
import { RootState } from "../redux/store";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (!user) {
      getCurrentUser((res) => {
        if (res?.status === 200 && res.data) {
          const tenantId = res.data.tenantId;
          dispatch(userData(res.data));
          dispatch(isAdmin(res.data.isAdmin));
          localStorage.setItem("tenantId", tenantId);
        } else if (res?.status == 401) {
          // logout
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          // other error
          console.error(
            "An unexpected error occurred:",
            res?.data || "Unknown error"
          );
          // window.location.href = "/error";

        }
      });
    }
  }, [user]);
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
