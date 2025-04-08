"use client";

import React from "react";
import { List, ListItem, ListItemText, Button, Divider } from "@mui/material";

export default function PreferencesTab() {
  return (
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
  );
}
