import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import imgReducer from "../features/images/imgSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imgReducer,
  },
});

export default store;
