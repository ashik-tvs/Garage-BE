const etaService = require("../services/etaService");

const getCustomerETA = async (req, res) => {
  try {
    const customerId = req.user.customerId;

    if (!customerId) {
      return res.status(403).json({
        message: "ETA access allowed only for customers"
      });
    }

    const etaData = await etaService.getByCustomer(customerId);

    res.status(200).json(etaData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomerETA
};
