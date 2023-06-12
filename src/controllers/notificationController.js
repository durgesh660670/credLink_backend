const notification=require('../models/notification');

const pushNotification =async (req,res)=>{
    const notify=await notification.publishNotification(req.body);
    res.send(notify);
}

module.exports={
    createNotification:pushNotification
}