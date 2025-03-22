"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CircuitBoardIcon as Board, PlusCircle, Search, Bell, HelpCircle } from "lucide-react"
import type { TaskData } from "@/lib/types"
import KanbanBoard from "@/components/kanban-board"


interface AzureDevOpsDashboardProps {
  tasks: TaskData[]
  onAddTask: (task: TaskData) => void
  onUpdateTask: (task: TaskData) => void
  onRemoveTask: (taskId: string) => void
}

export default function AzureDevOpsDashboard({
  tasks,
  onAddTask,
  onUpdateTask,
  onRemoveTask,
}: AzureDevOpsDashboardProps) {
  

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="azure-devops-dashboard">
      {/* Main content */}
      <main className="flex-1 overflow-auto p-3"> {/* Reduced padding */}
        <div className="flex items-center justify-between mb-2"> {/* Reduced margin */}
          <div>
            <h1 className="text-2xl font-semibold">Task Board</h1>
            <p className="text-sm text-muted-foreground">Visualize and manage your work items</p>
          </div>

          <div className="flex items-center gap-2">
            <Button className="bg-black/100 text-white rounded-md shadow-md hover:bg-black/80 focus:bg-black/80">
              <PlusCircle className="mr-1 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <KanbanBoard tasks={tasks} onUpdateTask={onUpdateTask} onRemoveTask={onRemoveTask} />
        
      </main>
    </div>
  )
}
