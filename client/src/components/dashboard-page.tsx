"use client";

import { useState } from "react";
import { initialTasks } from "@/lib/data";
import type { TaskData } from "@/lib/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import AzureDevOpsDashboard from "@/components/azure-devops-dashboard";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<TaskData[]>(initialTasks);

  const addTask = (task: TaskData) => {
    setTasks([...tasks, { ...task, id: `task-${Date.now()}` }]);
  };

  const updateTask = (updatedTask: TaskData) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <SidebarProvider>
      <AzureDevOpsDashboard
        tasks={tasks}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        onRemoveTask={removeTask}
      />
    </SidebarProvider>
  );
}
