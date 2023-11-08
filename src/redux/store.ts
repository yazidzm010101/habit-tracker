import { configureStore } from "@reduxjs/toolkit";
import habitCategoryReducer from "./habitCategoryReducer";
import habitReducer from "./habitReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    habits: habitReducer,
    habitCategories: habitCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
