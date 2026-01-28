module.exports = (sequelize, DataTypes) => {
  const CustomerMaster = sequelize.define(
    "CustomerMaster",
    {
      customer_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      party_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      party_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      account_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      account_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      customer_group: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      party_site_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      primary_warehouse_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pan_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      registration_number: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      address1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(100),
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
      tableName: "customer_master_new",
      timestamps: false,
    },
  );

  return CustomerMaster;
};
