import { Employee } from "@/types/Employee";
import axiosInstance from "./http-service";

// Define the API response type
interface ApiResponse {
  status: number;
  data?: Employee;
}

export const getCurrentUser = (
  callback: (response: ApiResponse | null) => void
): void => {
  const endpoint = `/auth/current`;

  axiosInstance
    .get(endpoint)
    .then((response) => {
      callback({ status: response.status, data: response.data });
    })
    .catch((error) => {
      console.error("Error fetching current user:", error);
      callback(
        error.response
          ? { status: error.response.status, data: error.response.data }
          : null
      );
    });
};
