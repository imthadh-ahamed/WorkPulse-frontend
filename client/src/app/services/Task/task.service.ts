import { TaskData } from "@/types/types";
import axiosInstance from "../http-service";

// Create a new task
export const createTask = async (data: {
  title: string;
  description: string;
  projectId: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
}): Promise<TaskData> => {
  try {
    const endpoint = `/task`;
    const response = await axiosInstance.post(endpoint, data);
    console.log("Task created successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Fetch tasks with optional filters
export const getTasks = async (
  projectId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  data: TaskData[];
  totalItems: number;
}> => {
  try {
    const endpoint = `/task`;
    const response = await axiosInstance.get(endpoint, {
      params: { projectId, page, limit },
    });
    console.log("Tasks fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: "low" | "medium" | "high";
    status?: "pending" | "in-progress" | "completed";
  }
): Promise<TaskData> => {
  try {
    const endpoint = `/task/${id}`;
    const response = await axiosInstance.put(endpoint, data);
    console.log("Task updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  try {
    const endpoint = `/task/${id}`;
    const response = await axiosInstance.delete(endpoint);
    console.log("Task deleted successfully", response.data);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};