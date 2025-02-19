import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";

function Header({ setCurrView }) {
  return (
    <div className="w-full h-20  flex justify-center items-center">
      <header className="w-[80%] ">
        <nav className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold cursor-pointer hover:underline ">
              <Link to="/">Gallery-App</Link>
            </p>
          </div>
          <div>
            <ul className=" flex justify-between items-center gap-10 w-[50%]">
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
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
