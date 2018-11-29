import userState from '../init/chatState'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:1111')

function chatReducer(state=userState,action)
{
    switch (action.type) {
        case 'getchatlist':
            return {state}
        case 'getchat':
            return {...state,avatars:action.data}
        case 'sendmsg':
            return {...state}
        case 'chatlist':
            const chatlist=action.data
            const num = action.num
            return {...state,chatlist,num}
        case 'setlist':
            return {...state,chatlist:action.data}
        default:
            return state
    }
}


function getchatlist(user)
{
    return dispatch =>{
        axios.get('/chat/getchatlist',{params:{user}})
            .then((res)=>{
                dispatch({
                    type:'getchatlist',
                    list:res.data
                })
            })
    }
}



function chatto({from,to}) {
    return dispatch=>{
        axios.get('/chat/getchat',{params:{from,to}})
            .then((res)=>{
                dispatch({type:'getchat',data:res.data})
            })
    }
}

function sendmsg({to,time,read,val,user}) {
    var from = user
    var content = val
    socket.emit('sendmsg',{from,to,time,read,content})
    return dispatch=>{
        axios.get('/chat/findall',{params:{user}})
            .then((res)=>{
                const list = res.data
                let narr = clear1(list,user)

                let narr1 = clear2(narr)
                let num = cal(narr1)
                dispatch({
                    type:'chatlist',
                    data:narr1,
                    num
                })
                console.log('sendmsg')
            })
    }
}



function initsocket(user)
{
    return dispatch=>{
        socket.on('getmsg',(data)=>{
            if(data.to==user)
            {
                axios.get('/chat/findall',{params:{user}})
                    .then((res)=>{
                        const list = res.data
                        let narr = clear1(list,user)

                        let narr1 = clear2(narr)
                        let num = cal(narr1)
                        dispatch({
                            type:'chatlist',
                            data:narr1,
                            num
                        })
                        console.log('getmsg')
                    })
            }
        })
    }
}



function getchat(user)   //找到所有跟自己对话的记录并进行数据整理
{
    var user = user
    return dispatch=>{
        var dispatch=dispatch
        getchatall(dispatch,user)
    }
}

function getchatall(dispatch,user)
{
    axios.get('/chat/findall',{params:{user}})
        .then((res)=>{
            const list = res.data
            let narr = clear1(list,user)

            let narr1 = clear2(narr)
            let num = cal(narr1)
            dispatch({
                type:'chatlist',
                data:narr1,
                num
            })
            console.log('getall')
        })
}


function clear1(list,user) {
    let arr ={};
    for(var n=0;n<list.length;n++)
    {
        var name = list[n].to==user?list[n].from:list[n].to
        if(arr[name])
        {
            if(arr[name].num>-1)
            {
                if(list[n].read==false)
                {
                    if(list[n].from!=user)
                        arr[name].num++
                }
            }
            else
            {
                arr[name].num=0
                if(list[n].read==false)
                {
                    if(list[n].from!=user)
                        arr[name].num++
                }


            }
            if(arr[name].list)
            {
                arr[name].list.push(list[n])
            }
            else
            {
                arr[name].list=[]
            }
        }
        else
        {
            arr[name]={
                list:[],
                num:0,
            }
            arr[name].list.push(list[n])
            if(list[n].read==false)
            {
                if(list[n].from!=user)
                    arr[name].num++
            }
        }
    }
    return arr

}


function  cal(arr) {
    let num=0
    for(var n=0;n<arr.length;n++)
    {
        let list = arr[n].list
        num+=list.num
    }
    return num
}


function clear2(list) {
    let res = []
    for(let n in list)
    {
        let obj = {
            name:n,
            list:list[n],
            last:{}
        }
        res.push(obj)
    }
    for(var n=0;n<res.length;n++)
    {
        var list1 = res[n].list
        var last = 0;
        for(var j=0;j<list1.length;j++)
        {
            if(list1[last].time<list1[j].time)
            {
                last = j
            }
        }
        if(res[n].list.list)
        {
            res[n].last=res[n].list.list[last]
        }
    }

    return res
}



function read(from,to) {
    return dispatch=>{
        axios.get('/chat/read',{params:{from,to}})
            .then(res=>{
                if(res.data.code==1)
                {
                    dispatch({
                        type:'11'
                    })
                }

            })
    }
}

function cheakread(list) {
    return dispatch=>{
        dispatch({
            type:'22'
        })
    }
}

function setlist(list) {
    return dispatch=>{
        dispatch({
            type:setlist,
            data:list
        })
    }
}

const chatActions =[getchatlist,chatto,sendmsg,cheakread,initsocket,getchat,read,setlist]

export {chatActions,chatReducer}