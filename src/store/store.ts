import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiAuth } from "../services/auth.api";
import { apiProduct } from "../services/product.api";
import { apiUser } from "../services/user.api";
import { apiWarehouse } from "../services/warehouse.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiProduct.reducerPath]: apiProduct.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiWarehouse.reducerPath]: apiWarehouse.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware).concat(apiProduct.middleware).concat(apiUser.middleware).concat(apiWarehouse.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
