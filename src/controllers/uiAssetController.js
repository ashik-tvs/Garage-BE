const uiAssetService = require("../services/uiAssetService");

exports.getAssetByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    const asset = await uiAssetService.getByTag(tag);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    res.json({
      success: true,
      data: {
        tag_name: asset.tag_name,
        asset_type: asset.asset_type,
        file_url: asset.file_url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await uiAssetService.getAllActive();

    const response = {};
    assets.forEach((asset) => {
      response[asset.tag_name] = asset.file_url;
    });

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
