export interface Employee {
  id?: string;
  tenantId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  bio?: string | null;
  position?: string | null;
  phone?: string | null;
  address?: string | null;
  isAdmin: boolean;
}
