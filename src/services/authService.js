const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== 1) {
    throw new Error("User is inactive");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.user_id,
      companyId: user.company_id,
      segmentId: user.segment_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    message: "Login successful",
    token,
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      company_id: user.company_id,
      business_unit_id: user.business_unit_id,
      segment_id: user.segment_id
    }
  };
};

module.exports = { login };
