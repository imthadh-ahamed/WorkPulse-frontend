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
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

interface ViewEmployeeModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

const InfoRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: "#5a5a5a", // Slightly darker for better legibility
  },
});

export function ViewEmployeeModal({
  employee,
  isOpen,
  onClose,
}: ViewEmployeeModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.25rem" }}
      >
        Employee Details
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 py-6">
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: "2.5rem",
              bgcolor: "primary.main",
              color: "white",
              border: "4px solid #fff",
            }}
          >
            {employee.firstName[0]}
            {employee.lastName[0]}
          </Avatar>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {employee.firstName} {employee.lastName}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {employee.role}
          </Typography>

          <Divider sx={{ width: "100%", margin: "16px 0" }} />

          <div className="w-full space-y-4">
            <InfoRow>
              <Typography variant="body2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body2">{employee.email}</Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="body2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body2">{employee.phone}</Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="body2" color="textSecondary">
                Address
              </Typography>
              <Typography variant="body2">{employee.address}</Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="body2" color="textSecondary">
                Bio
              </Typography>
              <Typography variant="body2">{employee.bio}</Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="body2" color="textSecondary">
                Position
              </Typography>
              <Typography variant="body2">{employee.position}</Typography>
            </InfoRow>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 30,
            paddingX: 3,
            textTransform: "none",
            boxShadow: 2,
            "&:hover": { boxShadow: 3 },
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
