import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../api/url";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./Modal";

function DisplayImages() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImagePublicId, setSelectedImagePublicId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/images`);
        setImages(res.data.data.images);
      } catch (error) {
        console.log(`Error Fetching Images: 💥${error}💥`);
      }
    };

    fetchImages();
  }, []);
  // console.log(images.map((image) => console.log(image.url)));

  // const onConfirm1 = async () => {
  const handleDelete = async () => {
    if (!selectedImageId) return;
    try {
      setIsLoading(true);
      await axios.delete(`${baseUrl}/api/images/${selectedImageId}`);

      //remove from ui
      setImages((prevImages) =>
        prevImages.filter((image) => image._id !== selectedImageId)
      );
      toast.success("Image Deleted Successfully");
      setIsLoading(false);
      setIsModalOpen(false);
      setSelectedImageId(null);
      setSelectedImagePublicId(null);
    } catch (error) {
      console.log(`Error deleting image: 💥${error}💥 `);
      toast.error("Failed to delete the image!");
    }
  };

  useEffect(() => {
    console.log("isLoading State right now is: ", isLoading);
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingSpinner size="100px" color="#0073e6" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="rounded overflow-hidden shadow-lg flex flex-col gap-2"
          >
            <img
              src={image.url}
              alt={`Uploaded ${index}`}
              className="w-full h-48 object-cover"
            />
            <p className="px-6 py-3">{image.name}</p>
            <button
              // onClick={() => handleDelete(image._id, image.public_id)}
              onClick={() => {
                setSelectedImageId(image._id);
                setSelectedImagePublicId(image.public_id);
                setIsModalOpen(true);
              }}
              className="text-2xl font-medium bg-red-700 text-red-200 hover:text-red-700 hover:bg-red-200 hover:cursor-pointer"
            >
              {/* {isLoading ? "Deleting..." : "Delete"} */}
              {/* {isLoading ? <LoadingSpinner /> : "Delete"} */}
              Delete
            </button>
          </div>
        ))}
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedImageId(null);
            setSelectedImagePublicId(null);
          }}
          onConfirm={handleDelete}
          loading={isLoading}
          // onConfirm={() => handleDelete(selectedImageId, selectedImagePublicId)}
        />
      </div>
    </>
  );
}

export default DisplayImages;
