const {Category}=require("../database/index.js")

module.exports = {
    getAllcategory: async (req, res) => {
      try{
        const category= await Category.findAll()
        res.json(category)
      }catch(error){
        console.error('Database error:', error);
        res.status(500).json({
          message: 'Error fetching categories',
          error: error.message,
        });
      }
    }

  };