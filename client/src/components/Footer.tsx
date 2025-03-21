import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Typography,
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
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Work Pulse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Streamline your HR operations and boost productivity.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
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
