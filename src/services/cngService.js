const db = require("../models");
const Cng = db.Cng;

class CngService {
  static create(data) {
    return Cng.create(data);
  }
  static findAll() {
    return Cng.findAll({ order: [["created_at", "DESC"]] });
  }
  static findBySegment(segment_id) {
    return Cng.findAll({ where: { segment_id } });
  }
  static findById(id) {
    return Cng.findByPk(id);
  }
  static async update(id, data) {
    const r = await Cng.findByPk(id);
    if (!r) return null;
    return r.update(data);
  }
  static async delete(id) {
    const r = await Cng.findByPk(id);
    if (!r) return null;
    await r.destroy();
    return true;
  }
}

module.exports = CngService;
