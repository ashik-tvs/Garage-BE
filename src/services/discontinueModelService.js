const db = require("../models");
const DiscontinueModel = db.DiscontinueModel;

class DiscontinueModelService {
  static create(data) {
    return DiscontinueModel.create(data);
  }

  static findAll() {
    return DiscontinueModel.findAll({
      order: [["created_at", "DESC"]],
    });
  }

  static findBySegment(segment_id) {
    return DiscontinueModel.findAll({
      where: { segment_id },
    });
  }

  static findById(id) {
    return DiscontinueModel.findByPk(id);
  }

  static async update(id, data) {
    const record = await DiscontinueModel.findByPk(id);
    if (!record) return null;
    return record.update(data);
  }

  static async delete(id) {
    const record = await DiscontinueModel.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = DiscontinueModelService;
