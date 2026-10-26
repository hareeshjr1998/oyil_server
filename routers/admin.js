const express = require("express");

const AdminController = require("../controllers/admin.controller.js");

const router = express.Router();

router.post("/register", AdminController.registerAdmin);

router.post("/login", AdminController.loginAdmin);

module.exports = router;