"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, Send } from "lucide-react"
import type { TaskData } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface DailySummaryPreviewProps {
  tasks: TaskData[]
}

export default function DailySummaryPreview({ tasks }: DailySummaryPreviewProps) {
  const [emailTime, setEmailTime] = useState("18:00")
  const [emailRecipients, setEmailRecipients] = useState("admin@example.com")
  const [includeCompleted, setIncludeCompleted] = useState(true)
  const [includePending, setIncludePending] = useState(true)
  const [includeInProgress, setIncludeInProgress] = useState(true)

  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0]

  // Filter tasks based on settings
  const filteredTasks = (tasks ?? []).filter((task) => {
    if (task.status === "completed" && !includeCompleted) return false
    if (task.status === "pending" && !includePending) return false
    if (task.status === "in-progress" && !includeInProgress) return false
    return true
  })

  // Group tasks by assignee
  const tasksByAssignee: Record<string, TaskData[]> = {}
  filteredTasks.forEach((task) => {
    if (!tasksByAssignee[task.assignedTo]) {
      tasksByAssignee[task.assignedTo] = []
    }
    tasksByAssignee[task.assignedTo].push(task)
  })

  // Calculate statistics
  const completedCount = filteredTasks.filter((t) => t.status === "completed").length
  const pendingCount = filteredTasks.filter((t) => t.status === "pending").length
  const inProgressCount = filteredTasks.filter((t) => t.status === "in-progress").length
  const totalCount = filteredTasks.length

  // Calculate completion percentage
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  // Get status badge with color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500 text-white">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-amber-500 text-white">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-500 text-white">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 pl-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Settings</h3>

          <div className="grid gap-2">
            <Label htmlFor="email-time">Daily Summary Time</Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input id="email-time" type="time" value={emailTime} onChange={(e) => setEmailTime(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email-recipients">Recipients</Label>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input
                id="email-recipients"
                type="text"
                placeholder="email@example.com, email2@example.com"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Include Task Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="include-completed" checked={includeCompleted} onCheckedChange={setIncludeCompleted} />
                <Label htmlFor="include-completed" className="flex items-center gap-2">
                  Completed Tasks
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-in-progress" checked={includeInProgress} onCheckedChange={setIncludeInProgress} />
                <Label htmlFor="include-in-progress" className="flex items-center gap-2">
                  In Progress Tasks
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-pending" checked={includePending} onCheckedChange={setIncludePending} />
                <Label htmlFor="include-pending" className="flex items-center gap-2">
                  Pending Tasks
                  <span className="w-3 h-3 rounded-full bg-gray-500 inline-block"></span>
                </Label>
              </div>
            </div>
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800">
            <Send className="mr-2 h-4 w-4" />
            Save Email Settings
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Email Preview</h3>
          <Card className="border border-muted">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">From: Task Management System</div>
                <div className="text-sm text-muted-foreground">To: {emailRecipients}</div>
                <div className="text-sm text-muted-foreground">Subject: Daily Task Summary - {formatDate(today)}</div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Daily Task Summary - {formatDate(today)}</h4>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-gray-100 p-2 rounded-md border-t-4 border-black">
                    <div className="text-2xl font-bold">{totalCount}</div>
                    <div className="text-xs text-muted-foreground">Total Tasks</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md border-t-4 border-emerald-500">
                    <div className="text-2xl font-bold">{completedCount}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md border-t-4 border-amber-500">
                    <div className="text-2xl font-bold">{inProgressCount}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md border-t-4 border-gray-500">
                    <div className="text-2xl font-bold">{pendingCount}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm">Task Completion: {completionPercentage}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  {Object.keys(tasksByAssignee).length > 0 ? (
                    Object.entries(tasksByAssignee).map(([assignee, tasks]) => (
                      <div key={assignee} className="space-y-2">
                        <h5 className="font-medium">{assignee}</h5>
                        <ul className="space-y-1 text-sm">
                          {tasks.map((task) => (
                            <li key={task.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    task.priority === "high"
                                      ? "bg-red-600"
                                      : task.priority === "medium"
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                ></span>
                                <span>{task.title}</span>
                              </div>
                              {getStatusBadge(task.status)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No tasks to display based on current filters
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

