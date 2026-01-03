const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("vehicle_segments", {
    segment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
      segment_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
    segment_name: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    timestamps: false
  });
};
