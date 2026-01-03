const FastmoversService = require("../services/fastMoversService");

/* =========================
   CREATE FASTMOVER
========================= */
exports.create = async (req, res) => {
  try {
    const { segment_id, partnumber, aggregate } = req.body;

    // 🔐 Validation
    if (!segment_id || !partnumber || !aggregate) {
      return res.status(400).json({
        success: false,
        message: "segment_id, partnumber and aggregate are required"
      });
    }

    const result = await FastmoversService.create({
      segment_id,
      partnumber,
      aggregate
    });

    return res.status(201).json({
      success: true,
      message: "Fastmover created successfully",
      data: result
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET ALL FASTMOVERS
========================= */
exports.getAll = async (req, res) => {
  try {
    const result = await FastmoversService.findAll(req.query);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET BY SEGMENT
========================= */
exports.getBySegment = async (req, res) => {
  try {
    const { segment_id } = req.params;

    const result = await FastmoversService.findBySegment(segment_id);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET BY ID
========================= */
exports.getById = async (req, res) => {
  try {
    const result = await FastmoversService.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Fastmover not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   UPDATE FASTMOVER
========================= */
exports.update = async (req, res) => {
  try {
    const result = await FastmoversService.update(req.params.id, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Fastmover not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fastmover updated successfully",
      data: result
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE FASTMOVER
========================= */
exports.remove = async (req, res) => {
  try {
    const result = await FastmoversService.delete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Fastmover not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fastmover deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
