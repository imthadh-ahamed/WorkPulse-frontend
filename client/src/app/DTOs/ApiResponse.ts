import { Employee } from "@/types/Employee";

export interface ApiResponse {
    status: number;
    data?: Employee;
}
