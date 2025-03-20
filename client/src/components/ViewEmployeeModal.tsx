"use client";

import { Employee } from "@/types/Employee";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  Typography,
} from "@mui/material";

interface ViewEmployeeModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewEmployeeModal({
  employee,
  isOpen,
  onClose,
}: ViewEmployeeModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar
            sx={{ width: 80, height: 80, fontSize: "2rem", bgcolor: "gray" }}
          >
            {employee.firstName[0]}
            {employee.lastName[0]}
          </Avatar>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={500}
              >
                Employee Name
              </Typography>
              <Typography variant="body2">
                {employee.firstName} {employee.lastName}
              </Typography>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={500}
              >
                Email
              </Typography>
              <Typography variant="body2">{employee.email}</Typography>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={500}
              >
                Role
              </Typography>
              <Typography variant="body2">{employee.role}</Typography>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={500}
              >
                Bio
              </Typography>
              <Typography variant="body2">{employee.bio}</Typography>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={500}
              >
                Phone
              </Typography>
              <Typography variant="body2">{employee.phone}</Typography>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={500}
              >
                Address
              </Typography>
              <Typography variant="body2">{employee.address}</Typography>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
