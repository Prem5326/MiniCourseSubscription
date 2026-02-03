import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={course.image || "https://via.placeholder.com/400x250"}
                alt={course.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold mb-1">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`font-semibold ${course.price === 0
                        ? "text-green-600"
                        : "text-gray-800"
                      }`}
                  >
                    {course.price === 0 ? "FREE" : `₹${course.price}`}
                  </span>

                  <Link
                    to={`/courses/${course._id}`}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
