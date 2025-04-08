import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tenant } from "@/types/Tenants";

export const tenantApi = createApi({
  reducerPath: "tenantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/api" }),
  endpoints: (builder) => ({
    createTenant: builder.mutation<Tenant, Partial<Tenant>>({
      query: (tenant) => ({
        url: "/tenant/create",
        method: "POST",
        body: tenant,
      }),
    }),
  }),
});

export const { useCreateTenantMutation } = tenantApi;
