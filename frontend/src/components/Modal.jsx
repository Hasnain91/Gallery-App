import { useEffect } from "react";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, loading }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-xl shadow-blue-200 w-96 text-center transform transition-all scale-100">
          <h2 className="text-2xl font-bold text-gray-800">Delete Image?</h2>
          <p className="text-gray-600 mt-2 text-xl font-medium">
            Are you sure you want to delete this image?
          </p>

          <div className="flex justify-between mt-5  transition-all ease-in duration-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-lg font-medium tracking-wider bg-gray-300 text-gray-700 rounded-lg  hover:text-gray-900  hover:bg-gray-100 transition-all ease-in duration-100 "
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-lg font-medium tracking-wider bg-red-500 text-white rounded-lg  hover:bg-red-100 hover:text-red-500 transition-all  ease-in duration-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmationModal;
