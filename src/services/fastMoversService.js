const db = require("../models");
const Fastmover = db.Fastmover;
const { Sequelize } = require("sequelize");

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

  static async findUniqueCategories() {
    const results = await Fastmover.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('aggregate')), 'aggregate']
      ],
      where: {
        aggregate: {
          [Sequelize.Op.ne]: null
        }
      },
      order: [['aggregate', 'ASC']],
      raw: true
    });
    
    return results.map(item => item.aggregate);
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
