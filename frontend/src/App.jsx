import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DisplayImages from "./components/DisplayImages";
import UploadImage from "./components/UploadImage";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/display" element={<DisplayImages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
