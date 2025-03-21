"use client"

import { forwardRef } from "react"
import { Snackbar, Alert as MuiAlert, type AlertProps } from "@mui/material"

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface ToastProps {
  open: boolean
  message: string
  severity: "success" | "info" | "warning" | "error"
  onClose: () => void
  autoHideDuration?: number
}

export function Toast({ open, message, severity, onClose, autoHideDuration = 6000 }: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

