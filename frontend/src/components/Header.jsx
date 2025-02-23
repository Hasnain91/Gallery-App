import { Link, useNavigate } from "react-router-dom";
import {
  FaImages,
  FaSignInAlt,
  FaSignOutAlt,
  FaUpload,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Header({ setCurrView }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-20 bg-blue-200 flex justify-center items-center">
      <header className="w-[80%] ">
        <nav className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold cursor-pointer hover:underline ">
              <Link to="/">Gallery-App</Link>
            </p>
          </div>

          <div>
            <ul className=" flex justify-between items-center gap-10 w-[50%]">
              {user ? (
                <>
                  <li className="bg-blue-500 text-white text-xl font-medium py-2 px-4  rounded hover:cursor-pointer hover:bg-blue-600  hover:rounded-3xl transition-all ease-in duration-150">
                    <Link
                      to="/upload"
                      className="flex items-center justify-center gap-3"
                    >
                      <FaUpload />
                      Upload
                    </Link>
                  </li>
                  <li className="bg-blue-500 text-white text-xl font-medium py-2 px-4 rounded hover:cursor-pointer hover:bg-blue-600 hover:rounded-3xl ">
                    <Link
                      to="/display"
                      className="flex items-center justify-center gap-3"
                    >
                      <FaImages />
                      Display
                    </Link>
                  </li>
                  <li
                    className="bg-red-500 text-white text-xl font-medium py-2 px-4 rounded hover:cursor-pointer hover:bg-red-600 hover:rounded-3xl "
                    onClick={() => {
                      dispatch(logout());
                      toast.success("Logout Successful!");
                      navigate("/");
                    }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <FaSignOutAlt />
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="bg-blue-500 text-white text-xl font-medium py-2 px-4  rounded hover:cursor-pointer hover:bg-blue-600  hover:rounded-3xl transition-all ease-in duration-150">
                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-3"
                    >
                      <FaUser />
                      Register
                    </Link>
                  </li>
                  <li className="bg-blue-500 text-white text-xl font-medium py-2 px-4 rounded hover:cursor-pointer hover:bg-blue-600 hover:rounded-3xl ">
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-3"
                    >
                      <FaSignInAlt />
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
