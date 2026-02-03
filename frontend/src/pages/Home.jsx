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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover mb-3 rounded"
              />
            )}

            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {course.description}
            </p>

            <p className="mt-3 font-bold">
              {course.price === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `₹${course.price}`
              )}
            </p>

            <Link
              to={`/courses/${course._id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
