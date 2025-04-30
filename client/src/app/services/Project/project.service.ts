import { Project } from "@/types/Projects";
import axiosInstance from "../http-service";

// Create a new project
export const createProject = async (data: {
  name: string;
  description: string;
  tenantId: string;
  createdBy: string;
}): Promise<Project> => {
  try {
    const endpoint = `/project`;
    const response = await axiosInstance.post(endpoint, data);
    console.log("Project created successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// Fetch projects with optional filters
export const getProjects = async (
  tenantId: string,
  page: number = 1,
  limit: number = 10,
  name?: string
): Promise<{
  projects: Project[];
  totalItems: number;
}> => {
  try {
    const endpoint = `/project`;
    const response = await axiosInstance.get(endpoint, {
      params: { tenantId, page, limit, name },
    });
    console.log("Projects fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Update a project
export const updateProject = async (
  id: string,
  data: {
    name?: string;
    description?: string;
  }
): Promise<Project> => {
  try {
    const endpoint = `/project/${id}`;
    const response = await axiosInstance.put(endpoint, data);
    console.log("Project updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id: string): Promise<void> => {
  try {
    const endpoint = `/project/${id}`;
    const response = await axiosInstance.delete(endpoint);
    console.log("Project deleted successfully", response.data);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};