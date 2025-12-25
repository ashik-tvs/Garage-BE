const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("rights", {
    right_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    right_code: {
      type: DataTypes.STRING,
      unique: true
    },
    right_name: DataTypes.STRING,
    module: DataTypes.STRING
  }, {
    timestamps: false
  });
};
