const Doubt=require("../../models/doubt");

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
        
        return res.json(200,{
            message:"doubt created",
            doubt:doubt
        })

    }catch(err){
        console.log("error occurred:",err);
        return res.json(500,{
            message:"internal server error!"
        });
    }
   
}

module.exports.accept=async function(req,res){
    try{
        console.log('hellllo');
        let doubt=await Doubt.findById(req.params.id);
        
        doubt.accepted= true;
        doubt.acceptedBy=req.body.user;
        doubt.save();

        // return res.redirect('/doubt/'+req.params.id);
        
        return res.json(200,{
            message:"doubt accepted",
            doubt:doubt
        })
        
        
    }
    catch(err){
        console.log("error occurred:",err);
        return res.json(500,{
            message:"internal server error!"
        });
    }
}


module.exports.resolve=async function(req,res){
    try{
        let doubt=await Doubt.findById(req.params.id);

        doubt.resolved=true;
        doubt.save();

        return res.json(200,{
            message:"doubt resolved",
            doubt:doubt
        })
    }
    catch(err){
        console.log("error occurred:",err);
        return res.json(500,{
            message:"internal server error!"
        });
    }
}


module.exports.search=async function(req,res){
    try{
        // console.log(req.query.topic);
        let doubts=await Doubt.find({'topic':req.query.topic})
        .sort('-createdAt');
        
        return res.json(200,{
            message:"list of searched doubts",
            doubts:doubts
        })

    }catch(err){
        console.log("error occurred:",err);
        return res.json(500,{
            message:"internal server error!"
        });

    }
    
}

module.exports.show=async function(req,res){
    try{
        let doubt=await Doubt.findById(req.params.id);

        return res.json(200,{
            message:"doubt found",
            doubt:doubt
        })
        
    }
    catch(err){
        console.log("error occurred:",err);
        return res.json(500,{
            message:"internal server error!"
        });
    }
}