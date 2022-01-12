const express=require('express');
const router=express.Router();

const doubtsController=require('../controllers/doubts_controller');
router.get('/search',doubtsController.search);
router.post('/create',doubtsController.create);
router.post('/accept/:id',doubtsController.accept);
router.post('/resolve/:id',doubtsController.resolve);
router.get('/:id',doubtsController.show);


module.exports=router;