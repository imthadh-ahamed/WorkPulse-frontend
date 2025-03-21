"use client";

// import Link from "next/link"
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Badge,
  Typography,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Help as HelpIcon,
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

          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <Avatar>
              {"John Doe"
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                fontWeight: "bold",
                display: { sm: "none", md: "block" },
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
