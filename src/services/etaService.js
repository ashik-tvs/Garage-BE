const { CustomerWarehouseMapping } = require("../models");

const getByCustomer = async (customerId) => {
  return await CustomerWarehouseMapping.findAll({
    where: {
      customer_id: customerId,
      status: "ACTIVE",
    },
    attributes: ["warehouse_id", "warehouse_priority"],
  });
};

module.exports = { getByCustomer };
