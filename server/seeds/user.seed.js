require('dotenv').config({ path: '../utils/.env' });
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../database/index.js');

const seedUsers = async () => {
  const users = [
    {
      username: 'abdou',
      email: 'abdou@gmail.com',
      password: await bcrypt.hash('abdoulina', 10), // Hash the password
      role: 'admin',
    },
    {
      username: 'Rayen',
      email: 'user1@example.com',
      password: await bcrypt.hash('password123', 10), // Hash the password
      role: 'customer',
    },
    {
      username: 'habiba',
      email: 'user2@example.com',
      password: await bcrypt.hash('password123', 10), // Hash the password
      role: 'customer',
    },
  ];

  try {
    await sequelize.sync({ alter: false }); // Ensure the database is ready
    await User.bulkCreate(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await sequelize.close();
  }
};

seedUsers();