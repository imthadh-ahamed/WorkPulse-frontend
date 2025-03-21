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
  TablePagination,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import { Employee } from "@/types/Employee";
import { AddEmployeeModal } from "@/components/EmployeeManagement/AddEmployeeModel";
import { ViewEmployeeModal } from "@/components/EmployeeManagement/ViewEmployeeModal";
import { DeleteConfirmationModal } from "@/components/EmployeeManagement/DeleteConfirmationModal";
import { Employees } from "@/app/data/Employee";

export default function EmployeeManagementPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(Employees);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAddEmployee = (addEmployee: Omit<Employee, "id">) => {
    const newEmployee = {
      id: employees.length + 1,
      ...addEmployee,
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

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.id}>
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
                    <Button
                      size="small"
                      onClick={() => setDeleteEmployeeId(employee.id)}
                    >
                      <DeleteIcon color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

      {deleteEmployeeId !== null && (
        <DeleteConfirmationModal
          isOpen={deleteEmployeeId !== null}
          onClose={() => setDeleteEmployeeId(null)}
          onConfirm={() => {
            handleDeleteEmployee(deleteEmployeeId);
            setDeleteEmployeeId(null);
          }}
        />
      )}
    </Container>
  );
}
