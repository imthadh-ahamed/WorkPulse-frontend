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
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Employee } from "@/types/Employee";
import { AddEmployeeModal } from "@/components/EmployeeManagement/AddEmployeeModel";
import { ViewEmployeeModal } from "@/components/EmployeeManagement/ViewEmployeeModal";
import { DeleteConfirmationModal } from "@/components/EmployeeManagement/DeleteConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { getAllEmployees } from "@/app/services/Employee/employee.servics";

export default function EmployeeManagementPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>();
  const [viewEmployee, setViewEmployee] = useState<string | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const tenantId = typeof window !== "undefined" ? localStorage.getItem("tenantId") ?? "" : "";

  // Fetch employees dynamically
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { employees, total } = await getAllEmployees(
          tenantId,
          page + 1,
          rowsPerPage,
          search
        );
        setEmployees(employees);
        setTotalEmployees(total);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [tenantId, page, rowsPerPage, search]);

  const handleAddEmployee = () => {
    setIsAddModalOpen(false);
  };

  const handleViewEmployee = (employeeId: string) => {
    setViewEmployee(employeeId);
  };

  const handleCloseViewModal = () => {
    setViewEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((employees ?? []).filter((employee) => employee.id !== id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            "&:hover .search-field": {
              width: "200px",
              opacity: 1,
            },
          }}
        >
          <SearchIcon sx={{ cursor: "pointer" }} />
          <TextField
            className="search-field"
            variant="outlined"
            placeholder="Search employees..."
            value={search}
            onChange={handleSearchChange}
            size="small"
            sx={{
              ml: 1,
              width: "0px",
              opacity: 0,
              transition: "width 0.3s ease, opacity 0.3s ease",
            }}
          />
        </Box>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Employee
          </Button>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
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
              {(employees ?? []).map((employee) => (
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
                      onClick={() => employee.id && handleViewEmployee(employee.id)}
                    >
                      <Chip label="View" color="success" />
                    </Button>
                    {isAdmin && (
                      <Button
                        size="small"
                        onClick={() => employee.id && setDeleteEmployeeId(employee.id)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[7, 14, 21]}
            component="div"
            count={totalEmployees}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEmployee}
      />

      {viewEmployee && (
        <ViewEmployeeModal
          employeeId={viewEmployee}
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
