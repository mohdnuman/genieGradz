const mongoose=require('mongoose');

const doubtSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    resolved:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
});

const Doubt=mongoose.model('Doubt',doubtSchema);
module.exports=Doubt;