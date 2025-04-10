require('dotenv').config({ path: './utils/.env' });
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || "realstate",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    throw err;
  });

const User = require('../models/User.model')(sequelize, DataTypes);
const Estate = require('../models/Estate.model')(sequelize, DataTypes);
const Category = require('../models/Categorie.model')(sequelize, DataTypes);
const Contact = require('../models/Contactus.models')(sequelize, DataTypes);

Category.hasMany(Estate, { foreignKey: 'category_id' });
Estate.belongsTo(Category, { foreignKey: 'category_id' });

// RELATION BETWEN USER AND CONTACT 
User.hasMany(Contact, { foreignKey: 'user_id' });
Contact.belongsTo(User, { foreignKey: 'user_id' });


// sequelize
//   .sync({ force: true })
//   .then(async () => {
//     console.log("Tables are being created in the correct order");
//     console.log("Tables are created successfully");
//   })
//   .catch((err) => {
//     console.error("Error synchronizing tables:", err);
//   });


module.exports = { sequelize, Estate, Category, User , Contact};