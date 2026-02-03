import Course from "../models/Course.js";
import Subscription from "../models/Subscription.js";

// POST /subscribe
export const subscribeCourse = async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.user.userId;

    if (!courseId)
      return res.status(400).json({ message: "Course ID is required" });

    const course = await Course.findById(courseId);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    // Check if already subscribed
    const existingSub = await Subscription.findOne({ userId, courseId });
    if (existingSub)
      return res.status(400).json({ message: "Already subscribed" });

    let pricePaid = course.price;

    // FREE COURSE
    if (course.price === 0) {
      pricePaid = 0;
    }
    // PAID COURSE
    else {
      if (!promoCode)
        return res
          .status(400)
          .json({ message: "Promo code required for paid course" });

      if (promoCode !== "BFSALE25")
        return res.status(400).json({ message: "Invalid promo code" });

      // 50% Discount
      pricePaid = course.price * 0.5;
    }

    const subscription = await Subscription.create({
      userId,
      courseId,
      pricePaid,
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription,
    });
  } catch (err) {
    res.status(500).json({
      message: "Subscription failed",
      error: err.message,
    });
  }
};

// GET /my-courses
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const subscriptions = await Subscription.find({ userId })
      .populate("courseId")
      .sort({ subscribedAt: -1 });

    const result = subscriptions.map((sub) => ({
      courseId: sub.courseId._id,
      title: sub.courseId.title,
      description: sub.courseId.description,
      image: sub.courseId.image,
      pricePaid: sub.pricePaid,
      subscribedAt: sub.subscribedAt,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch subscribed courses",
    });
  }
};
