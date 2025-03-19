"use client"

import Link from "next/link"
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Avatar, Badge, alpha, styled } from "@mui/material"
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}))

interface HeaderProps {
  onSidebarToggle: () => void
}

export function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Typography
              variant="body1"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              My Work
            </Typography>

            <Typography
              variant="body1"
              component={Link}
              href="/dashboard"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "medium",
              }}
            >
              Dashboard
            </Typography>

            <Typography
              variant="body1"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Gmail
            </Typography>

            <Typography
              variant="body1"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Apps
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="large" aria-label="show notifications" color="inherit">
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
  )
}

