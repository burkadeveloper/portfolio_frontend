const cloudinary = require("../utils/cloudinary");

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const resourceType = req.file.mimetype.startsWith("video/")
      ? "video"
      : "image";

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio", resource_type: resourceType },
        (err, result) => (err ? reject(err) : resolve(result)),
      );
      stream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      type: resourceType,
      // For videos, Cloudinary auto-generates a .jpg thumbnail at the same path
      thumbnail:
        resourceType === "video"
          ? result.secure_url.replace(/\.(mp4|mov|webm|ogg)$/i, ".jpg")
          : result.secure_url,
    });
  } catch (err) {
    console.error("❌ [upload]", err.message);
    if (/Invalid Signature/i.test(err.message)) {
      res.status(500);
      return next(
        new Error(
          "Cloudinary signature mismatch — check CLOUDINARY_API_SECRET in .env.",
        ),
      );
    }
    next(err);
  }
};
