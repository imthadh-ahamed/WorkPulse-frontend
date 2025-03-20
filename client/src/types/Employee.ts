export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
}
