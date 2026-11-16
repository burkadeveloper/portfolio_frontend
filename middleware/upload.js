const multer = require("multer");

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 60 * 1024 * 1024 }, // 60MB — enough for a 1–2 min demo
  fileFilter: (req, file, cb) => {
    const ok = /^image\/|^video\//.test(file.mimetype);
    if (!ok) return cb(new Error("Only images and videos are allowed"));
    cb(null, true);
  },
});
