import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Popover } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { CalendarToday } from "@mui/icons-material" // Correct import for Calendar Icon
import { AlertCircle } from "lucide-react"
import { format, isBefore, startOfDay } from "date-fns"
import { employees } from "@/lib/data"

export function TaskCreationForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [priority, setPriority] = useState("medium")
  const [date, setDate] = useState<Date | null>(null)
  const [errors, setErrors] = useState<{
    title?: string
    assignedTo?: string
    date?: string
  }>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [popoverOpen, setPopoverOpen] = useState(false)

  // Validate form when values change
  useEffect(() => {
    validateForm()
  }, [title, assignedTo, date])

  const validateForm = () => {
    const newErrors: {
      title?: string
      assignedTo?: string
      date?: string
    } = {}

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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

    const newTask = {
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

    // In a real app, you would save this to your state management or API
    console.log("Task created:", newTask)

    // Navigate back to the task board
    router.push("/pages/task-management")
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
  }

  const isFormValid = () => {
    return title.trim() !== "" && assignedTo !== "" && date !== null && Object.keys(errors).length === 0
  }

  const handlePopoverOpen = () => {
    setPopoverOpen(true)
  }

  const handlePopoverClose = () => {
    setPopoverOpen(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="title" className="flex items-center justify-between">
            Task Title <span className="text-destructive text-xs">*</span>
          </label>
          <TextField
            id="title"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur("title")}
            fullWidth
            required
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description">Description</label>
          <TextField
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="assignedTo" className="flex items-center justify-between">
            Assign To <span className="text-destructive text-xs">*</span>
          </label>
          <FormControl fullWidth required>
            <InputLabel>Assign to</InputLabel>
            <Select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              onBlur={() => handleBlur("assignedTo")}
              error={touched.assignedTo && Boolean(errors.assignedTo)}
            >
              <MenuItem value="">Select employee</MenuItem>
              {employees.map((employee) => (
                <MenuItem key={employee} value={employee}>
                  {employee}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {touched.assignedTo && errors.assignedTo && (
            <div className="text-destructive text-xs flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {errors.assignedTo}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="priority">Priority</label>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid gap-2">
            <label htmlFor="deadline" className="flex items-center justify-between">
              Deadline <span className="text-destructive text-xs">*</span>
            </label>
            <Button
              variant="outlined"
              onClick={handlePopoverOpen}
              fullWidth
              startIcon={<CalendarToday />}
            >
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
            <Popover
              open={popoverOpen}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <DesktopDatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
                minDate={startOfDay(new Date())}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                  />
                )}
                
              />
            </Popover>
            {touched.date && errors.date && (
              <div className="text-destructive text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors.date}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outlined" onClick={() => router.push("/pages/task-management")}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isFormValid()} variant="contained" color="primary">
          Create Task
        </Button>
      </div>
    </form>
  )
}
