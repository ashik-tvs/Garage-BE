const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("ui_assets", {
    asset_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: DataTypes.INTEGER,
    segment_id: DataTypes.INTEGER,
    business_unit_id: DataTypes.INTEGER,

    asset_type: DataTypes.ENUM("ICON", "IMAGE", "BANNER", "LOGO"),
    tag_name: DataTypes.STRING,
    asset_name: DataTypes.STRING,

    file_url: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_size_kb: DataTypes.INTEGER,

    is_active: DataTypes.TINYINT,
    display_order: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
