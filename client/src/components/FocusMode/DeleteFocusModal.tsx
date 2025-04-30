"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteFocusTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteFocusTimeModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteFocusTimeModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this focus time session? <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
