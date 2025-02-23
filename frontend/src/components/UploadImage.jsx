import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImg } from "../features/images/imgSlice";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../api/url";
import LoadingSpinner from "./LoadingSpinner";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLaoding] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLaoding(true);

      const response = await dispatch(uploadImg(formData));

      // const response = await axios.post(`${baseUrl}/api/images`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      console.log("Response for uploaded image: ", response.payload);
      toast.success("Image Uploaded Successfully!");
      setIsLaoding(false);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // console.log(response.data.url);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.");
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner size="100px" color="#0073e6" />}
      <div className="w-full flex justify-center items-center m-5">
        <div className="w-[40%] bg-gray-200 shadow-2xl shadow-blue-200 flex justify-center items-center p-20 rounded-2xl">
          <h1>Let's upload your images</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-[80%]"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:cursor-pointer hover:bg-blue-600"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadImage;
