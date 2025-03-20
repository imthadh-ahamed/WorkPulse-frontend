"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  Badge,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizontal,
  Edit,
  Delete as Trash2,
  Error as AlertCircle,
  WatchLater as Clock,
  CheckCircle as CheckCircle2,
} from "@mui/icons-material";
import type { TaskData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { TaskEditDialog } from "./task-edit-dialog";

interface KanbanBoardProps {
  tasks: TaskData[];
  onUpdateTask: (task: TaskData) => void;
  onRemoveTask: (taskId: string) => void;
}

export function KanbanBoard({ tasks, onUpdateTask, onRemoveTask }: KanbanBoardProps) {
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<{ [key: string]: HTMLElement | null }>({});

  const columns = {
    pending: { id: "pending", title: "To Do", tasks: tasks.filter((task) => task.status === "pending") },
    "in-progress": { id: "in-progress", title: "In Progress", tasks: tasks.filter((task) => task.status === "in-progress") },
    completed: { id: "completed", title: "Done", tasks: tasks.filter((task) => task.status === "completed") },
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;
    onUpdateTask({ ...task, status: destination.droppableId });
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle fontSize="small" color="error" />;
      case "medium": return <Clock fontSize="small" color="warning" />;
      case "low": return <CheckCircle2 fontSize="small" color="success" />;
      default: return null;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", height: "100%" }}>
        {Object.values(columns).map((column) => (
          <div key={column.id} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              {column.title} <Badge color="primary">{column.tasks.length}</Badge>
            </Typography>

            <Droppable droppableId={column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ flex: 1, background: "#f5f5f5", borderRadius: "8px", padding: "8px", overflowY: "auto" }}>
                  {column.tasks.length === 0 ? (
                    <Typography color="textSecondary" align="center">No items</Typography>
                  ) : (
                    column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ marginBottom: "8px", background: "white", boxShadow: "2px 2px 5px rgba(0,0,0,0.1)" }}>
                            <CardContent>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <Typography variant="body2">Task {task.id.split("-")[1]}</Typography>
                                  {getPriorityIcon(task.priority)}
                                </div>

                                <IconButton size="small" onClick={(e) => setMenuAnchor({ ...menuAnchor, [task.id]: e.currentTarget })}>
                                  <MoreHorizontal fontSize="small" />
                                </IconButton>
                                <Menu anchorEl={menuAnchor[task.id]} open={Boolean(menuAnchor[task.id])} onClose={() => setMenuAnchor({ ...menuAnchor, [task.id]: null })}>
                                  <MenuItem onClick={() => setEditingTask(task)}><Edit fontSize="small" /> Edit</MenuItem>
                                  <MenuItem onClick={() => onRemoveTask(task.id)} style={{ color: "red" }}><Trash2 fontSize="small" /> Delete</MenuItem>
                                </Menu>
                              </div>

                              <Typography variant="subtitle1">{task.title}</Typography>
                              <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                              
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                                <Avatar>{task.assignedTo[0]}</Avatar>
                                <Typography variant="body2" color="textSecondary">{formatDate(task.deadline)}</Typography>
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
      {editingTask && <TaskEditDialog task={editingTask} open={!!editingTask} onOpenChange={() => setEditingTask(null)} onSave={(updatedTask) => { onUpdateTask(updatedTask); setEditingTask(null); }} />}
    </DragDropContext>
  );
}