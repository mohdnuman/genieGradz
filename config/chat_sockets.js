const Chat = require("../models/Chat");
const Message = require("../models/message");

module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", function (socket) {
    console.log("new connection recieved", socket.id);

    socket.on("load_old_messages", async function (data) {
      let chat = await Chat.findOne({ chatroomId: data.chatroom }).sort(
        "-createdAt"
      ).populate('messages');

      let old = chat.messages;
      data.oldMessages = old;

  

      io.in(data.chatroom).emit("recieve_old_messages", data);
    });

    socket.on("disconnect", function () {
      console.log("socket disconnected");
    });

    socket.on("join_room", function (data) {
      console.log("joining request rec.", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
