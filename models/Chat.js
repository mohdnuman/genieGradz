const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    chatroomId:{
        type:String,
        required:true
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ]

},{
    timestamps:true
});

const Chat=mongoose.model('Chat',chatSchema);
module.exports=Chat;