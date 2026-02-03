import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch {
        setError("Failed to load course");
      }
    };

    fetchCourse();
  }, [id]);

  const applyPromo = () => {
    setError("");
    setSuccess("");

    if (promoCode === "BFSALE25") {
      setDiscountedPrice(course.price * 0.5);
      setSuccess("Promo applied! 50% discount");
    } else {
      setError("Invalid promo code");
    }
  };

  const handleSubscribe = async () => {
    try {
      const payload = { courseId: id };

      if (course.price > 0) {
        payload.promoCode = promoCode;
      }

      await api.post("/subscribe", payload);

      alert("Subscribed successfully!");
      navigate("/my-courses");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    }
  };


  if (!course) {
    return <p className="text-center mt-10">Loading course...</p>;
  }

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">{course.title}</h1>

      {course.image && (
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-60 object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-700 mb-4">{course.description}</p>

      {/* PRICE SECTION */}
      <div className="mb-4">
        {course.price === 0 ? (
          <p className="text-green-600 font-bold text-lg">FREE</p>
        ) : (
          <>
            <p className="font-bold text-lg">
              Price: ₹{course.price}
            </p>

            {discountedPrice && (
              <p className="text-green-600 font-semibold">
                Discounted Price: ₹{discountedPrice}
              </p>
            )}
          </>
        )}
      </div>

      {/* PROMO CODE (ONLY FOR PAID) */}
      {course.price > 0 && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter promo code"
            className="border p-2 mr-2"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button
            onClick={applyPromo}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Apply Promo
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      {/* SUBSCRIBE BUTTON */}
      <button
        onClick={handleSubscribe}
        disabled={course.price > 0 && !discountedPrice}
        className={`px-6 py-2 rounded text-white ${course.price > 0 && !discountedPrice
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600"
          }`}
      >
        Subscribe
      </button>
    </div>
    </>
  );
}
