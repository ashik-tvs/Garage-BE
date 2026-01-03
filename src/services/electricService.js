const db = require("../models");
const Electric = db.Electric;

class ElectricService {
  static create(data) {
    return Electric.create(data);
  }

  static findAll() {
    return Electric.findAll({ order: [["created_at", "DESC"]] });
  }

  static findBySegment(segment_id) {
    return Electric.findAll({ where: { segment_id } });
  }

  static findById(id) {
    return Electric.findByPk(id);
  }

  static async update(id, data) {
    const record = await Electric.findByPk(id);
    if (!record) return null;
    return record.update(data);
  }

  static async delete(id) {
    const record = await Electric.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = ElectricService;
