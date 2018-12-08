import React from 'react'
import {chatActions} from '../../reducers/chat'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item = List.Item;
const Brief = Item.Brief;
class Talklist extends React.Component{
    constructor()
    {
        super()
        this.state={
            list:[]
        }
        this.chat=this.chat.bind(this)
    }
    componentDidMount()
    {

        const list = this.props.state.chatReducer.chatlist
        console.log(list)
        if(list)
        {
            this.setState({
                list
            })
        }
    }

    chat(user)
    {
        const from = this.props.state.userReducer.user
        const to = user
        this.props.read(from,to)
        this.props.history.push(`/content/talk?from=${from}&&to=${to}`);
    }
    render()
    {

        if(!this.state.list.length)
        {
            return <div></div>
        }
        const res = this.state.list
        console.log(res)
       return <List>
           {res.map((v,index)=>{
           var list=v.list.list
           const name = v.name
           return <Item
           extra={v.list.num}
           multipleLine
           onClick={()=>{this.chat(name)}}
           key={index}
           >
           {v.last.content} <Brief>{v.name}</Brief>
           </Item>
           })
           }
       </List>
    }
}



const read= chatActions[6]
const State = (state)=>{
    return {
        state
    }
}

const Action = (dispatch)=>{
    return{
        read:(from,to)=>{
            dispatch(read(from,to))
        }
    }
}



Talklist = connect(State,Action)(withRouter(Talklist))


export  default  Talklist
