"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface DeleteProjectConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  projectName?: string
}

export function DeleteProjectConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}: DeleteProjectConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Project Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {projectName ? `"${projectName}"` : "this project"}? <br />
          This action cannot be undone and will remove all associated data.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm()
            onClose()
          }}
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Delete Project
        </Button>
      </DialogActions>
    </Dialog>
  )
}