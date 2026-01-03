const db = require("../models");
const Fastmover = db.Fastmover;

class FastmoversService {
  static async create(data) {
    return await Fastmover.create(data);
  }

  static async findAll(filters = {}) {
    return await Fastmover.findAll({
      where: filters,
      order: [["created_at", "DESC"]]
    });
  }

  static async findBySegment(segment_id) {
    return await Fastmover.findAll({
      where: { segment_id }
    });
  }

  static async findById(id) {
    return await Fastmover.findByPk(id);
  }

  static async update(id, data) {
    const record = await Fastmover.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  static async delete(id) {
    const record = await Fastmover.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = FastmoversService;
