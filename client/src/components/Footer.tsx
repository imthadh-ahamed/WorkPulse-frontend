import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Typography,
  Link,
  Box,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

export function Footer() {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={3}
      sx={{
        top: "auto",
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer + 2, // Increased z-index to be above drawer
        width: "100%",
      }}
    >
      <Toolbar sx={{ py: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Work Pulse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Streamline your HR operations and boost productivity.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Link href="/dashboard" color="text.secondary">
                  Dashboard
                </Link>
                <Link href="/employee-management" color="text.secondary">
                  Employees
                </Link>
                <Link href="/task-management" color="text.secondary">
                  Tasks
                </Link>
                <Link href="/settings" color="text.secondary">
                  Settings
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    © {new Date().getFullYear()} Work Pulse. All rights
                    reserved.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      aria-label="facebook"
                      color="primary"
                    >
                      <Facebook fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="twitter"
                      color="primary"
                    >
                      <Twitter fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="linkedin"
                      color="primary"
                    >
                      <LinkedIn fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="instagram"
                      color="primary"
                    >
                      <Instagram fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
