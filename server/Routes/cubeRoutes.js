// routes/cubeRoutes.js
const express = require('express');
const router = express.Router();
const cubeController = require("../controllers/cubeController")
const model = require('../models/CubeModel')

router.post('/cube',cubeController.createCubeValues)

module.exports = router;
