import React from 'react'
import Logo from "../logo/logo";
import {connect} from 'react-redux'
import {Button, InputItem, List, WhiteSpace, WingBlank} from "antd-mobile";
import {userActions} from '../../reducers/user'
require('./login.css');
class Login extends React.Component{
    constructor()
    {
        super()
        this.state={
            user:'',
            psw:'',
            isUser:false,
            isPsw:false}
            this.login = this.login.bind(this)
    }

    login()
    {

        this.props.login(this.state)
    }




    render()
    {
        {
            if (this.props.state.userReducer._id) {
                if (this.props.state.userReducer.type == 'genius') {
                    if(this.props.state.userReducer.avatar)
                    {
                        this.props.history.push('/content/userlist')
                    }
                    else
                    {
                        this.props.history.push('/geniusinfo')
                    }

                }
                else {
                    if(this.props.state.userReducer.avatar)
                    {
                        this.props.history.push('/content/userlist')
                    }
                    else
                    {
                        this.props.history.push('/bossinfo')
                    }
                }

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
                <Button type="primary" onClick={this.login}>登录</Button>
                <WhiteSpace />
                <a href='/register' className='go'>没有账号？前去注册！</a>
        </div>
    }
}

const State = (state)=>{
    return {
        state
    }
};

const login =userActions[1]
const Actions = (dispatch)=>{
    return {
        login:(a)=>dispatch(login(a))
    }
}
Login=connect(State,Actions)(Login)

export default Login