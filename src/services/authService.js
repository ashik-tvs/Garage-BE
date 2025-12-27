const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, PasswordResetOtp } = require("../models");

// ================= LOGIN =================
const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("Invalid email or password");
  if (user.status !== 1) throw new Error("User is inactive");

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new Error("Invalid email or password");

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

// ================= FORGOT PASSWORD =================

// 1️⃣ Request OTP
const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.status !== 1) {
    throw new Error("User not found or inactive");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);

  await PasswordResetOtp.create({
    user_id: user.user_id,
    otp_hash: otpHash,
    expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 mins
  });

  // 🔔 TEMP: log OTP (replace with email/SMS)
  console.log("Password reset OTP:", otp);

  return { message: "OTP sent successfully" };
};

// 2️⃣ Verify OTP
const verifyResetOtp = async (email, otp) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid request");

  const otpRecord = await PasswordResetOtp.findOne({
    where: { user_id: user.user_id, is_used: 0 },
    order: [["created_at", "DESC"]]
  });

  if (!otpRecord) throw new Error("OTP not found");
  if (otpRecord.expires_at < new Date()) throw new Error("OTP expired");

  const isValid = await bcrypt.compare(otp, otpRecord.otp_hash);
  if (!isValid) throw new Error("Invalid OTP");

  otpRecord.is_used = 1;
  await otpRecord.save();

  return { message: "OTP verified successfully" };
};

// 3️⃣ Reset Password
const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid request");

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password_hash = hashedPassword;
  await user.save();

  await PasswordResetOtp.update(
    { is_used: 1 },
    { where: { user_id: user.user_id } }
  );

  return { message: "Password reset successful" };
};

module.exports = {
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword
};
