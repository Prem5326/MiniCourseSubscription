import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // 0 = FREE
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
