const HighvalueService = require("../services/highValueService");

exports.create = async (req, res) => {
  try {
    const result = await HighvalueService.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAll = async (_, res) => {
  const data = await HighvalueService.findAll();
  res.json({ success: true, data });
};

exports.getUniqueCategories = async (req, res) => {
  try {
    const categories = await HighvalueService.findUniqueCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBySegment = async (req, res) => {
  const data = await HighvalueService.findBySegment(req.params.segment_id);
  res.json({ success: true, data });
};

exports.getById = async (req, res) => {
  const data = await HighvalueService.findById(req.params.id);
  if (!data) return res.status(404).json({ success: false });
  res.json({ success: true, data });
};

exports.update = async (req, res) => {
  const data = await HighvalueService.update(req.params.id, req.body);
  if (!data) return res.status(404).json({ success: false });
  res.json({ success: true, data });
};

exports.remove = async (req, res) => {
  const ok = await HighvalueService.delete(req.params.id);
  if (!ok) return res.status(404).json({ success: false });
  res.json({ success: true });
};
