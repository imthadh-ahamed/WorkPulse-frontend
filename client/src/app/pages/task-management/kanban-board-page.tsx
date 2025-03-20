"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, List, Grid } from "lucide-react"
import Link from "next/link"
import { initialTasks } from "@/lib/data"
import type { TaskData } from "@/lib/types"
import { KanbanBoard } from "./kanban-board"
import { TaskEditDialog } from "./task-edit-dialog"

export function KanbanBoardPage() {
  const [tasks, setTasks] = useState<TaskData[]>(initialTasks)
  const [editingTask, setEditingTask] = useState<TaskData | null>(null)

  const updateTask = (updatedTask: TaskData) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Task Management System</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Task Board</h2>
            <p className="text-sm text-muted-foreground">Visualize and manage your tasks</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Link href="/pages/task-management/board">
                <Button variant="ghost" size="sm" className="rounded-none px-3 bg-gray-100">
                  <Grid className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pages/task-management/list">
                <Button variant="ghost" size="sm" className="rounded-none px-3">
                  <List className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Link href="/pages/task-management/create">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <PlusCircle className="mr-1 h-4 w-4" />
                New Task
              </Button>
            </Link>
          </div>
        </div>

        <KanbanBoard tasks={tasks} onUpdateTask={updateTask} onRemoveTask={removeTask} />
      </main>

      {editingTask && (
        <TaskEditDialog
          task={editingTask}
          open={!!editingTask}
          onOpenChange={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            updateTask(updatedTask)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}

