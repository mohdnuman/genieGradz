const express=require('express');
const router=express.Router();

const doubtsApiController=require("../../controllers/api/doubts_api.js");

// router.get('/',postsApiController.index);
// router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApiController.destroy); //session:false means to that dont create sesion cookies
router.get('/',doubtsApiController.index);
router.get('/search',doubtsApiController.search);
router.post('/create',doubtsApiController.create);
router.post('/accept/:id',doubtsApiController.accept);
router.post('/resolve/:id',doubtsApiController.resolve);
router.get('/:id',doubtsApiController.show);

module.exports=router;