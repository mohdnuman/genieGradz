const Doubt=require('../models/doubt');

module.exports.home=async function(req,res){
    try{
        let doubts=await Doubt.find({'accepted':false})
        .sort('-createdAt')
        .populate('user');
        
        return res.render('home',{
            doubts:doubts,
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}