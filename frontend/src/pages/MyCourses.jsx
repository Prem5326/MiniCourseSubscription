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
      <>
        <Navbar />
        <p className="text-center mt-10 text-gray-600">
          You have not subscribed to any courses yet.
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={course.image || "https://via.placeholder.com/400x250"}
                alt={course.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {course.title}
                </h2>

                <p className="mt-1 text-sm">
                  <span className="font-medium">Price Paid:</span>{" "}
                  {course.pricePaid === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${course.pricePaid}`
                  )}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Subscribed on{" "}
                  {new Date(course.subscribedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
