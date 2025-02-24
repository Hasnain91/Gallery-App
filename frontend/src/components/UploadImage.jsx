import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImg } from "../features/images/imgSlice";
import { toast } from "react-toastify";
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

      console.log("Response for uploaded image: ", response.payload);
      toast.success("Image Uploaded Successfully!");
      setIsLaoding(false);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.");
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner size="100px" color="#0073e6" />}
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[20%] bg-gray-200 shadow-2xl shadow-blue-300 flex justify-center items-center p-10 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-[100%]"
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
              className="bg-blue-500 text-white text-xl font-bold tracking-wider py-2 px-4 rounded hover:cursor-pointer hover:bg-white hover:text-blue-500"
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
