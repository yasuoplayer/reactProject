const express = require('express');
const md5 = require('md5')
const formidable = require('formidable')
const userRouter = express.Router()
const {getModel} = require('../db');

const user = getModel('user');


userRouter.post('/register',(req,res)=>{       //注册api
    var form = new formidable.IncomingForm();
    form.encoding='utf-8'
    form.parse(req,(err,feild,file)=>{
        user.find({user:feild.user},(err,data)=>{
            if(err)
            {
                res.json({code:0,msg:'后台出错'})
                return
            }
            if(data.length)
            {
                res.json({code:0,msg:'账号已被注册'})
                return
            }
            var psw = md5(md5(feild.psw))
            user.create({user:feild.user,psw,type:feild.type},(err,data)=>{
                if(err)
                {
                    res.json({code:0,msg:'后台出错'})
                    return
                }
                res.json({code:1,data})
                return
            })
        })
    })
})

userRouter.get('/remove',(req,res)=>{
    user.remove({},(err,data)=>{
        if(err)
        {
            console.log(err)
        }
        res.json(data)
    })
})

userRouter.get('/list',(req,res)=>{
    user.find({},(err,data)=>{
        if(err)
        {
            console.log(err)
        }
        res.json(data)
    })
})


userRouter.post('/login',(req,res)=>{
    const form = new formidable.IncomingForm()
    form.encoding='utf-8'
    form.parse(req,(err,feild,file)=>{
        feild.psw=md5(md5(feild.psw))
        user.find(feild,(err,data)=>{
            if(err)
            {
                res.json({code:0,msg:'后台出错错误'})
                return
            }
            if(data.length)
            {
                res.json({code:1,data:data[0]})
                return
            }
            res.json({code:0,msg:'账号或者密码错误'})
            return
        })
    })
})

userRouter.post('/getmsg',(req,res)=>{
    const form = new formidable.IncomingForm()
    form.encoding='utf-8'
    form.parse(req,(err,feild,file)=>{
        user.find(feild,(err,data)=>{
            if(err)
            {
                res.json({code:0,msg:'后台出错错误'})
                return
            }
            if(data.length)
            {
                res.json({code:1,data:data[0]})
                return
            }
            res.json({code:0})
        })
    })
})


userRouter.post('/update',(req,res)=>{
    const form = new formidable.IncomingForm()
    form.encoding='utf-8'
    form.parse(req,(err,feild,file)=>{
        if(err)
        {
            res.json({code:0,msg:'后台错误'})
            return
        }
        user.updateOne({user:feild.user},feild,(err,data)=>{
            if(err)
            {
                res.json({code:0,msg:'后台出错'})
                return
            }
            if(data)
            {
                user.find({user:feild.user},(err,data)=>{
                    if(err)
                    {
                        res.json({code:0,msg:'后台出错'})
                        return
                    }
                    if(data.length)
                    {
                        res.json({code:1,data:data[0]})
                        return
                    }
                })
            }
        })
    })
})

userRouter.get('/find',(req,res)=>{
    const type = req.query.type
    user.find({type},(err,data)=>{
        if(err)
        {
            res.json({code:1,msg:'后台出错'})
        }
        res.json({code:1,data})
    })
})

module.exports= {
    userRouter
}