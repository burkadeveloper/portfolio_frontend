const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: [{ type: String, trim: true }],
    imageUrl: { type: String, default: "", trim: true },
    videoUrl: { type: String, default: "", trim: true }, // YouTube / Vimeo / MP4
    liveLink: { type: String, default: "", trim: true },
    githubLink: { type: String, default: "", trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
