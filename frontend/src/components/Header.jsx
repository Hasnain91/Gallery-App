function Header({ setCurrView }) {
  return (
    <div className="w-full h-20  flex justify-center items-center">
      <header className="w-[80%] ">
        <nav className="flex justify-between items-center">
          <div>
            <p
              onClick={() => {
                setCurrView("welcome");
              }}
              className="text-2xl font-bold cursor-pointer hover:underline "
            >
              Gallery-App
            </p>
          </div>
          <div>
            <ul className=" flex justify-between items-center gap-10">
              <li
                onClick={() => {
                  setCurrView("upload");
                }}
                className="bg-blue-500 text-white text-xl font-medium py-2 px-4 rounded hover:cursor-pointer hover:bg-blue-600  hover:rounded-3xl transition-all ease-in duration-150"
              >
                Upload Image
              </li>
              <li
                onClick={() => {
                  setCurrView("display");
                }}
                className="bg-blue-500 text-white text-xl font-medium py-2 px-4 rounded hover:cursor-pointer hover:bg-blue-600 hover:rounded-3xl "
              >
                Display Images
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
