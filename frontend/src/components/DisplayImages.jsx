import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImg, getImgs } from "../features/images/imgSlice";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./Modal";

import axios from "axios";
import baseUrl from "../api/url";

function DisplayImages() {
  const dispatch = useDispatch();
  const { images, isLoading, error } = useSelector((state) => state.images);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // Fetch Images on the Mount
  useEffect(() => {
    dispatch(getImgs());
  }, [dispatch]);

  const handleDelete = async () => {
    if (!selectedImageId) return;

    try {
      await dispatch(deleteImg(selectedImageId));
      toast.success("Image Deleted Successfully");

      setIsModalOpen(false);
      setSelectedImageId(null);
    } catch (error) {
      toast.error(error || "Failed to Delete Image.");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <LoadingSpinner size="100px" color="#0073e6" />
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {images.map((image) => (
            <div
              key={image._id}
              className="border rounded-lg overflow-hidden shadow-md "
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-center items-center flex-col gap-5">
                <h2 className="text-lg font-medium">{image.name}</h2>
                <button
                  onClick={() => {
                    setSelectedImageId(image._id);
                    setIsModalOpen(true);
                  }}
                  className="w-[50%] py-3 text-xl font-medium tracking-wider text-red-100 bg-red-500 text-center hover:cursor-pointer hover:rounded-full hover:bg-red-100 hover:text-red-500 transition-all duration-200 ease-in"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedImageId(null);
        }}
        onConfirm={handleDelete}
        loading={isLoading}
      />
    </>
  );
}

export default DisplayImages;
