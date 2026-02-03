import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const courses = [
  {
    title: "JavaScript Fundamentals",
    description: "Learn JS from scratch with hands-on examples.",
    price: 0,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159"
  },
  {
    title: "React for Beginners",
    description: "Build modern UIs using React and hooks.",
    price: 999,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
  },
  {
    title: "Node.js & Express",
    description: "Backend development with Node and Express.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479"
  },
  {
    title: "MongoDB Essentials",
    description: "Learn NoSQL database design with MongoDB.",
    price: 799,
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3"
  },
  {
    title: "Full Stack Bootcamp",
    description: "Frontend + Backend full stack training.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  }
];


const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log("Courses seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
