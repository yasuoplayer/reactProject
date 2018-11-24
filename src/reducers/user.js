import userState from '../init/userState'
import axios from 'axios'

 function userReducer(state=userState,action) {
    switch (action.type) {
        case 'login':
            var {user,psw,_id,type}=action.data
            return {...state,user,psw,_id,type}
        case 'register':
            var {user,psw,_id,type}=action.data
            return {...state,user,psw,_id,type}
        case 'update':
            var {user,psw,_id,type,des,job,avatar,company,money}=action.data
            return {...state,user,psw,_id,type,des,job,avatar,company,money}
        case'getmsg':
            return {...state,user,psw,_id,type,des,job,avatar,company,money}
        default:
            return state
    }
}



 function register({user,psw,rpsw,type}){
    return dispatch=>{
        axios.post("user/register",{user,psw,rpsw,type})
        .then((res)=>{
            localStorage.setItem('Uid',res.data.data._id)
            dispatch({
                type:'register',
                data:res.data.data
            })
        })
    }
}


function login({user,psw}) {
    return dispatch=>{
        axios.post('user/login',{user,psw})
            .then((res)=>{
                localStorage.setItem('Uid',res.data.data._id)
                dispatch({
                    type:'login',
                    data:res.data.data
                })
            })
    }
}

function update({user,avatar,job,des,money,company})
{
    return dispatch=>{
        axios.post('user/update',{user,avatar,job,des,money,company})
            .then((res)=>{
                dispatch({
                    type:'update',
                    data:res.data.data
                })
            })
    }
}

function getMsg(_id) {
    return dispatch=>{
        axios.post('user/getmsg',{_id})
            .then((res)=>{
                if(res.data.code==0)
                {
                    dispatch({type:''})
                }

                else{
                    dispatch({
                        type:'getmsg',
                        data:res.data.data
                    })
                }

            })
    }
}


const  userActions = [
    register,
    login,
    update,
    getMsg
]
export {userActions,userReducer}