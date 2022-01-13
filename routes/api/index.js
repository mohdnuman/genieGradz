const express=require('express');
const router=express.Router();

router.use('/doubts',require("./doubts.js"));


module.exports=router;