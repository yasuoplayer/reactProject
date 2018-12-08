import React from 'react'
import {List,InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {chatActions} from '../../reducers/chat'
const Item = List.Item;
const Brief =   Item.Brief
class Talk extends React.Component{
    constructor()
    {
        super();
        this.state={
            msg:'',
            user:''
        }
        this.sendmsg=this.sendmsg.bind(this)
    }
    componentDidMount()  //获取相关信息
    {
        const user = this.props.state.userReducer.user
        this.setState({
            user
        })
        let paramsArr = this.props.location.search.substr(1).split('&&')
        let params={}
        paramsArr.forEach((v)=>{
            let arr = v.split('=')
            params[arr[0]] = arr[1]
        })

        this.setState({
            params//{from:1,to:2}
        })
        this.props.getchat(params)


    }
    sendmsg()  //发送消息
    {
        const url =this.props.history.location.search
        const index = url.lastIndexOf('=')
        const to = url.substr(index+1) //目的用户
        const val = this.state.msg //内容
        const time = new Date().getTime() //时间
        const read = false
        const list = this.props.state.chatReducer.data.data
        const user = this.state.user
        this.props.sendmsg({to,val,time,read,user})
        this.setState({
            msg:''
        })
    }
    render()
    {
        const list = this.props.state.chatReducer.chatlist
        let list1
        let list2=[]
        if(list)
        {
                try {
                    let to = this.state.params.to
                    const toavatar = this.props.state.chatReducer.avatars.to
                    const fromavatar = this.props.state.chatReducer.avatars.from
                    for (var n=0;n<list.length;n++)
                    {
                        if(list[n].name==to)
                        {
                            list1 = list[n].list.list
                            break
                        }
                    }
                    list1.map((v,index)=>{
                        const cl = v.from==to?{color:'red'}:null
                        let i =<Item
                            thumb={v.from==to?fromavatar:toavatar}
                            multipleLine
                            key={index}
                        >
                            <span style={cl}>{v.content}</span> <Brief>{v.form}</Brief>
                        </Item>
                        list2.push(i)
                    })
                }
                catch (e) {

                }




        }
        return(
            <div>
            <List>
                {
                    list2
                }

            </List>
                <InputItem placeholder={'请输入消息'}
                           extra={<span onClick={this.sendmsg}>发送</span>}
                           onChange={(v)=>this.setState({msg:v})}
                           clear
                           value={this.state.msg}
                >

                </InputItem>
            </div>
        )
    }
}

const getchat = chatActions[1]
const sendmsg = chatActions[2]

const State = (state)=>{
    return {
        state
    }
}

const Actions = (dispatch)=>{
    return{
        getchat:(a)=>dispatch(getchat(a)),
        sendmsg:(a)=>dispatch(sendmsg(a)),
    }
}
Talk=connect(State,Actions)(Talk)


export default Talk
