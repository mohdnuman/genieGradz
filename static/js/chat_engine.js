class ChatEngine {
  constructor(chatBoxId, userEmail, chatroomID) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });

    if (this.userEmail) {
      this.connectionHandler(chatroomID);
    }
  }
  connectionHandler(chatroomID) {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: `${chatroomID}`,
      });

      self.socket.emit("load_old_messages", {
        user_email: self.userEmail,
        chatroom: `${chatroomID}`,
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined", data);
      });

      $("#send-message").click(async function () {
        let msg = $("#chat-message-input").val();
        let newMsgForm = {
          user: self.userEmail,
          message: msg,
          chatroom: `${chatroomID}`,
        };

        $.ajax({
          type: "post",
          url: "/chat/message/create",
          data: newMsgForm,
          success: function (data) {
            // console.log(data);
           
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });

        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            user_email: self.userEmail,
            chatroom: `${chatroomID}`,
          });
        }
      });

      // self.socket.on('recieve_message',function(data){
      //     console.log("message recieved:",data)
      // })

      self.socket.on("recieve_old_messages", function (data) {
        console.log("old messages recieved", data);

        for (var i=0; i < data.oldMessages.length; i++) {
          let newMessage = $("<li>");

          let messageType = "other-message";

        //   console.log(data.oldMessages[i]);
          if (data.oldMessages[i].user == self.userEmail) {
            messageType = "self-message";
          }

          newMessage.append(
            $("<span>", {
              html: data.oldMessages[i].message,
            })
          );

          newMessage.append(
            $("<sub>", {
              html: data.oldMessages[i].user,
            })
          );

          newMessage.addClass(messageType);

          $("#chat-messages-list").append(newMessage);
        }
      });

      self.socket.on("receive_message", function (data) {
        console.log("message received", data.message);

        let newMessage = $("<li>");

        let messageType = "other-message";

        if (data.user_email == self.userEmail) {
          messageType = "self-message";
        }

        newMessage.append(
          $("<span>", {
            html: data.message,
          })
        );

        newMessage.append(
          $("<sub>", {
            html: data.user_email,
          })
        );

        newMessage.addClass(messageType);

        $("#chat-messages-list").append(newMessage);
      });
    });
  }
}
