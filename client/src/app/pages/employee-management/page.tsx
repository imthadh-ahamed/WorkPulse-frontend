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
import { useState } from "react";
import { Employee } from "@/types/Employee";
import { AddEmployeeModal } from "@/components/AddEmplyeeModel";
import { ViewEmployeeModal } from "@/components/ViewEmployeeModal";

// Sample employee data
const initialEmployees: Employee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "jhone@yopmail.com",
    role: "Admin",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jhone@yopmail.com",
    role: "Employee",
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    email: "jhone@yopmail.com",
    role: "Employee",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    email: "jhone@yopmail.com",
    role: "Employee",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Wilson",
    email: "jhone@yopmail.com",
    role: "Admin",
  },
];

export default function EmployeeManagementPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (AddEmployee: Omit<Employee, "id">) => {
    const newEmployee = {
      id: employees.length + 1,
      ...AddEmployee,
    };
    setEmployees([...employees, newEmployee]);
    setIsAddModalOpen(false);
  };

  const handleViewEmployee = (employee: Employee) => {
    setViewEmployee(employee);
  };

  const handleCloseViewModal = () => {
    setViewEmployee(null);
  };

  return (
    <Container maxWidth="xl">
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Employee
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Role
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight="bold">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      alt={`${employee.firstName} ${employee.lastName}`}
                      src={`/placeholder.svg?height=40&width=40`}
                    />
                    <Typography variant="body1">{`${employee.firstName} ${employee.lastName}`}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => handleViewEmployee(employee)}
                  >
                    <Chip label="View" color="success" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEmployee}
      />

      {viewEmployee && (
        <ViewEmployeeModal
          employee={viewEmployee}
          isOpen={!!viewEmployee}
          onClose={handleCloseViewModal}
        />
      )}
    </Container>
  );
}
