import { Employee } from "./Employee";

export interface Project {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  users?: Array<Employee>;
  closed?: Date | null | undefined;
  created: Date | null | undefined;
  createdBy: string;
  modified?: Date | null;
  modifiedBy?: string | null;
  displayName: string;
  //Tenant ID
}
