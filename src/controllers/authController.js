const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await authService.login(email, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = { login };
