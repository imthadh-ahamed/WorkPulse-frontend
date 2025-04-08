"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import ProfileTab from "@/components/Settings/ProfileTab";
import NotificationsTab from "@/components/Settings/NotificationsTab";
import SecurityTab from "@/components/Settings/SecurityTab";
import PreferencesTab from "@/components/Settings/PreferencesTab";
import AccountTab from "@/components/Settings/AccountTab";

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
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
          <Tab label="Preferences" />
          <Tab label="Notifications" />
          <Tab label="Security" />
        </Tabs>
      </Box>

      <Card>
        <CardContent>
          {tabValue === 0 && <ProfileTab />}
          {tabValue === 1 && <AccountTab />}
          {tabValue === 2 && <PreferencesTab />}
          {tabValue === 3 && <NotificationsTab />}
          {tabValue === 4 && <SecurityTab />}
        </CardContent>
      </Card>
    </Container>
  );
}
