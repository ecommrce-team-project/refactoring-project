const { where } = require('sequelize');
const { User } = require('../database/index.js');
const { isAdmin } = require('../middlewares/Auth.middleware.js');
// Controller for handling user-related operations
const UserController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({ message: "Unauthorized action" });
            }
            const user = await User.create({ username, email, password, role });
            res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'username', 'email', 'status', 'createdAt']
            });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
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
            const user = await User.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const updatedUser = await user.update({
                ...req.body,
                status: req.body.status || user.status
            });

            res.status(200).json(updatedUser);
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