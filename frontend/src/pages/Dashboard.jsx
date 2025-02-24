import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  // Fetch user and image data from Redux state
  const user = useSelector((state) => state.auth.user);
  const images = useSelector((state) => state.images.images);

  // Calculate meaningful stats
  const totalImages = images.length;
  const mostRecentImage = images[0]; // First image in the array (most recent)
  const lastUploadDate = mostRecentImage
    ? new Date(mostRecentImage.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No uploads yet";

  console.log("Images Data: ", images);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-blue-600">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">{user?.email}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Images Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Images
            </h2>
            <p className="mt-2 text-3xl font-bold text-blue-500">
              {totalImages}
            </p>
          </div>

          {/* Last Upload Date Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-800">Last Upload</h2>
            <p className="mt-2 text-lg text-gray-600">{lastUploadDate}</p>
          </div>

          {/* Most Recent Image Preview */}
          {mostRecentImage && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-gray-800">
                Most Recent Image
              </h2>
              <div className="mt-4">
                <img
                  src={mostRecentImage.url}
                  alt={mostRecentImage.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {mostRecentImage.name}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Uploads Section */}
        {images.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Uploads
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.slice(0, 4).map((image) => (
                <div
                  key={image._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <p className="mt-2 text-sm text-gray-600 truncate">
                    {image.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
