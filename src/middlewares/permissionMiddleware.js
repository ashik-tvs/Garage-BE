module.exports = (requiredRight) => {
  return (req, res, next) => {
    if (!req.user.rights?.includes(requiredRight)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
