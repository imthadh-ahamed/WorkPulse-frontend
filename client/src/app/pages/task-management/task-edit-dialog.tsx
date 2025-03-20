"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material"
import { format, isBefore, startOfDay } from "date-fns"
import type { TaskData } from "@/lib/types"
import { employees } from "@/lib/data"

interface TaskEditDialogProps {
  task: TaskData
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: TaskData) => void
}

interface FormErrors {
  title?: string
  assignedTo?: string
  deadline?: string
}

export function TaskEditDialog({ task, open, onOpenChange, onSave }: TaskEditDialogProps) {
  const [formData, setFormData] = useState<TaskData>({ ...task })
  const [date, setDate] = useState<Date>(new Date(task.deadline))
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Reset form and errors when dialog opens with a new task
  useEffect(() => {
    if (open) {
      setFormData({ ...task })
      setDate(new Date(task.deadline))
      setErrors({})
      setTouched({})
    }
  }, [open, task])

  // Validate form when values change
  useEffect(() => {
    validateForm()
  }, [formData.title, formData.assignedTo, date])

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    // Assigned To validation
    if (!formData.assignedTo) {
      newErrors.assignedTo = "Please select a team member"
    }

    // Date validation
    if (!date) {
      newErrors.deadline = "Due date is required"
    } else {
      const today = startOfDay(new Date())
      // Only validate future dates for new tasks or tasks that haven't started
      if (formData.status === "pending" && isBefore(date, today)) {
        newErrors.deadline = "Due date cannot be in the past for new tasks"
      }
    }

    setErrors(newErrors)
  }

  const handleChange = (field: keyof TaskData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date)
      setFormData({
        ...formData,
        deadline: date.toISOString(),
      })
      handleBlur("deadline")
    }
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
  }

  const handleSubmit = () => {
    // Mark all fields as touched to show all validation errors
    setTouched({
      title: true,
      assignedTo: true,
      deadline: true,
    })

    // Validate form
    validateForm()

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return
    }

    onSave(formData)
  }

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.assignedTo !== "" &&
      date !== undefined &&
      Object.keys(errors).length === 0
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red"
      case "medium":
        return "amber"
      case "low":
        return "green"
      default:
        return "black"
    }
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              onBlur={() => handleBlur("title")}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              fullWidth
              required
            />
          </div>

          <div className="grid gap-2">
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <FormControl fullWidth error={touched.assignedTo && Boolean(errors.assignedTo)} required>
              <InputLabel>Assigned To</InputLabel>
              <Select
                value={formData.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                onBlur={() => handleBlur("assignedTo")}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee} value={employee}>
                    {employee}
                  </MenuItem>
                ))}
              </Select>
              {touched.assignedTo && errors.assignedTo && (
                <FormHelperText>{errors.assignedTo}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="grid gap-2">
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <MenuItem value="pending">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Done</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid gap-2">
            <TextField
              label="Due Date"
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              error={touched.deadline && Boolean(errors.deadline)}
              helperText={touched.deadline && errors.deadline}
              fullWidth
              required
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onOpenChange(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isFormValid()}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
