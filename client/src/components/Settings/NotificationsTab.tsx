"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
} from "@mui/material";

export default function NotificationsTab() {
  return (
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
  );
}
