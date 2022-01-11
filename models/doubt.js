const mongoose=require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const doubtSchema=new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    accepted:{
        type:Boolean,
        required:true
    },
    acceptedBy:{
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