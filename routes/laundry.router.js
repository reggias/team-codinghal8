const express = require("express");
const { QueryTypes } = require("sequelize");
const router = express.Router();

const LaundryController = require('../controllers/laundry.controller.js');
const laundryController = new LaundryController();

router.get('/laundry', laundryController.getLaundry);

module.exports = router;