"use client";

import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Employee } from "@/types/Employee";
import { ExitToApp } from "@mui/icons-material";
import { User } from "lucide-react";

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export function ProfileMenu({
  anchorEl,
  isOpen,
  onClose,
  employee,
}: ProfileMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: {
          overflow: "visible",
          mt: 1.5,
          minWidth: 200,
          borderRadius: 1,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* Profile Section */}
      <MenuItem
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "8px 16px",
          pointerEvents: "none", // Make the item not clickable
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {employee.firstName} {employee.lastName}
        </Typography>
      </MenuItem>
      <Divider />

      {/* Profile */}
      <MenuItem
        onClick={() => (window.location.href = "/pages/settings")}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemIcon>
          <User fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Profile</Typography>
      </MenuItem>

      {/* Logout */}
      <MenuItem
        onClick={() => (window.location.href = "/")}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );
}
