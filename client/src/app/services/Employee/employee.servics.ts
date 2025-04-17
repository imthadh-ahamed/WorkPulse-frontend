import { Employee } from "@/types/Employee";
import axiosInstance from "../http-service";

export const getEmployeebyId = async (employeeId: string): Promise<Employee> => {
  try {
    const endpoint = `/employee/${employeeId}`;
    const response = await axiosInstance.get(endpoint);
    console.log("Employee returned successfully", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching employee:", error);
    throw error;
  }
};

export const getAllEmployees = async (
    tenantId: string,
    page: number,
    limit: number,
    search: string
): Promise<{ employees: Employee[]; total: number }> => {
    try {
      const endpoint = `/employee`;
      const response = await axiosInstance.get(endpoint, {
        params: { tenantId, page, limit, search },
      });

      // Map _id to id
      const employees = response.data.employees.map((employee: Employee & { _id: string }) => ({
        ...employee,
        id: employee._id
      }));

      console.log("Employees returned successfully", response.data);
      return { employees, total: response.data.total };
    } catch (error) {
        console.log("Error fetching employees:", error);
        throw error;
    }
};

export const deleteEmployeeById = async (employeeId: string): Promise<void> => {
  try {
    const endpoint = `/employee/${employeeId}`;
    await axiosInstance.delete(endpoint);
    console.log("Employee deleted successfully");
  } catch (error) {
    console.log("Error deleting employee:", error);
    throw error;
  }
};