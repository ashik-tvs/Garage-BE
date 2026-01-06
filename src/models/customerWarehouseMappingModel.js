module.exports = (sequelize, DataTypes) => {
  const CustomerWarehouseMapping = sequelize.define(
    "CustomerWarehouseMapping",
    {
      mapping_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      warehouse_priority: {
        type: DataTypes.ENUM("primary", "secondary", "tertiary"),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: "ACTIVE",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "customer_warehouse_mapping",
      timestamps: false,
    }
  );

  return CustomerWarehouseMapping;
};
