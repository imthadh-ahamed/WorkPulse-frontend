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
