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
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          MiniCourses
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/home" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/my-courses" className="hover:text-blue-600">
            My Courses
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
