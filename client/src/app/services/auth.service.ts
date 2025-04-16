import axiosInstance from "./http-service";
import { ApiResponse } from "../DTOs/ApiResponse";
import { Employee } from "@/types/Employee";
import { SignUpDTO } from "../DTOs/signUpDTO";

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

export const inviteEmployee = async (employee: Employee): Promise<void> => {
  try {
    const endpoint = "/tenant/invite-employee";
    const response = await axiosInstance.post(endpoint, employee);
    console.log("Employee invited successfully:", response.data);
  } catch (error) {
    console.log("Error inviting employee:", error);
    throw error; 
  }
};

export const signup = async (signupData: SignUpDTO): Promise<void> => {
  try {
    const endpoint = "/auth/signup";
    const response = await axiosInstance.post(endpoint, signupData);
    console.log("Signup response:", response.data);
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};