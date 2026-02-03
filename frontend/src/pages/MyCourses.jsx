import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/my-courses");
        setCourses(res.data);
      } catch (err) {
        setError("Failed to load subscribed courses");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading your courses...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (courses.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        You have not subscribed to any courses yet.
      </p>
    );
  }

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="border rounded-lg p-4 shadow"
          >
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}

            <h2 className="text-xl font-semibold">{course.title}</h2>

            <p className="mt-2">
              <span className="font-semibold">Price Paid:</span>{" "}
              {course.pricePaid === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `₹${course.pricePaid}`
              )}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Subscribed on:{" "}
              {new Date(course.subscribedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
