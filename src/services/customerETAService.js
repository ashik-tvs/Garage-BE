const { CustomerMaster, CustomerWarehouseMapping, Warehouse, WarehouseETA } = require("../models");
const { Op } = require("sequelize");

const getCustomerETA = async (customerId) => {
  if (!customerId) throw new Error("Customer ID is required");

  const mappings = await CustomerWarehouseMapping.findAll({
    where: { customer_id: customerId, status: "ACTIVE" },
    include: [
      { model: Warehouse, attributes: ["warehouse_id", "warehouse_code", "warehouse_name", "city", "state"] },
      {
        model: WarehouseETA,
        where: {
          status: "ACTIVE",
          effective_from: { [Op.lte]: new Date() },
          [Op.or]: [
            { effective_to: null },
            { effective_to: { [Op.gte]: new Date() } }
          ]
        },
        required: false
      }
    ],
    order: [["warehouse_priority", "ASC"]]
  });

  return mappings;
};

module.exports = { getCustomerETA };
