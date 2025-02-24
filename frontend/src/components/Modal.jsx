// import { useEffect } from "react";

// function DeleteConfirmationModal({ isOpen, onClose, onConfirm, loading }) {
//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
//         <div className="bg-white p-6 rounded-xl shadow-xl shadow-blue-200 w-96 text-center transform transition-all scale-100">
//           <h2 className="text-2xl font-bold text-gray-800">Delete Image?</h2>
//           <p className="text-gray-600 mt-2 text-xl font-medium">
//             Are you sure you want to delete this image?
//           </p>

//           <div className="flex justify-between mt-5  transition-all ease-in duration-100">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-lg font-medium tracking-wider bg-gray-300 text-gray-700 rounded-lg  hover:text-gray-900  hover:bg-gray-100 transition-all ease-in duration-100 "
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 text-lg font-medium tracking-wider bg-red-500 text-white rounded-lg  hover:bg-red-100 hover:text-red-500 transition-all  ease-in duration-100"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default DeleteConfirmationModal;

import React from "react";
import {
  FaCross,
  FaSquare,
  FaCrosshairs,
  FaSignInAlt,
  FaTimes,
} from "react-icons/fa";

function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0 "
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
