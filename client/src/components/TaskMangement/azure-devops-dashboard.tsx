"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { TaskData } from "@/lib/types"
import { Employees } from "@/app/data/Employee";
import KanbanBoard from "@/components/TaskMangement/kanban-board"
import { AddTaskModal } from "@/components/TaskMangement/AddTaskModal"

interface AzureDevOpsDashboardProps {
  tasks: TaskData[]
  onAddTask: (task: Omit<TaskData, "id" | "createdAt">) => void
  onUpdateTask: (task: TaskData) => void
  onRemoveTask: (taskId: string) => void
}

export default function AzureDevOpsDashboard({
  tasks = [],
  onAddTask,
  onUpdateTask,
  onRemoveTask,
}: AzureDevOpsDashboardProps) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  return (
    <div className="azure-devops-dashboard">
      {/* Main content */}
      <main className="flex-1 overflow-auto p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold">Task Board</h1>
            <p className="text-sm text-muted-foreground">Visualize and manage your work items</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-black/100 text-white rounded-md shadow-md hover:bg-black/80 focus:bg-black/80"
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              <PlusCircle className="mr-1 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <KanbanBoard tasks={tasks} onUpdateTask={onUpdateTask} onRemoveTask={onRemoveTask} />

        {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSave={(newTask: Omit<TaskData, "id" | "createdAt" | "logs">) => {
          onAddTask(newTask)
          setIsAddTaskModalOpen(false)
        }}
        employees={Employees} // Replace with the actual list of employees or fetch it dynamically
        currentUser="currentUserId" // Replace "exampleUser" with the actual current user value
      />
      </main>
    </div>
  )
}

