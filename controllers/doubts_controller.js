const Doubt=require('../models/doubt');


module.exports.create=async function(req,res){
    try{
        let doubt=await Doubt.create({
            topic:req.body.topic,
            description:req.body.description,
            user:req.body.user,
            accepted:false,
            acceptedBy:'none',
            resolved:false
        });
        
        return res.redirect('back');
    }catch(err){
        console.log("error:",err);
        return;
    }
   
}

module.exports.accept=async function(req,res){
    try{
        let doubt=await Doubt.findById(req.params.id);
        
        doubt.accepted= true;
        doubt.acceptedBy=req.body.user;
        doubt.save();

        return res.redirect('back');
        
    }
    catch(err){
        console.log("error:",err);
        return;
    }
}