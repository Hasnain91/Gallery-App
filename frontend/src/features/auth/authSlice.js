import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  laodUser,
  loadToken,
  saveUserToLocalStorage,
  saveTokenToLocalStorage,
  clearStorage,
  registerUser,
  loginUser,
  logoutUser,
} from "./authService";

const initialState = {
  user: laodUser(),
  token: loadToken(),
  isLoading: false,
  error: null,
};

// register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      saveUserToLocalStorage(response);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);
// login user
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      console.log("Response from loginUser:", response);
      console.log(response);
      saveUserToLocalStorage(response.data);
      saveTokenToLocalStorage(response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);
// logout user
export const logout = createAsyncThunk("auth/logout", () => {
  clearStorage();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // set error
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.token = action.payload.token;
        state.user = action.payload.data;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
