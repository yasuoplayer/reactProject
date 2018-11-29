const mongoose = require('mongoose');
mongoose.connect('mongodb://120.79.249.6:27017')


const initDb = {
    user:{
        user:String,
        type:String,
        psw:String,
        des:String,
        job:String,
        avatar:String,
        money:String,
        company:String
    },
    chat:{
        from:String,
        to:String,
        read:Boolean,
        content:String,
        time:String
    }
}


for(var n in initDb)
{
    mongoose.model(n,mongoose.Schema(initDb[n]))
}

function getModel(string) {
    return mongoose.model(string)
}


module.exports ={
    getModel
}