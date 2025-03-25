"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { TaskData } from "@/lib/types";
import KanbanBoard from "@/components/kanban-board";

interface AzureDevOpsDashboardProps {
  tasks: TaskData[];
  onAddTask: (task: TaskData) => void;
  onUpdateTask: (task: TaskData) => void;
  onRemoveTask: (taskId: string) => void;
}

export default function AzureDevOpsDashboard({
  tasks,
  onUpdateTask,
  onRemoveTask,
}: AzureDevOpsDashboardProps) {
  return (
    <div className="azure-devops-dashboard">
      <main className="flex-1 overflow-auto p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center ml-auto">
            <Button className="bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-400 focus:bg-blue-400">
              <PlusCircle className="mr-1 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>
        <KanbanBoard
          tasks={tasks}
          onUpdateTask={onUpdateTask}
          onRemoveTask={onRemoveTask}
        />
      </main>
    </div>
  );
}
