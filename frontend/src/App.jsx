import { ToastContainer, toast } from "react-toastify";
import DisplayImages from "./components/DisplayImages";

import UploadImage from "./components/UploadImage";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import { useState } from "react";

function App() {
  const [currView, setCurrView] = useState("welcome");
  return (
    <>
      <ToastContainer />
      <Header setCurrView={setCurrView} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* <h1 className="text-3xl font-bold mb-6">Image Upload Gallery</h1> */}

        {currView === "upload" && <UploadImage />}
        {currView === "welcome" && <Welcome />}
        {currView === "display" && <DisplayImages />}
      </div>
    </>
  );
}

export default App;
