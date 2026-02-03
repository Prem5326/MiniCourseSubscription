import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Mini Courses</h1>

      <div className="flex gap-4 items-center">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/my-courses" className="hover:underline">
          My Courses
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
