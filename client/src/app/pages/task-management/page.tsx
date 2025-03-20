"use client";

import type React from "react";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Chip,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

// Sample task data
const tasks: Task[] = [
  {
    id: 1,
    title: "Complete Q3 Report",
    dueDate: "2023-09-30",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Client Meeting Preparation",
    dueDate: "2023-09-15",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Update Employee Handbook",
    dueDate: "2023-09-20",
    priority: "Low",
    completed: false,
  },
  {
    id: 4,
    title: "Review Budget Proposal",
    dueDate: "2023-09-25",
    priority: "High",
    completed: true,
  },
  {
    id: 5,
    title: "Team Building Event Planning",
    dueDate: "2023-10-05",
    priority: "Medium",
    completed: false,
  },
];

export default function TaskManagementPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredTasks = tasks.filter((task) => {
    if (tabValue === 0) return !task.completed; // Active
    if (tabValue === 1) return task.completed; // Completed
    return true; // All
  });

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Task Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Task
        </Button>
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="task tabs"
          >
            <Tab label="Active" />
            <Tab label="Completed" />
            <Tab label="All" />
          </Tabs>
        </Box>
        <CardContent>
          <List>
            {filteredTasks.map((task) => (
              <Box key={task.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={`Due: ${task.dueDate}`}
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  />
                  <Chip
                    label={task.priority}
                    color={
                      task.priority === "High"
                        ? "error"
                        : task.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
