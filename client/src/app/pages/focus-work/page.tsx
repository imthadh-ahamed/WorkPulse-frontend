"use client";

import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

// Sample employee data
const employees = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "UX Designer",
    department: "Design",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "HR Specialist",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: 5,
    name: "Michael Wilson",
    position: "Marketing Specialist",
    department: "Marketing",
    status: "Inactive",
  },
];

export default function EmployeeManagementPage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Employee Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      alt={employee.name}
                      src={`/placeholder.svg?height=40&width=40`}
                    />
                    <Typography variant="body1">{employee.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.status}
                    color={
                      employee.status === "Active"
                        ? "success"
                        : employee.status === "On Leave"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
