"use client";

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { Save as SaveIcon, Upload as UploadIcon } from "@mui/icons-material";

export default function ProfileTab() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          alt="John Doe"
          src="/placeholder.svg?height=80&width=80"
          sx={{ width: 80, height: 80, mr: 3 }}
        />
        <Box>
          <Typography variant="h6" gutterBottom>
            Profile Picture
          </Typography>
          <Button variant="outlined" startIcon={<UploadIcon />} size="small">
            Upload New Picture
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            defaultValue="John"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            defaultValue="Doe"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            defaultValue="john.doe@example.com"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Title"
            defaultValue="Work Pulse"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Department"
            defaultValue="Human Resources"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            defaultValue="HR professional with 5+ years of experience in talent acquisition and employee relations."
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" startIcon={<SaveIcon />}>
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
