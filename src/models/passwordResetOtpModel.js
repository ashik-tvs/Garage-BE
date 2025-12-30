"use strict";

module.exports = (sequelize, DataTypes) => {
  const PasswordResetOtp = sequelize.define(
    "PasswordResetOtp",
    {
      otp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      otp_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      is_used: {
        type: DataTypes.TINYINT,
        defaultValue: 0
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "password_reset_otps",
      timestamps: false // 🔥 VERY IMPORTANT
    }
  );

  return PasswordResetOtp;
};
