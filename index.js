const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');


const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");


app.use(express.static('./static'));
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');


app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(`error occured: ${err}`);
        return;
    }
    console.log(`express server is up and running on port: ${port}`);
})
