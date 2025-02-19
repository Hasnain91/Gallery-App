import { useEffect, useState } from "react";

function Welcome() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  console.log(user);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-bl from-sky-500 to-indigo-500">
      <p className="text-5xl font-bold text-blue-100 tracking-wider underline">
        {user && `Welcome, ${user.name}`}
        {/* Welcome to your Image Gallery */}
      </p>
    </div>
  );
}

export default Welcome;
