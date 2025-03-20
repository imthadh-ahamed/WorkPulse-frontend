"use client";

// import Link from "next/link"
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Badge,
  styled,
  Typography,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Image from "next/image";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "grey.800",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Image src="/images/logo.png" alt="Logo" width={70} height={70} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton size="large" aria-label="help" color="inherit">
            <HelpIcon />
          </IconButton>

          <IconButton size="large" aria-label="settings" color="inherit">
            <SettingsIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <Avatar alt="John Doe" src="/placeholder.svg?height=32&width=32" />
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                fontWeight: "medium",
                display: { xs: "none", md: "block" },
              }}
            >
              John Doe
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
