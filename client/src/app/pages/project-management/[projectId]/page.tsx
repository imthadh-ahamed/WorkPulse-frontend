"use client";

import { notFound } from "next/navigation";
import { Box, Typography, Container } from "@mui/material";
import { projects } from "@/app/data/Projects";
import { useState, useEffect } from "react";
import { initialTasks } from "@/components/TaskManagement/lib/data";
import type { TaskData } from "@/components/TaskManagement/lib/types";
import Button from "@mui/material/Button";
import { PlusCircle } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Badge } from "@/components/TaskManagement/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/TaskManagement/ui/dropdown-menu";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Trash2,
  Edit,
} from "lucide-react";
import { formatDate } from "@/components/TaskManagement/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function ProjectTaskManagementPage({
  params,
}: {
  readonly params: { projectId: string };
}) {
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

  const DashboardPage = () => {
    const [tasks, setTasks] = useState<TaskData[]>(initialTasks);

    const updateTask = (updatedTask: TaskData) => {
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    };

    const removeTask = (taskId: string) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleDragEnd = (result: DropResult) => {
      const { destination, source, draggableId } = result;

      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return;
      }

      const task = tasks.find((t) => t.id === draggableId);
      if (!task) return;

      const updatedTask = {
        ...task,
        status: destination.droppableId,
      };

      updateTask(updatedTask);
    };

    const getPriorityIcon = (priority: string) => {
      switch (priority) {
        case "high":
          return <AlertCircle className="h-3 w-3 text-red-600" />;
        case "medium":
          return <Clock className="h-3 w-3 text-amber-500" />;
        case "low":
          return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
        default:
          return null;
      }
    };

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    };

    const columns = {
      pending: {
        id: "pending",
        title: "To Do",
        tasks: tasks.filter((task) => task.status === "pending"),
      },
      "in-progress": {
        id: "in-progress",
        title: "In Progress",
        tasks: tasks.filter((task) => task.status === "in-progress"),
      },
      completed: {
        id: "completed",
        title: "Done",
        tasks: tasks.filter((task) => task.status === "completed"),
      },
    };

    return (
      <div className="azure-devops-dashboard">
        <main className="flex-1 overflow-auto p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center ml-auto">
              <Button
                variant="contained"
                startIcon={<PlusCircle className="mr-1 h-4 w-4" />}
                onClick={() => {}}
              >
                New Task
              </Button>
            </div>
          </div>
          <div className="h-full">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-3 gap-4 h-full">
                {Object.values(columns).map((column) => (
                  <div key={column.id} className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2 px-2">
                      <h3 className="font-medium text-sm">
                        {column.title}{" "}
                        <Badge variant="outline" className="ml-1">
                          {column.tasks.length}
                        </Badge>
                      </h3>
                    </div>

                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex-1 bg-gray-100 rounded-md p-2 overflow-y-auto"
                        >
                          {column.tasks.length === 0 ? (
                            <div className="h-20 flex items-center justify-center text-sm text-muted-foreground border border-dashed border-gray-300 rounded-md">
                              No items
                            </div>
                          ) : (
                            column.tasks.map((task, index) => (
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
                                    className="mb-2 bg-white shadow-sm hover:shadow-md transition-shadow"
                                  >
                                    <CardContent className="p-3">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                          <span>
                                            Task {task.id.split("-")[1]}
                                          </span>
                                          {getPriorityIcon(task.priority)}
                                        </div>

                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button
                                              variant="text"
                                              size="small"
                                              className="h-6 w-6 p-0"
                                            >
                                              <MoreHorizontal className="h-3 w-3" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent
                                            align="end"
                                            className="bg-white/80 backdrop-blur-sm shadow-md border rounded-md"
                                          >
                                            <DropdownMenuItem>
                                              <Edit className="mr-2 h-4 w-4" />
                                              Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() =>
                                                removeTask(task.id)
                                              }
                                              className="text-destructive focus:text-destructive"
                                            >
                                              <Trash2 className="mr-2 h-4 w-4" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>

                                      <h4 className="font-medium mb-1">
                                        {task.title}
                                      </h4>
                                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                        {task.description}
                                      </p>

                                      <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                          <Avatar className="h-5 w-5">
                                            <AvatarFallback className="text-[10px]">
                                              {getInitials(task.assignedTo)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <span className="text-muted-foreground">
                                            {task.assignedTo.split(" ")[0]}
                                          </span>
                                        </div>

                                        <div className="text-muted-foreground">
                                          {formatDate(task.deadline)}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            ))
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
        </main>
      </div>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {project.name} Task Management
        </Typography>
        <DashboardPage />
      </Box>
    </Container>
  );
}
