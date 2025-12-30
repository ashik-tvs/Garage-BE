const { UiAsset } = require("../models");

class UiAssetService {
  async getByTag(tagName) {
    return await UiAsset.findOne({
      where: {
        tag_name: tagName,
        is_active: 1
      }
    });
  }

  async getAllActive() {
    return await UiAsset.findAll({
      where: { is_active: 1 },
      order: [["display_order", "ASC"]]
    });
  }
}

module.exports = new UiAssetService();
