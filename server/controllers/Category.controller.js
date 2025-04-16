const { Category, Estate, sequelize } = require("../database/index.js");

module.exports = {
  getAllcategory: async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: [
          'id',
          'name',
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Estates" e
              WHERE e.category_id = "Category".id
            )`),
            'value'
          ]
        ],
        raw: true
      });

      res.json(categories);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({
        message: 'Error fetching categories',
        error: error.message,
      });
    }
  }
};