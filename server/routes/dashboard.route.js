const router = require("express").Router();
const { verifyToken } = require("../middlewares/Auth.middleware.js");
const {
  getDashboardStats,
  createEstate,
  getAllEstates,
  updateEstate,
  deleteEstate,
  updateUserSettings
} = require("../controllers/dashboard.controller.js");

// Dashboard routes
router.get("/stats", getDashboardStats);

// Estate CRUD routes
router.post("/estates", createEstate);
router.get("/estates", getAllEstates);
router.put("/estates/:id", updateEstate);
router.delete("/estates/:id", deleteEstate);

// User settings route
router.put("/settings", verifyToken, updateUserSettings);

module.exports = router;
