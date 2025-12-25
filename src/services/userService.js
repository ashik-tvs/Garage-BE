const { User } = require("../models");
const { hashPassword } = require("../../utils/passwordUtil");

const createUser = async (data) => {
  data.password_hash = await hashPassword(data.password);
  return User.create(data);
};

const getUsers = async () => {
  return User.findAll();
};

module.exports = { createUser, getUsers };
