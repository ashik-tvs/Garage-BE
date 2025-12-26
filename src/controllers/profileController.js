const profileService = require("../services/profileService");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const profile = await profileService.getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id; // from JWT

    if (!userId) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const profile = await profileService.updateProfileByUserId(
      userId,
      req.body
    );

    res.json({
      message: "Profile updated successfully",
      profile
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

