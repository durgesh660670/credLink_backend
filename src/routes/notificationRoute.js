const router =require('express').Router();
const notification =require('../models/notification');
router.post('create',notification.createNotification);

module.exports=router;