import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tenant } from "@/types/Tenants";
import { Employee } from "@/types/Employee";

export const tenantApi = createApi({
  reducerPath: "tenantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/api/tenant" }),
  endpoints: (builder) => ({
    createTenant: builder.mutation<Tenant, Partial<Tenant>>({
      query: (tenant) => ({
        url: "/create",
        method: "POST",
        body: tenant,
      }),
    }),

    inviteEmployee: builder.mutation<void, Omit<Employee, "id">>({
      query: (employee) => ({
        url: "/invite-employee",
        method: "POST",
        body: employee,
      }),
    }),
  }),
});

export const { useCreateTenantMutation, useInviteEmployeeMutation } = tenantApi;
