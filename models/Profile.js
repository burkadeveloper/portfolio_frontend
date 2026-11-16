const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Your Name" },
    title: { type: String, default: "Full-Stack Developer" },
    bio: { type: String, default: "" },

    // Three distinct images — each used in a different section
    avatar: { type: String, default: "" }, // small circle → Contact + Footer
    heroImage: { type: String, default: "" }, // tall portrait → Hero
    aboutImage: { type: String, default: "" }, // square portrait → About

    resumeUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
