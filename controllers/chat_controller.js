const Chat = require("../models/Chat");
const Message = require("../models/message");

module.exports.createMessage = async function (req, res) {


    let newMsg = await Message.create({
      user: req.body.user,
      message: req.body.message,
    });

    let chat = await Chat.findOne({ 'chatroomId': req.body.chatroom });
    chat.messages.push(newMsg);
    chat.save();


  if (req.xhr) {
    return res.status(200).json({
      data: {
        newMsg: newMsg,
      },
      message: "message saved!",
    });
  }
};
