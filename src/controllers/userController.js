const userService = require("../services/userService");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};

const listUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

module.exports = { createUser, listUsers };
