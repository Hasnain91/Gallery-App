import axios from "axios";
import baseUrl from "../../api/url";

// Upload an image
export const uploadImage = async (formData, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.image;
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to upload image.");
  }
};

// Fetch images for authenticated users
export const fetchImages = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.images;
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to get images.");
  }
};

// Delete an image
export const deleteImage = async (id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/images/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to delete image.");
  }
};
