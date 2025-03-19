"use client";

import type React from "react";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { Save as SaveIcon, Upload as UploadIcon } from "@mui/icons-material";

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Settings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
        >
          <Tab label="Profile" />
          <Tab label="Account" />
          <Tab label="Notifications" />
          <Tab label="Security" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Card>
          <CardContent>
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
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  size="small"
                >
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
                  defaultValue="HR Manager"
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
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Language" secondary="English (US)" />
                <Button size="small">Change</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Time Zone"
                  secondary="(GMT-05:00) Eastern Time"
                />
                <Button size="small">Change</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Date Format" secondary="MM/DD/YYYY" />
                <Button size="small">Change</Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive notifications via email"
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Task Reminders"
                  secondary="Get reminders for upcoming tasks"
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Announcement Alerts"
                  secondary="Receive alerts for new announcements"
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {tabValue === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
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
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
