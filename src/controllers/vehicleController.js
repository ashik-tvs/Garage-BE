const vehicleService = require("../services/vehicleService");

const dashboardAssets = async (req, res) => {
  const assets = await vehicleService.getDashboardAssets(
    req.query.companyId,
    req.query.segmentId
  );
  res.json(assets);
};

module.exports = { dashboardAssets };
