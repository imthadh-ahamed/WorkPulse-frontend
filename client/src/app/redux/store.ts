import { configureStore } from "@reduxjs/toolkit";
import { tenantApi } from "@/app/services/Tenant/tenantApi";
import { authApi } from "@/app/services/auth/authApi";
import userSlice from "@/app/redux/reducer/userSlice"; 

export const store = configureStore({
  reducer: {
    [tenantApi.reducerPath]: tenantApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tenantApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
