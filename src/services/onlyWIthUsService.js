const db = require("../models");
const OnlyWithUs = db.OnlyWithUs;

class OnlyWithUsService {
  static create(data) {
    return OnlyWithUs.create(data);
  }

  static findAll() {
    return OnlyWithUs.findAll({
      order: [["created_at", "DESC"]],
    });
  }

  static findBySegment(segment_id) {
    return OnlyWithUs.findAll({
      where: { segment_id },
    });
  }

  static findById(id) {
    return OnlyWithUs.findByPk(id);
  }

  static async update(id, data) {
    const record = await OnlyWithUs.findByPk(id);
    if (!record) return null;
    return record.update(data);
  }

  static async delete(id) {
    const record = await OnlyWithUs.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = OnlyWithUsService;
