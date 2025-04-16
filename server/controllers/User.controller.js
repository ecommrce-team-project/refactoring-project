const { where } = require('sequelize');
const { User } = require('../database/index.js');
const { isAdmin } = require('../middlewares/Auth.middleware.js');

// Controller for handling user-related operations
const UserController = {
    createUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({ message: "Unauthorized action" });
            }
            const user = await User.create({ name, email, password, role });
            res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            if (!isAdmin(req.cookies.token) || !isAdmin(req.headers.token.split(" ")[1])) {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },


    // Get a single user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },


    // Update a user by ID
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
    
            // Check if the user exists before updating
            const user = await User.findByPk(userId);  // `findByPk` is the correct Sequelize method
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Proceed with the update
            const updatedUser = await User.update(req.body, {
                where: { id: userId },
                returning: true,  // This ensures that the updated user data is returned
                plain: true,      // This ensures that a single object is returned instead of an array
            });
    
            if (updatedUser[0] === 0) {
                return res.status(400).json({ message: 'No changes made' });  // No rows updated
            }
    
            res.status(200).json(updatedUser[1]);  // Return the updated user data
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },
    


    // Delete a user by ID
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },
};

module.exports = UserController;