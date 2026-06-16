import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import productReducer from "../../11-redux-toolkit-async-thunk-middleware/features/productSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    products: productReducer,
  }
});