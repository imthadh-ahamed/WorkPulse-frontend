import { useState, useEffect } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material"
import { CalendarToday } from "@mui/icons-material"
import { format, isBefore, startOfDay } from "date-fns"
import { employees } from "@/lib/data"
import { TaskData } from "@/lib/types"
import { Alert } from "@mui/material"  // Correct import for Alert

interface TaskCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTask: (task: TaskData) => void
}

interface FormErrors {
  title?: string
  assignedTo?: string
  date?: string
}

export function TaskCreationDialog({ open, onOpenChange, onAddTask }: TaskCreationDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [priority, setPriority] = useState("medium")
  const [date, setDate] = useState<Date | undefined>()
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Reset form and errors when dialog opens/closes
  useEffect(() => {
    if (open) {
      setTouched({})
    } else {
      resetForm()
    }
  }, [open])

  // Validate form when values change
  useEffect(() => {
    validateForm()
  }, [title, assignedTo, date])

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Title validation
    if (!title.trim()) {
      newErrors.title = "Title is required"
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    // Assigned To validation
    if (!assignedTo) {
      newErrors.assignedTo = "Please select a team member"
    }

    // Date validation
    if (!date) {
      newErrors.date = "Due date is required"
    } else {
      const today = startOfDay(new Date())
      if (isBefore(date, today)) {
        newErrors.date = "Due date cannot be in the past"
      }
    }

    setErrors(newErrors)
  }

  const handleSubmit = () => {
    // Mark all fields as touched to show all validation errors
    setTouched({
      title: true,
      assignedTo: true,
      date: true,
    })

    // Validate form
    validateForm()

    // Check if there are any errors
    if (!title || !assignedTo || !date || Object.keys(errors).length > 0) {
      return
    }

    const newTask: TaskData = {
      id: `task-${Date.now()}`,
      title,
      description,
      assignedTo,
      priority,
      status: "pending",
      deadline: date.toISOString(),
      createdAt: new Date().toISOString(),
      logs: [],
    }

    onAddTask(newTask)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setAssignedTo("")
    setPriority("medium")
    setDate(undefined)
    setErrors({})
    setTouched({})
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
  }

  const isFormValid = () => {
    return title.trim() !== "" && assignedTo !== "" && date !== undefined && Object.keys(errors).length === 0
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <div className="grid gap-4 py-4">
          <div>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleBlur("title")}
              required
              error={touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />
          </div>

          <div>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <FormControl fullWidth required error={touched.assignedTo && !!errors.assignedTo}>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                onBlur={() => handleBlur("assignedTo")}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee} value={employee}>
                    {employee}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.assignedTo && errors.assignedTo}</FormHelperText>
            </FormControl>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <TextField
                label="Due Date"
                variant="outlined"
                fullWidth
                value={date ? format(date, "PPP") : ""}
                onClick={() => handleBlur("date")}
                InputProps={{
                  startAdornment: <CalendarToday />,
                  readOnly: true,
                }}
                required
                error={touched.date && !!errors.date}
                helperText={touched.date && errors.date}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onOpenChange(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!isFormValid()} color="primary">
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}
