import React from "react";

function Homepage() {
  return (
    <div className="relative h-screen w-full flex justify-center items-center text-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xs"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3024995/pexels-photo-3024995.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      ></div>

      {/* Overlay to darken the background slightly for better readability */}
      <div className="absolute inset-0 bg-gray-50 opacity-30"></div>

      {/* Content */}
      <div className="relative text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Your Digital Gallery
        </h1>
        <p className="text-xl font-medium max-w-2xl mx-auto">
          A secure place to store and organize your images. Upload, manage, and
          access your pictures anytime, anywhere. Never worry aboput losing your
          memories ever again.
        </p>
      </div>
    </div>
  );
}

export default Homepage;
