import React from 'react'
import {NavBar,Icon,TabBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import Userlist from '../userlist/userlist'
import Talklist from '../talklist/talklist'
import Talk from '../talk/talk'
import {connect} from 'react-redux'
import {chatActions} from '../../reducers/chat'
class Content extends React.Component{
    constructor()
    {
        super()
        this.state={
            select:'one',
            user:null,
        }
    }
    change(type)
    {
        this.setState({
            select:type
        })
        switch (type) {
            case  'one':
                this.props.history.push('/content/userlist')
                break
            case 'two':
                this.props.history.push('/content/talklist')
                break
            // case 'three':
            //     this.props.history.push('/content/me')
            //     break
            default:
                this.props.history.push('/content/userlist')
        }
    }

    componentDidMount()
    {

        const user = this.props.state.userReducer.user
        this.props.getchat(user)
        this.props.initsocket(user)
    }



    render()
    {


        const flg = this.props.location.pathname=='/content/talk'?true:false
        let icon ;
        let title = '列表'
        if(flg)
        {
            icon = <Icon type="left" />
            if(this.props.state.chatReducer.data)
            {
                title=this.props.state.chatReducer.data.to1.user
            }

        }
        return(<div>
            <NavBar
                mode="dark"
                icon={icon}
                onLeftClick={() =>{ if(flg) this.props.history.push('/content/userlist') }}
            >{title}</NavBar>
            <Switch>
                <Route path={'/content/userlist'} component={Userlist} />
                <Route path={'/content/talklist'} component={Talklist} />
                <Route path={'/content/me'} />
                <Route path={'/content/talk'} component={Talk}/>
            </Switch>
            <TabBar tintColor={'#108ee9'} tabBarPosition={"bottom"}
                    hidden={flg}
            >
                <TabBar.Item title={'牛人'}
                             icon={{uri:require('./img/icon1.png')}}
                             selected={this.state.select=='one'?true:false}
                             key={'牛人'}
                             onPress={()=>{this.change('one')}}
                             selectedIcon={{uri:require('./img/icon2.png')}}>
                </TabBar.Item>
                <TabBar.Item title={'消息'}
                             icon={{uri:require('./img/talk1.png')}}
                             selected={this.state.select=='two'?true:false}
                             key={'消息'}
                             onPress={()=>{this.change('two')}}
                             selectedIcon={{uri:require('./img/talk.png')}}
                             badge={this.props.state.chatReducer.num?this.props.state.chatReducer.num:null}
                >
                </TabBar.Item>
                <TabBar.Item title={'我的'}
                             icon={{uri:require('./img/me1.png')}}
                             selected={this.state.select=='three'?true:false}
                             key={'我的'}
                             onPress={()=>{this.change('three')}}
                             selectedIcon={{uri:require('./img/me.png')}}>
                </TabBar.Item>
            </TabBar>
        </div>)
    }
}

const State = (state)=>{
    return {
        state
    }
}

const cheakread = chatActions[3]
const setlist = chatActions[7]
const getchat = chatActions[5]
const initsocket = chatActions[4]
const Action = (dispatch)=>{
    return {
        cheakread:(list)=>{dispatch(cheakread(list))},
        setlist:(list)=>{dispatch(setlist(list))},
        getchat:(a)=>{dispatch(getchat(a))},
        initsocket:(a)=>dispatch(initsocket(a))
    }
}

Content=connect(State,Action)(Content)

export  default Content