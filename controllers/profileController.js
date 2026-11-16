const Profile = require("../models/Profile");
const { sanitizeProfile } = require("../utils/sanitize");

exports.getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    console.log("📥 [updateProfile] raw:", req.body);
    const data = sanitizeProfile(req.body);
    console.log("📥 [updateProfile] sanitized:", data);

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(data);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, data, {
        new: true,
        runValidators: true,
      });
    }
    console.log("✅ [updateProfile]", profile._id);
    res.json(profile);
  } catch (err) {
    console.error("❌ [updateProfile]", err.name, "-", err.message);
    next(err);
  }
};
