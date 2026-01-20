const { CustomerWarehouseMapping, WarehouseETA } = require("../models");

const getByCustomer = async (customerId) => {
  return await CustomerWarehouseMapping.findAll({
    where: { customer_id: customerId, status: "ACTIVE" },
    attributes: ["warehouse_id", "warehouse_priority"],
    include: [
      {
        model: WarehouseETA,
        as: "etas", // must match the alias above
        attributes: ["eta_days_min", "eta_days_max"],
        where: { status: "ACTIVE" },
        required: false,
      },
    ],
  });
};

module.exports = { getByCustomer };
