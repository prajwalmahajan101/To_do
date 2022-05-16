const express = require('express');
const router = express.Router();
const passport = require('passport');


const taskController = require('../controllers/tasks_controller') 

router.post('/create', passport.checkAuthentication,taskController.create);


module.exports = router;