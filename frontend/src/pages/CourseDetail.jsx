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
  const [isPromoValid, setIsPromoValid] = useState(false); // ✅ FIX
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch course
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

  // Apply promo
  const applyPromo = () => {
    setError("");
    setSuccess("");

    if (!promoCode.trim()) {
      setIsPromoValid(false);
      setError("Promo code cannot be empty");
      return;
    }

    if (promoCode === "BFSALE25") {
      setDiscountedPrice(course.price * 0.5);
      setIsPromoValid(true);
      setSuccess("Promo applied! 50% discount");
    } else {
      setDiscountedPrice(null);
      setIsPromoValid(false);
      setError("Invalid promo code");
    }
  };

  // Subscribe
  const handleSubscribe = async () => {
    try {
      const payload = { courseId: id };

      if (course.price > 0) {
        if (!isPromoValid) {
          alert("Apply valid promo code before subscribing");
          return;
        }
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

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-3">{course.title}</h1>

        <img
          src={course.image || "https://via.placeholder.com/600x300"}
          alt={course.title}
          className="w-full h-60 object-cover rounded mb-4"
        />

        <p className="text-gray-700 mb-4">{course.description}</p>

        {/* PRICE */}
        <div className="mb-4">
          {course.price === 0 ? (
            <p className="text-green-600 font-bold text-lg">FREE</p>
          ) : (
            <>
              <p className="font-bold text-lg">Price: ₹{course.price}</p>
              {discountedPrice && (
                <p className="text-green-600 font-semibold">
                  Discounted Price: ₹{discountedPrice}
                </p>
              )}
            </>
          )}
        </div>

        {/* PROMO */}
        {course.price > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-2">
              🎉 Use <b>BFSALE25</b> for 50% OFF
            </p>

            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                className="border p-2 flex-1"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={applyPromo}
                className="bg-gray-800 text-white px-4 rounded"
              >
                Apply
              </button>
            </div>
          </>
        )}

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        {/* SUBSCRIBE */}
        <button
          onClick={handleSubscribe}
          disabled={course.price > 0 && !isPromoValid}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            course.price > 0 && !isPromoValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Subscribe Now
        </button>
      </div>
    </>
  );
}
