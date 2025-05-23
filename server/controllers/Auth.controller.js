require('dotenv').config();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const nodemailer =require ("nodemailer");
const { User } = require("../database/index");
const { authSchema, loginSchema, resetPasswordSchema } = require("../helpers/validation_schema.js");
const { signToken } = require('../helpers/jwt_helper.js');

// Cookie options
const cookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};



// Get current user info (based on token)
module.exports.getCurrentUser = async (req, res) => {
  try {
    // If no authenticated user, return null without error
    if (!req.user) {
      return res.json(null);
    }
    
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'pfp', 'role'], // Changed profilePicture to pfp
    });

    if (!user) {
      console.log('No user found with ID:', req.user.id);
      return res.json(null);
    }

    // Transform the response to match the expected format
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.pfp, // Map pfp to profilePicture for frontend compatibility
      role: user.role
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    console.error('Request user object:', req.user);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};



module.exports.register = async (req, res) => {
    try {
      // 1. Validate input
      const validatedData = await authSchema.validateAsync(req.body);
  
      // 2. Check for existing user by email or username
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: validatedData.email },
            { username: validatedData.username },
          ],
        },
      });
  
      if (existingUser) {
        return res.status(409).json({
          error: "Email or username already exists",
        });
      }
  
      // 3. Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.password, salt);
  
      // 4. Create user
      const newUser = await User.create({
        ...validatedData,
        password: hashedPassword,
      });
  
      // 5. Generate token
      const token = signToken(newUser.id);
  
      // 6. Optional: Set token as a cookie (for cookie-based auth)
      res.cookie("token", token, { httpOnly: true});
  
      // 7. Return response
      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
  
    } catch (error) {
      if (error.isJoi) {
        return res.status(422).json({ error: error.details[0].message });
      }
  
      console.error("Registration error:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  };
// 🔹 Login User
module.exports.login = async (req, res) => {
    try {
        // Validate input
        const result = await loginSchema.validateAsync(req.body);

        // Find user
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: result.identifier }, { email: result.identifier }]
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(result.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create token
        const token = await signToken(user.id);

        // Set cookie
        res.cookie("token", token, cookieOptions);

        // Return success response with user data
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profilePicture: user.pfp,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        if (error.isJoi) {
            return res.status(400).json({ error: error.details[0].message });
        }
        res.status(500).json({ 
            error: 'Error during login',
            details: error.message 
        });
    }
};

// 🔹 Logout
exports.logout = async (req, res) => {
    res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
    res.json({ message: "Logged out successfully" });
};

module.exports.resetPassword = async (req, res) => {
  
  try {
    // Validate input
    const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, newPassword } = value;
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      message: 'Error resetting password',
      error: error.message 
    });
  }
  
};
