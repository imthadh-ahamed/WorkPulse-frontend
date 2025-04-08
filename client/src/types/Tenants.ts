export interface Tenant {
  id: number;
  userId: number;
  companyName: string;
  email: string;
  phone?: string | null;
  profileUrl?: string | null;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  industry?: string;
  numberOfEmployees?: number;
  websiteUrl?: string | null;
  taxId?: string | null;
  registrationNumber?: string | null;
  timezone?: string;
  status?: "active" | "inactive" | "suspended";
  subscription: string;
  created: Date;
  createdBy: string;
  modified?: Date | null;
  modifiedBy?: string | null;
  isDeleted: boolean;
}
