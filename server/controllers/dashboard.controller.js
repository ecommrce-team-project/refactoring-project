const { User, Estate, Category, Contact } = require("../database/index.js");

const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.count();
    const estatesCount = await Estate.count();
    const categoriesCount = await Category.count();
    const contactsCount = await Contact.count();

    res.status(200).json({
      users: usersCount,
      estates: estatesCount,
      categories: categoriesCount,
      contacts: contactsCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new estate
const createEstate = async (req, res) => {
  try {
    const { title, description, price, location, bathrooms, bedrooms, area, category_id, image_url } = req.body;
    
    // Validate required fields
    if (!title || !price || !location || !category_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const estate = await Estate.create({
      title,
      description,
      price,
      location,
      bathrooms,
      bedrooms,
      area,
      category_id,
      image_url
    });

    res.status(201).json({ message: 'Estate created successfully', estate });
  } catch (error) {
    console.error('Error creating estate:', error);
    res.status(500).json({ message: 'Error creating estate', error: error.message });
  }
};

// Get all estates
const getAllEstates = async (req, res) => {
  try {
    const estates = await Estate.findAll({
      include: [{
        model: Category,
        attributes: ['name']
      }]
    });
    res.status(200).json(estates);
  } catch (error) {
    console.error('Error fetching estates:', error);
    res.status(500).json({ message: 'Error fetching estates', error: error.message });
  }
};

// Update an estate
const updateEstate = async (req, res) => {
  try {
    const { id } = req.params;
    const estate = await Estate.findByPk(id);
    
    if (!estate) {
      return res.status(404).json({ message: 'Estate not found' });
    }

    await estate.update(req.body);
    res.status(200).json({ message: 'Estate updated successfully', estate });
  } catch (error) {
    console.error('Error updating estate:', error);
    res.status(500).json({ message: 'Error updating estate', error: error.message });
  }
};

// Delete an estate
const deleteEstate = async (req, res) => {
  try {
    const { id } = req.params;
    const estate = await Estate.findByPk(id);
    
    if (!estate) {
      return res.status(404).json({ message: 'Estate not found' });
    }

    await estate.destroy();
    res.status(200).json({ message: 'Estate deleted successfully' });
  } catch (error) {
    console.error('Error deleting estate:', error);
    res.status(500).json({ message: 'Error deleting estate', error: error.message });
  }
};

// Update user settings
const updateUserSettings = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the fields that are provided
    const updateData = {};
    if (name) updateData.username = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    await user.update(updateData);
    res.status(200).json({ message: 'User settings updated successfully' });
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ message: 'Error updating user settings', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  createEstate,
  getAllEstates,
  updateEstate,
  deleteEstate,
  updateUserSettings
};
