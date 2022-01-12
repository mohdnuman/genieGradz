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
        console.log('hellllo');
        let doubt=await Doubt.findById(req.params.id);
        
        doubt.accepted= true;
        doubt.acceptedBy=req.body.user;
        doubt.save();

        return res.redirect('/doubt/'+req.params.id);
        
        // return res.render('doubtpage',{
        //     doubt:doubt,
        // });
        
    }
    catch(err){
        console.log("error:",err);
        return;
    }
}


module.exports.resolve=async function(req,res){
    try{
        let doubt=await Doubt.findById(req.params.id);

        doubt.resolved=true;
        doubt.save();

        return res.render('doubtpage',{
            doubt:doubt,
        });
        
    }
    catch(err){
        console.log("error:",err);
        return;
    }
}


module.exports.search=async function(req,res){
    try{
        // console.log(req.query.topic);
        let doubts=await Doubt.find({'topic':req.query.topic})
        .sort('-createdAt');
        
        return res.render('searchResultPage',{
            searchedDoubts:doubts,
        });

    }catch(err){
        console.log("error occured:",err);
        return;

    }
    
}

module.exports.show=async function(req,res){
    try{
        let doubt=await Doubt.findById(req.params.id);

        return res.render('doubtpage',{
            doubt:doubt,
        });
        
    }
    catch(err){
        console.log("error:",err);
        return;
    }
}