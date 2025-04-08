"use client";

import React from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function SecurityTab() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Change Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Update Password</Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        Two-Factor Authentication
      </Typography>
      <FormControlLabel
        control={<Switch />}
        label="Enable two-factor authentication"
      />
    </Box>
  );
}
