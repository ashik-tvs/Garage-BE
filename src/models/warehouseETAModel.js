module.exports = (sequelize, DataTypes) => {
  const WarehouseETA = sequelize.define(
    "WarehouseETA",
    {
      eta_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mapping_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eta_days_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eta_days_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transport_mode: {
        type: DataTypes.ENUM("road"),
        defaultValue: "road",
      },
      effective_from: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW, 
      },
      effective_to: {
        type: DataTypes.DATEONLY,
        allowNull: true,
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
      tableName: "warehouse_eta",
      timestamps: false,
      validate: {
        minMaxCheck() {
          if (this.eta_days_min > this.eta_days_max) {
            throw new Error("eta_days_min cannot be greater than eta_days_max");
          }
        },
      },
    }
  );

  return WarehouseETA;
};
