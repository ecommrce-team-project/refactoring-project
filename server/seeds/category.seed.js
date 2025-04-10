require('dotenv').config({ path: '../utils/.env' });
const { sequelize, Category } = require('../database/index.js');

const seedCategories = async () => {
  const categories = [
    { name: 'Studios and 1 Bedrooms',
      img: "https://listings.casacol.co/wp-content/uploads/sites/4/2021/04/studios-1-bedroom-700x405.jpeg",
      alt: "Studios and 1 Bedrooms" },
    { name: 'Apartments', 
      img: "https://i.pinimg.com/474x/d6/f6/dd/d6f6dd02eb7531115b7b65174b042d51.jpg",
      alt: "Apartments"},
    { name: 'Villas and Houses',
       img: "https://i.pinimg.com/736x/72/e0/41/72e041cdc97711fd10e5352551fe7d7d.jpg",
      alt:"Villas and Houses" },
    { name: 'Penthouses', 
       img: "https://listings.casacol.co/wp-content/uploads/sites/4/2021/04/penthouse-700x405.jpeg",
      alt:"Penthouses"
    },
      { name: 'Daily Rental Buildings' ,
        img: "https://listings.casacol.co/wp-content/uploads/sites/4/2021/04/daily-rental-700x405.jpeg",
       alt:"Daily Rental Buildings"},
       { name: 'Vacation Homes' ,
        img: "https://i.pinimg.com/474x/1d/97/a0/1d97a0ede204de98182cf6d2d0591ae3.jpg",
       alt:"Vacation Homes"},
  ];

  try {
    await sequelize.sync({ alter: false }); // Ensure the database is ready
    await Category.bulkCreate(categories);
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await sequelize.close();
  }
};

seedCategories();