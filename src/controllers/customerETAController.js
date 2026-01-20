const customerETAService = require("../services/customerETAService");

const customerETA = async (req, res) => {
  try {
    const customerId = req.user.customer_id; // comes from your middleware

    if (!customerId) return res.status(400).json({ message: "Customer not linked to this user" });

    const data = await customerETAService.getCustomerETA(customerId);

    if (!data || data.length === 0) return res.status(404).json({ message: "No ETA found for this customer" });

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { customerETA };
