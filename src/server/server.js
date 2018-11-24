const express = require('express');
const {userRouter} = require('./serverRouter/userRouter')
const proxy = require('http-proxy-middleware')
const cookieparser = require('cookie-parser')
const app = express();



app.get('/', function(req, res,) {
    res.end('1')
});


app.use(cookieparser())
app.use('/user',userRouter);
app.listen(1111)