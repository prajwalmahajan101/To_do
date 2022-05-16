const express = require('express');
const router = express.Router();
const passport = require('passport');


const taskController = require('../controllers/tasks_controller') 

router.post('/create', passport.checkAuthentication,taskController.create);
router.get('/delete/:id', passport.checkAuthentication,taskController.distroy);
router.get('/complete/:id', passport.checkAuthentication,taskController.complete);


module.exports = router;