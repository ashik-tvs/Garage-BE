const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, CustomerMaster } = require("../models");
const { forgotPassword, verifyResetOtp, resetPassword } = require("../controllers/authController");

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("Invalid email or password");
  if (user.status !== 1) throw new Error("User inactive");

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  // 🔥 CUSTOMER CONTEXT RESOLUTION
  if (!user.customer_id) {
    throw new Error("No customer mapped to this user");
  }

  const customer = await CustomerMaster.findOne({
    where: { customer_id: user.customer_id }
  });

  if (!customer) {
    throw new Error("Customer mapping broken");
  }

  const token = jwt.sign(
    {
      userId: user.user_id,
      customerId: user.customer_id,
      segmentId: user.segment_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      user_id: user.user_id,
      email: user.email,
      segment_id: user.segment_id,
      customer_id: user.customer_id
    },
    customer: {
      customer_id: customer.customer_id,
      party_number: customer.party_number,
      party_name: customer.party_name,
      account_name: customer.account_name,
      phone_number: customer.phone_number,
      city: customer.city,
      state: customer.state,
      primary_warehouse_code: customer.primary_warehouse_code
    }
  };
};

module.exports = {
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword
};
