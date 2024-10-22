const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

// Existing endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// New endpoint for creating a user
router.post('/users', UsersController.postNew);

module.exports = router;
