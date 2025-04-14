import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8081/api/auth",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      const cleanToken = (token ?? "").replace(/^"|"$/g, "");
      headers.set("Authorization", `Bearer ${cleanToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // login mutation
    login: builder.mutation<
      { token: string }, // response
      { email: string; password: string } // request body
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // current user query — token is passed via headers automatically
    // currentUser: builder.query<
    //   { Employee }, // Expected response
    //   void // No parameters needed
    // >({
    //   query: () => ({
    //     url: "/current",
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useLoginMutation } = authApi;
