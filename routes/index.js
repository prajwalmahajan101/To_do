const express = require('express');
const homeController = require('../controllers/home_controller');



const router = express.Router();

console.log('router loaded');


router.get('/', homeController.home);
router.use('/apis',require('./apis'));
router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

module.exports = router;