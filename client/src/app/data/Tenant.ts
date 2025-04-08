import { Tenant } from "@/types/Tenants";

export const sampleTenant: Tenant = {
  id: 1,
  userId: 101,
  companyName: "Tech Solutions Inc.",
  email: "info@techsolutions.com",
  phone: "+1-800-555-1234",
  profileUrl: "https://techsolutions.com/profile",
  address: "123 Innovation Drive",
  city: "Techville",
  state: "California",
  country: "USA",
  postalCode: "90001",
  industry: "Software Development",
  numberOfEmployees: 250,
  websiteUrl: "https://techsolutions.com",
  taxId: "123-45-6789",
  registrationNumber: "REG-987654321",
  timezone: "PST",
  status: "active",
  subscription: "Premium",
  created: new Date("2023-01-01T10:00:00Z"),
  createdBy: "admin",
  modified: new Date("2023-06-01T15:30:00Z"),
  modifiedBy: "manager",
  isDeleted: false,
};
