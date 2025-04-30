"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Badge,
  Chip,
} from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/Projects";

interface Task {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate: string;
  assignedUser: string;
  priority: "High" | "Medium" | "Low";
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

const users: User[] = [
  { id: "1", name: "Alice Johnson", avatar: "/images/avatar1.png" },
  { id: "2", name: "Bob Smith", avatar: "/images/avatar2.png" },
  { id: "3", name: "Charlie Brown", avatar: "/images/avatar3.png" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Landing Page",
    status: "To Do",
    dueDate: "2023-09-15",
    assignedUser: "Alice Johnson",
    priority: "High",
  },
  {
    id: "2",
    title: "Fix Login Bug",
    status: "In Progress",
    dueDate: "2023-09-18",
    assignedUser: "Bob Smith",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Prepare Presentation",
    status: "Done",
    dueDate: "2023-09-10",
    assignedUser: "Charlie Brown",
    priority: "Low",
  },
];

interface AdminTaskManagementProps {
  params: { projectId: string };
}

export default function TeamTaskDashboard({ params }: AdminTaskManagementProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [projectId, setProjectId] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchParams = async () => {
        const resolvedParams: { projectId: string } = await params;
        setProjectId(resolvedParams.projectId);
      };
      fetchParams();
    }, [params]);
  
    if (!projectId) {
      return <div>Loading...</div>;
    }
  
    const project = projects.find((p) => p.id === Number(projectId));
  
    if (!project) {
      return notFound(); // This will show Next.js' built-in 404 page
    }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const filteredTasks =
    selectedUser === "all"
      ? tasks
      : tasks.filter((task) => task.assignedUser === selectedUser);

  const groupedTasks = {
    "To Do": filteredTasks.filter((task) => task.status === "To Do"),
    "In Progress": filteredTasks.filter(
      (task) => task.status === "In Progress"
    ),
    Done: filteredTasks.filter((task) => task.status === "Done"),
  };

  const getPriorityChip = (priority: string) => {
    switch (priority) {
      case "High":
        return <Chip label="High" color="error" size="small" />;
      case "Medium":
        return <Chip label="Medium" color="warning" size="small" />;
      case "Low":
        return <Chip label="Low" color="success" size="small" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "Medium":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Low":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Team Task Dashboard
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="user-filter-label">Filter by User</InputLabel>
          <Select
            labelId="user-filter-label"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            label="Filter by User"
          >
            <MenuItem value="all">All Users</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Task Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={4}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <Grid item xs={12} md={4} key={status}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {status} <Badge badgeContent={tasks.length} color="primary" />
              </Typography>
              <Droppable droppableId={status}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: 2,
                      p: 2,
                      minHeight: 300,
                    }}
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              mb: 2,
                              boxShadow: 1,
                              "&:hover": { boxShadow: 3 },
                            }}
                          >
                            <CardContent>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                mb={1}
                              >
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  {task.title}
                                </Typography>
                                {getPriorityIcon(task.priority)}
                              </Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                              >
                                Due:{" "}
                                {format(new Date(task.dueDate), "MMM dd, yyyy")}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                  src={
                                    users.find(
                                      (user) => user.name === task.assignedUser
                                    )?.avatar
                                  }
                                  alt={task.assignedUser}
                                  sx={{ width: 24, height: 24 }}
                                />
                                <Typography variant="body2">
                                  {task.assignedUser}
                                </Typography>
                              </Box>
                              <Box mt={1}>{getPriorityChip(task.priority)}</Box>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
}
