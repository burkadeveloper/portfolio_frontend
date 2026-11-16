require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Profile = require("./models/Profile");

(async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  const existing = await User.findOne({ email });
  if (existing) console.log("ℹ️ Admin already exists");
  else {
    await User.create({ email, password });
    console.log("✅ Admin created:", email);
  }

  if (!(await Profile.findOne())) {
    await Profile.create({ name: "Your Name", title: "Full-Stack Developer" });
    console.log("✅ Default profile created");
  }

  await mongoose.disconnect();
  process.exit(0);
})();
