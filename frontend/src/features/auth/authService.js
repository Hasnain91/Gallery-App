import axios from "axios";
import baseUrl from "../../api/url";

//Load user
export const laodUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log("💥 Failed to parse user data from locl storage: ", error);
    return null;
  }
};

// Load token
export const loadToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.log("💥Failed to parse token from local stoarge: ", error);
    return null;
  }
};

// Save user to local stoarge
export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Save token to local stoarge
export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

// Clear Storage
export const clearStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${baseUrl}/api/users/`, userData);
  return response.data.data;
};

// login User
export const loginUser = async (credentials) => {
  const response = await axios.post(`${baseUrl}/api/users/login`, credentials);
  console.log("Response Data: ", response.data);
  console.log("Backend Response: ", response);
  return response.data;
};

export const logoutUser = () => {
  clearStorage();
};
