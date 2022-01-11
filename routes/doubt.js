const express=require('express');
const router=express.Router();

const doubtsController=require('../controllers/doubts_controller');
router.post('/create',doubtsController.create);
router.post('/accept/:id',doubtsController.accept);


module.exports=router;