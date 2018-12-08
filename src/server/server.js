const express = require('express');
const {userRouter} = require('./serverRouter/userRouter')
const {chatRouter} = require('./serverRouter/chatRouter')
const app = express();
const {getModel} = require('./db')
const chat = getModel('chat')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    socket.on('sendmsg',(data)=>{
        let {from,to,read,content,time} = data
        chat.create({from,to,read,content,time},(err,data1)=>{
            if(err)
            {
                return
            }
            if(data1)
            {
                io.emit('getmsg',data)
            }
        })

    })
})
app.get('/', function(req, res,) {
    res.end('1')
});

app.use('/user',userRouter);
app.use('/chat',chatRouter);
server.listen(1111)
