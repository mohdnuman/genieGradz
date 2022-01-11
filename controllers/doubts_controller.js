const Doubt=require('../models/doubt');


module.exports.create=async function(req,res){
    try{
        let doubt=await Doubt.create({
            description:req.body.description,
            user:req.body.user,
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
        
        doubt.resolved= true;
        doubt.save();
                   
        return res.redirect('back');
        
    }
    catch(err){
        console.log("error:",err);
        return;
    }
}