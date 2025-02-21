import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import DisplayImages from "./components/DisplayImages";
import UploadImage from "./components/UploadImage";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [currView, setCurrView] = useState("welcome");
  return (
    <>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Image Upload Gallery</h1>

          {currView === "upload" && <UploadImage />}
          {currView === "welcome" && <Welcome />}
          {currView === "display" && <DisplayImages />}
        </div> */}
      </Router>
    </>
  );
}

export default App;
