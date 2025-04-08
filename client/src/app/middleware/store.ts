import { configureStore } from "@reduxjs/toolkit";
import { tenantApi } from "@/app/services/Tenant/tenantApi";

export const store = configureStore({
  reducer: {
    [tenantApi.reducerPath]: tenantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tenantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
