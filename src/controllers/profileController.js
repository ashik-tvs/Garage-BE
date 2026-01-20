const profileService = require("../services/profileService");

/* =========================
   GET PROFILE
========================= */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const profile = await profileService.getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const profile = await profileService.updateProfileByUserId(
      userId,
      req.body
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      profile
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
