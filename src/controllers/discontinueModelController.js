const Service = require("../services/discontinueModelService");

exports.create = async (req, res) => {
  try {
    const data = await Service.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Service.findAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBySegment = async (req, res) => {
  try {
    const data = await Service.findBySegment(req.params.segment_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  const data = await Service.findById(req.params.id);
  if (!data) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data });
};

exports.update = async (req, res) => {
  const data = await Service.update(req.params.id, req.body);
  if (!data) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data });
};

exports.remove = async (req, res) => {
  const ok = await Service.delete(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted successfully" });
};
