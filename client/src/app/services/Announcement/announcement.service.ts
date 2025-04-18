import { Announcement } from "@/types/Announcement";
import axiosInstance from "../http-service";

export const createAnnouncement = async (data: {
  title: string;
  description: string;
}): Promise<void> => {
  try {
    const endpoint = `/announcement`;
    const response = await axiosInstance.post(endpoint, data);
    console.log("Announcement created successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
};

export const getAnnouncements = async (
  page: number = 1,
  limit: number = 4,
  title: string = ""
): Promise<{
  data: Announcement[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}> => {
  try {
    const endpoint = `/announcement`;
    const response = await axiosInstance.get(endpoint, {
      params: { page, limit, title },
    });
    console.log("Announcements fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};
