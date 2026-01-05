const db = require("../models");
const Highvalue = db.Highvalue;
const { Sequelize } = require("sequelize");

class HighvalueService {
  static create(data) {
    return Highvalue.create(data);
  }

  static findAll() {
    return Highvalue.findAll({ order: [["created_at", "DESC"]] });
  }

  static async findUniqueCategories() {
    const results = await Highvalue.findAll({
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

  static findBySegment(segment_id) {
    return Highvalue.findAll({ where: { segment_id } });
  }

  static findById(id) {
    return Highvalue.findByPk(id);
  }

  static async update(id, data) {
    const record = await Highvalue.findByPk(id);
    if (!record) return null;
    return record.update(data);
  }

  static async delete(id) {
    const record = await Highvalue.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = HighvalueService;
