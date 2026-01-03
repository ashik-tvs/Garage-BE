const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* =========================
   Models
========================= */
db.Company = require("./companyModel")(sequelize, Sequelize.DataTypes);
db.BusinessUnit = require("./businessUnitModel")(
  sequelize,
  Sequelize.DataTypes
);
db.VehicleSegment = require("./vehicleSegmentModel")(
  sequelize,
  Sequelize.DataTypes
);
db.CustomerGroup = require("./customerGroupModel")(
  sequelize,
  Sequelize.DataTypes
);
db.User = require("./userModel")(sequelize, Sequelize.DataTypes);
db.Role = require("./roleModel")(sequelize, Sequelize.DataTypes);
db.UserRole = require("./userRoleModel")(sequelize, Sequelize.DataTypes);
db.Right = require("./rightModel")(sequelize, Sequelize.DataTypes);
db.RoleRight = require("./roleRightModel")(sequelize, Sequelize.DataTypes);
db.UiAsset = require("./uiAssetModel")(sequelize, Sequelize.DataTypes);
db.UserProfile = require("./userProfileModel")(sequelize, Sequelize.DataTypes);
db.PasswordResetOtp = require("./passwordResetOtpModel")(
  sequelize,
  Sequelize.DataTypes
);

/* ===== New Product Classification Models ===== */
db.Fastmover = require("./fastmoversModel")(sequelize);
db.Highvalue = require("./highvalueModel")(sequelize);
db.Cng = require("./cngModel")(sequelize);
db.Electric = require("./electricModel")(sequelize);
db.DiscontinueModel = require("./discontinueModel")(sequelize);
db.OnlyWithUs = require("./onlywithusModel")(sequelize);

/* =========================
   Associations
========================= */
db.Company.hasMany(db.BusinessUnit, { foreignKey: "company_id" });
db.BusinessUnit.belongsTo(db.Company, { foreignKey: "company_id" });

db.User.belongsTo(db.Company, { foreignKey: "company_id" });
db.Company.hasMany(db.User, { foreignKey: "company_id" });

db.User.belongsTo(db.BusinessUnit, { foreignKey: "business_unit_id" });
db.BusinessUnit.hasMany(db.User, { foreignKey: "business_unit_id" });

db.User.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });
db.VehicleSegment.hasMany(db.User, { foreignKey: "segment_id" });

db.User.belongsTo(db.CustomerGroup, { foreignKey: "customer_group_id" });
db.CustomerGroup.hasMany(db.User, { foreignKey: "customer_group_id" });

db.User.hasOne(db.UserProfile, { foreignKey: "user_id" });
db.UserProfile.belongsTo(db.User, { foreignKey: "user_id" });

db.User.belongsToMany(db.Role, {
  through: db.UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
});

db.Role.belongsToMany(db.User, {
  through: db.UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
});

db.Role.belongsToMany(db.Right, {
  through: db.RoleRight,
  foreignKey: "role_id",
  otherKey: "right_id",
});

db.Right.belongsToMany(db.Role, {
  through: db.RoleRight,
  foreignKey: "right_id",
  otherKey: "role_id",
});

/* ===== Segment-based Associations ===== */
db.VehicleSegment.hasMany(db.Fastmover, { foreignKey: "segment_id" });
db.Fastmover.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });

db.VehicleSegment.hasMany(db.Highvalue, { foreignKey: "segment_id" });
db.Highvalue.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });

db.VehicleSegment.hasMany(db.Cng, { foreignKey: "segment_id" });
db.Cng.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });

db.VehicleSegment.hasMany(db.Electric, { foreignKey: "segment_id" });
db.Electric.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });

db.VehicleSegment.hasMany(db.DiscontinueModel, { foreignKey: "segment_id" });
db.DiscontinueModel.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });

db.VehicleSegment.hasMany(db.OnlyWithUs, { foreignKey: "segment_id" });
db.OnlyWithUs.belongsTo(db.VehicleSegment, { foreignKey: "segment_id" });

module.exports = db;
