const express=require('express');
const router=express.Router();

const chatController=require('../controllers/chat_controller');
router.post('/message/create',chatController.createMessage);

module.exports=router;
