const express = require("express");
const { verifyToken } = require("../middlewares/Auth.middleware.js");
const {createUser,deleteUser,getAllUsers,getUserById,updateUser} = require("../controllers/User.controller.js");

const router = express.Router();

router.post("/create-user", verifyToken, createUser);
router.get("/all-users", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;