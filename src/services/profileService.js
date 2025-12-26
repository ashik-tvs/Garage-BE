const {
  User,
  UserProfile,
  Company,
  BusinessUnit,
  VehicleSegment,
  CustomerGroup
} = require("../models");

/* =========================
   GET PROFILE
========================= */
exports.getProfileByUserId = async (userId) => {
  return await User.findOne({
    where: { user_id: userId },
    attributes: ["user_id", "email"],
    include: [
      {
        model: UserProfile
      },
      {
        model: Company,
        attributes: ["company_id", "company_name"]
      },
      {
        model: BusinessUnit,
        attributes: ["business_unit_id", "business_unit_name"]
      },
      {
        model: VehicleSegment,
        attributes: ["segment_id", "segment_name"]
      },
      {
        model: CustomerGroup,
        attributes: ["customer_group_id", "group_name"]
      }
    ]
  });
};

/* =========================
   UPDATE / CREATE PROFILE
========================= */
exports.updateProfileByUserId = async (userId, data) => {
  const [profile, created] = await UserProfile.findOrCreate({
    where: { user_id: userId },
    defaults: {
      user_id: userId,
      ...data
    }
  });

  if (!created) {
    await profile.update(data);
  }

  return profile;
};
