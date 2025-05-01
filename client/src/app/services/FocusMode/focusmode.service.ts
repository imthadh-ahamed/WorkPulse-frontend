import { FocusModeDTO } from "@/app/DTOs/FocusModeDTO";
import axiosInstance from "../http-service";
import { FocusSession } from "@/types/FocusSession";

// Create a new focus mode session
export const createFocusMode = async (
  data: FocusModeDTO
): Promise<FocusSession> => {
  try {
    const endpoint = `/focusmode`;
    const response = await axiosInstance.post(endpoint, data);
    console.log("Focus mode created successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating focus mode:", error);
    throw error;
  }
};

// Get all focus mode sessions
export const getFocusModes = async (
  page = 1,
  limit = 8,
  title = ""
): Promise<FocusSession[]> => {
  try {
    const endpoint = `/focusmode`;
    const response = await axiosInstance.get(endpoint, {
      params: { page, limit, title },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching focus modes:", error);
    throw error;
  }
};

// Get a focus mode session by ID
export const getFocusModeById = async (id: string): Promise<FocusSession> => {
  try {
    const endpoint = `/focusmode/${id}`;
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching focus mode by ID:", error);
    throw error;
  }
};

// Update a focus mode session
export const updateFocusMode = async (
  id: string,
  data: FocusModeDTO
): Promise<FocusSession> => {
  try {
    const endpoint = `/focusmode/${id}`;
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error updating focus mode:", error);
    throw error;
  }
};

// Delete a focus mode session
export const deleteFocusMode = async (id: string): Promise<void> => {
  try {
    const endpoint = `/focusmode/${id}`;
    await axiosInstance.delete(endpoint);
  } catch (error) {
    console.error("Error deleting focus mode:", error);
    throw error;
  }
};
