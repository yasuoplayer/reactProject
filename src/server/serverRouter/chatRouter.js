const express = require('express')
const {getModel} = require('../db')

const chat = getModel('chat')
const user = getModel('user');
const chatRouter = express.Router();

chatRouter.get('/list',(req,res)=>{
    chat.find({},(err,data)=>{
        console.log(data)
        res.json(data)
    })
});

chatRouter.get('/remove',(req,res)=>{
    chat.remove({},(err,data)=>{
        console.log(data)
        res.json(data)
    })
});

chatRouter.get('/getchat',(req,res)=>{
    const from = req.query.from;
    const to = req.query.to
    user.findOne({user:from},(err,data)=>{
        if(err)
        {
            res.json({code:0,msg:'后台出错'})
        }
        if(data)
        {
            const from1 = data
            user.findOne({user:to},(err,data)=>{
                if(err)
                {
                    res.json({code:0,msg:'后台出错'})
                }
                if(data)
                {
                    const to1 = data
                    res.json({code:1,data:{from1,to1}})
                }
            })
        }
    })
})



chatRouter.get('/findall',(req,res)=>{
    const user = req.query.user
    chat.find({$or:[
            {from:user},
            {to:user}
        ]},(err,data)=>{
        if(err)
        {
            return
        }
        res.json(data)
    })
})


chatRouter.get('/read',(req,res)=>{
    const {from,to} = req.query
    chat.update({from:to,to:from},{read:true},{multi:true},(err,data)=>{
        if(err)
        {
            console.log(err)
            return
        }
        res.json({code:1})
    })
})


module.exports={
    chatRouter
}