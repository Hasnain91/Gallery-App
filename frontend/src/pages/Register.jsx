import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const { name, email, password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    }

    try {
      const response = await dispatch(register({ name, email, password }));
      console.log(response);

      toast.success("User Registered Successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration Error: ", error);
      toast.error(error || "Failed to Login. Please try again");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="w-full flex items-center justify-center flex-col my-10">
        <div className="w-[30%]  drop-shadow-lg  bg-gray-300 flex justify-center items-center flex-col gap-10">
          <section>
            <h1 className="flex justify-center items-center p-4 gap-4 text-3xl font-medium mt-5">
              <FaUser /> Register
            </h1>
            <p className="text-3xl font-semibold tracking-wide">
              Please Create Your Account
            </p>
          </section>

          <section className=" w-[100%] my-10">
            <form className="flex justify-center items-center flex-col gap-8 ">
              <div className="flex justify-center items-left flex-col gap-1 w-[80%]">
                <label htmlFor="" className="text-xl font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="i.e. Jhon Doe "
                  className=" p-3 bg-gray-100 rounded-md outline-none"
                  onChange={handleInputChange}
                  name="name"
                  value={name}
                />
              </div>

              <div className="flex justify-center items-left flex-col gap-1 w-[80%]">
                <label htmlFor="" className="text-xl font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="i.e. example@gmail.com "
                  className=" p-3 bg-gray-100 rounded-md outline-none"
                  onChange={handleInputChange}
                  name="email"
                  value={email}
                />
              </div>

              <div className="flex justify-center items-left flex-col gap-1 w-[80%]">
                <label htmlFor="" className="text-xl font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className=" p-3 bg-gray-100 rounded-md outline-none"
                  onChange={handleInputChange}
                  name="password"
                  value={password}
                />
              </div>

              <div className="flex justify-center items-left flex-col gap-1 w-[80%] ">
                <label htmlFor="" className="text-xl font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Your Password"
                  className=" p-3 bg-gray-100 rounded-md outline-none"
                  onChange={handleInputChange}
                  name="confirmPassword"
                  value={confirmPassword}
                />
              </div>

              <div className="flex justify-center items-left flex-col gap-1 w-[40%]">
                <button
                  onClick={handleSubmit}
                  className=" bg-gray-900 text-gray-200 text-xl tracking-wider font-medium p-5  rounded hover:rounded-full hover:cursor-pointer hover:bg-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
