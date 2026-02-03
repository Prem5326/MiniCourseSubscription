import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const courses = [
  {
    title: "JavaScript Fundamentals",
    description: "Learn JS from scratch with hands-on examples.",
    price: 0,
    image: "https://via.placeholder.com/300",
  },
  {
    title: "React for Beginners",
    description: "Build modern UIs using React and hooks.",
    price: 999,
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Node.js & Express",
    description: "Backend development with Node and Express.",
    price: 1199,
    image: "https://via.placeholder.com/300",
  },
  {
    title: "MongoDB Essentials",
    description: "Learn NoSQL database design with MongoDB.",
    price: 799,
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Full Stack Bootcamp",
    description: "Frontend + Backend full stack training.",
    price: 1999,
    image: "https://via.placeholder.com/300",
  },
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
