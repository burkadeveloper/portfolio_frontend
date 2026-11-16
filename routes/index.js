const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const authC = require("../controllers/authController");
const projectC = require("../controllers/projectController");
const skillC = require("../controllers/skillController");
const profileC = require("../controllers/profileController");
const messageC = require("../controllers/messageController");
const uploadC = require("../controllers/uploadController");

// Auth
router.post("/auth/login", authC.login);
router.get("/auth/me", auth, authC.me);

// Profile
router.get("/profile", profileC.getProfile);
router.put("/profile", auth, profileC.updateProfile);

// Projects
router.get("/projects", projectC.getProjects);
router.get("/projects/:id", projectC.getProject);
router.post("/projects", auth, projectC.createProject);
router.put("/projects/:id", auth, projectC.updateProject);
router.delete("/projects/:id", auth, projectC.deleteProject);

// Skills
router.get("/skills", skillC.getSkills);
router.post("/skills", auth, skillC.createSkill);
router.put("/skills/:id", auth, skillC.updateSkill);
router.delete("/skills/:id", auth, skillC.deleteSkill);

// Messages
router.post("/messages", messageC.createMessage);
router.get("/messages", auth, messageC.getMessages);
router.put("/messages/:id/read", auth, messageC.markRead);
router.delete("/messages/:id", auth, messageC.deleteMessage);

// Upload
router.post("/upload", auth, upload.single("image"), uploadC.uploadImage);

module.exports = router;
