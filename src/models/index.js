const sequelize = require("../config/database");

const Company = require("./companyModel")(sequelize);
const BusinessUnit = require("./businessUnitModel")(sequelize);
const VehicleSegment = require("./vehicleSegmentModel")(sequelize);
const CustomerGroup = require("./customerGroupModel")(sequelize);
const User = require("./userModel")(sequelize);
const Role = require("./roleModel")(sequelize);
const UserRole = require("./userRoleModel")(sequelize);
const Right = require("./rightModel")(sequelize);
const RoleRight = require("./roleRightModel")(sequelize);
const UiAsset = require("./uiAssetModel")(sequelize);
const UserProfile = require("./userProfileModel")(sequelize);

/* =========================
   Company & Business Unit
========================= */
Company.hasMany(BusinessUnit, { foreignKey: "company_id" });
BusinessUnit.belongsTo(Company, { foreignKey: "company_id" });

/* =========================
   User Relations
========================= */
User.belongsTo(Company, { foreignKey: "company_id" });
Company.hasMany(User, { foreignKey: "company_id" });

User.belongsTo(BusinessUnit, { foreignKey: "business_unit_id" });
BusinessUnit.hasMany(User, { foreignKey: "business_unit_id" });

User.belongsTo(VehicleSegment, { foreignKey: "segment_id" });
VehicleSegment.hasMany(User, { foreignKey: "segment_id" });

User.belongsTo(CustomerGroup, { foreignKey: "customer_group_id" });
CustomerGroup.hasMany(User, { foreignKey: "customer_group_id" });

User.hasOne(UserProfile, { foreignKey: "user_id" });
UserProfile.belongsTo(User, { foreignKey: "user_id" });


/* =========================
   Roles & Rights
========================= */
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id"
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id"
});

Role.belongsToMany(Right, {
  through: RoleRight,
  foreignKey: "role_id",
  otherKey: "right_id"
});

Right.belongsToMany(Role, {
  through: RoleRight,
  foreignKey: "right_id",
  otherKey: "role_id"
});

/* =========================
   Export
========================= */
module.exports = {
  sequelize,
  Company,
  BusinessUnit,
  VehicleSegment,
  CustomerGroup,
  User,
  Role,
  Right,
  UiAsset,
  UserProfile
};
