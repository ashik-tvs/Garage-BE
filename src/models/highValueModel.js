const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("highvalue", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    segment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    partnumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    aggregate: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: "highvalue",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
