const CngService = require("../services/cngService");

exports.create = async (req, res) => {
  const result = await CngService.create(req.body);
  res.status(201).json({ success: true, data: result });
};
exports.getAll = async (_, res) => {
  const data = await CngService.findAll();
  res.json({ success: true, data });
};
exports.getBySegment = async (req, res) => {
  const data = await CngService.findBySegment(req.params.segment_id);
  res.json({ success: true, data });
};
exports.getById = async (req, res) => {
  const data = await CngService.findById(req.params.id);
  if (!data) return res.status(404).json({ success: false });
  res.json({ success: true, data });
};
exports.update = async (req, res) => {
  const data = await CngService.update(req.params.id, req.body);
  if (!data) return res.status(404).json({ success: false });
  res.json({ success: true, data });
};
exports.remove = async (req, res) => {
  const ok = await CngService.delete(req.params.id);
  if (!ok) return res.status(404).json({ success: false });
  res.json({ success: true });
};
