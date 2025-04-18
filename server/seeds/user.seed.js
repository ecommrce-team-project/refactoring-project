require('dotenv').config({ path: '../utils/.env' });
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../database/index.js');

const seedUsers = async () => {
  try {
    // First clear existing users
    await User.destroy({ where: {}, truncate: true });

    const users = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        isBanned: false
      },
      {
        username: 'Rayen',
        email: 'user1@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'customer',
        isBanned: false
      },
      {
        username: 'habiba',
        email: 'user2@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'customer',
        isBanned: false
      }
    ];

    await sequelize.sync({ alter: false }); // Ensure the database is ready
    await User.bulkCreate(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed function
seedUsers();