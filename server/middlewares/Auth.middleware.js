const jwt = require("jsonwebtoken");
const { User } = require("../database/index.js");

exports.isAdmin = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        return decoded.role === "admin";  
    } catch (error) {
        return false;  
    }
};

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database and attach role from token
        const user = await User.findByPk(decoded.id);
        if (user) {
            // Attach the role from the token to the user object
            user.role = decoded.role;
            req.user = user;
        } else {
            console.log('No user found for decoded token:', decoded);
            req.user = null;
        }
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        req.user = null;
        next();
    }
};
