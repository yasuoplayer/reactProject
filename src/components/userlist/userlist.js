import React from 'react'
import {userActions} from '../../reducers/user'
import {connect} from 'react-redux'
import {Card,WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {chatActions} from "../../reducers/chat";
class Userlist extends React.Component{
    constructor()
    {
        super()
        this.state={}
        this.chat=this.chat.bind(this)
    }
    componentDidMount()
    {
        const type = this.props.state.userReducer.type=='boss'?'genius':'boss'
        this.props.find(type)
    }

    chat(user)
    {
        var from = this.props.state.userReducer.user
        var to = user
        this.props.read(from,to)
        this.props.history.push(`/content/talk?from=${from}&&to=${to}`);
    }

    render()
    {
        const list = this.props.state.userReducer.list;
        if(list)
        {
            return (
                list.map((v,index)=>{
                    if(index!=list.length-1)
                    {
                        return (
                            <div key={index}  >
                                <Card  onClick={()=>{this.chat(v.user)}}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={v.avatar}
                                        extra={<span>{v.job}</span>}
                                    />
                                    <Card.Body>
                                        <div>{v.des.split(' ').join('\n')}</div>
                                    </Card.Body>
                                </Card>
                                <WhiteSpace/>
                            </div>
                        )
                    }
                    else
                    {
                        return (
                            <div key={index}>
                                <Card  onClick={()=>{this.chat(v.user)}}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={v.avatar}
                                        extra={<span>{v.job}</span>}
                                    />
                                    <Card.Body>
                                        <div>{v.des.split(' ').join('\n')}</div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    }


                })
            )

        }
        return <div>

        </div>
    }
}

const find = userActions[4]
const read= chatActions[6]
const State = (state)=>{
    return {
        state
    }
}

const Action = (dispatch)=>{
    return{
        find:(a)=>{
            dispatch(find(a))
        },
        read:(from,to)=>{
            dispatch(read(from,to))
        }
    }
}



Userlist = connect(State,Action)(withRouter(Userlist))


export  default  Userlist