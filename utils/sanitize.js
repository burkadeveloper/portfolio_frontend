const pick = (obj = {}, keys = []) => {
  const out = {};
  for (const k of keys) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
};

const sanitizeProject = (body = {}) => {
  const data = pick(body, [
    "title",
    "description",
    "techStack",
    "imageUrl",
    "videoUrl",
    "liveLink",
    "githubLink",
    "featured",
    "order",
  ]);
  if (Array.isArray(data.techStack)) {
    data.techStack = data.techStack
      .map((s) => String(s).trim())
      .filter(Boolean);
  }
  if (data.order !== undefined) data.order = Number(data.order) || 0;
  if (data.featured !== undefined) data.featured = Boolean(data.featured);
  return data;
};

const sanitizeSkill = (body = {}) => {
  const data = pick(body, ["name", "category", "level", "order"]);
  if (data.level !== undefined) data.level = Number(data.level) || 0;
  if (data.order !== undefined) data.order = Number(data.order) || 0;
  return data;
};

const sanitizeProfile = (body = {}) => {
  const data = pick(body, [
    "name",
    "title",
    "bio",
    "avatar",
    "heroImage",
    "aboutImage",
    "resumeUrl",
    "email",
    "phone",
    "location",
  ]);
  if (body.socials && typeof body.socials === "object") {
    data.socials = pick(body.socials, [
      "github",
      "linkedin",
      "twitter",
      "website",
    ]);
  }
  return data;
};

module.exports = { sanitizeProject, sanitizeSkill, sanitizeProfile };
