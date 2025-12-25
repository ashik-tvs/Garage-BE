const { UiAsset } = require("../models");

const getDashboardAssets = async (companyId, segmentId) => {
  return UiAsset.findAll({
    where: { company_id: companyId, segment_id: segmentId }
  });
};

module.exports = { getDashboardAssets };
