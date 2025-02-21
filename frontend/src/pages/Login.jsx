import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import baseUrl from "../api/url";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post(`${baseUrl}/api/users/login`, {
        email,
        password,
      });

      if (response) {
        toast.success("Login Successful");
      }

      // Store user to local storage
      localStorage.setItem("user", JSON.stringify(response.data.data));

      setIsLoading(false);
      setFormData({
        email: "",
        password: "",
      });
      console.log("Login Response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Login Error: ", error);
      toast.error(
        error.response?.data?.message || "Failed to register. Please try again"
      );
    }
  };
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="w-[30%] drop-shadow-lg  bg-gray-300 flex items-center justify-center flex-col gap-10">
        <section>
          <h1 className="flex justify-center items-center p-4 gap-4 text-3xl font-medium mt-5">
            <FaSignInAlt /> Login
          </h1>
          <p className="text-3xl font-semibold tracking-wide">
            Please login to your account
          </p>
        </section>

        <section className=" w-[100%] my-10">
          <form className="flex justify-center items-center flex-col gap-8 ">
            <div className="flex justify-center items-left flex-col gap-1 w-[80%]">
              <label htmlFor="" className="text-xl font-medium">
                Email:
              </label>
              <input
                type="email"
                placeholder="i.e. example@gmail.com"
                className=" p-3 bg-gray-100 rounded-md outline-none"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center items-left flex-col gap-1 w-[80%]">
              <label htmlFor="" className="text-xl font-medium">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className=" p-3 bg-gray-100 rounded-md outline-none"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center items-left flex-col gap-1 w-[40%]">
              <button
                onClick={handleSubmit}
                className=" bg-gray-900 text-gray-200 text-2xl tracking-wider font-medium p-5  rounded hover:rounded-full hover:cursor-pointer hover:bg-black"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
