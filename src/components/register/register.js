import {userActions} from '../../reducers/user'
import React from 'react'
import Logo from "../logo/logo";
import {connect} from 'react-redux'
import {Button, InputItem, List, WhiteSpace, WingBlank,Radio} from "antd-mobile";
import axios from "axios";
require('./register.css');

const RadioItem  = Radio.RadioItem


class Register extends React.Component{
    constructor()
    {
        super()
        this.state={
            user:'',
            psw:'',
            rpsw:'',
            isUser:false,
            isPsw:false,
            type:'boss'
        }
        this.goregister = this.goregister.bind(this)
    }

    goregister()
    {
        var parms = {
            user:this.state.user,
            psw:this.state.psw,
            rpsw:this.state.rpsw,
            type:this.state.type
        }
        this.props.register(parms)
    }

    render()
    {
        if(this.props.state.userReducer._id)
        {
            if(this.props.state.userReducer.type=='genius')
            {
                this.props.history.push('/geniusinfo')
            }
            else {
                this.props.history.push('/bossinfo')
            }

        }
        return <div>
            <Logo/>
                <List >
                    <InputItem onChange={(v)=>{this.setState({user:v})}} error={this.state.isUser}>用户名</InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <InputItem type='password' onChange={(v)=>{this.setState({psw:v})}}>密码</InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <InputItem type='password' onChange={(v)=>{this.setState({rpsw:v})}}>确认密码</InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <RadioItem name='type'
                               checked={this.state.type=='boss'?true:false}
                               onChange={(e)=>{this.setState({type:'boss'})}}
                    >我是老板</RadioItem>
                    <RadioItem name='type'
                               checked={this.state.type=='genius'?true:false}
                               onChange={(e)=>{this.setState({type:'genius'})}}
                    >我是工仔</RadioItem>
                </List>
                <WhiteSpace />
                <Button type="primary"
                        onClick={this.goregister}
                >注册</Button>
                <WhiteSpace />
                <a href='/login' className='go'>已有账号？前去登录！</a>
        </div>
    }
}


const State = (state)=>{
    return {
        state
    }
}

const register =userActions[0];


const Actions = (dispatch)=>{
    return {
            register:(parms)=>dispatch(register(parms))
        }
    }


Register = connect(State,Actions)(Register)

export default Register