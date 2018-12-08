import React from 'react'
import {connect} from 'react-redux'
import { Grid,WingBlank,NavBar,InputItem,WhiteSpace,List,TextareaItem,Button} from 'antd-mobile';
import {userActions} from '../../reducers/user'
import {Redirect} from 'react-router-dom'
class Bossinfo extends React.Component{
    constructor()
    {
        super()
        this.state={
            avatar:'',
            job:'',
            des:'',
            money:'',
            company:''
        }
        this.update=this.update.bind(this)
    }

    update()
    {
        const user =this.props.state.userReducer.user;
        var {avatar,job,des,money,company} = this.state
        this.props.update({...{avatar,job,des,money,company},user})

    }

    componentWillMount()
    {
        if(this.props.state.userReducer.avatar)
        {
            var {avatar,des,job,money,company} =this.props.state.userReducer
            this.setState(
                {   avatar:avatar,
                    des:des,
                    job:job,
                    money:money,
                    company:company
                })

        }
    }

    render()
    {
        const data = Array.from(new Array(10)).map((_val, i) => ({
            icon: require(`./img/${i}.png`),
            text: i,
        }));
        let isSelcet = <div>
            <span style={{verticalAlign:'bottom'}}>您已选择</span><img src={this.state.avatar} style={{height:20,verticalAlign:'middle',marginLeft:16}}></img>
        </div>

        let notSelct = <div>
            <span style={{verticalAlign:'bottom'}}>请选择头像</span>
        </div>;
            console.log(this.props.state.userReducer.goto)
        return <div>
            <NavBar mode={"dark"}>资料编辑</NavBar>
            {this.props.state.userReducer.goto? <Redirect to={this.props.state.userReducer.goto} />:null}
            <WingBlank>
                {this.state.avatar?isSelcet:notSelct}
            </WingBlank>
            <Grid data={data} columnNum={5} onClick={(el)=>{this.setState({avatar:el.icon})}}/>
            <List renderHeader={() => '填写求职信息'}>
                <InputItem
                    defaultValue={this.state.job}
                    clear  onChange={(v)=>{this.setState({job:v})}}>需求岗位</InputItem>
            </List>
            <List renderHeader={() => '薪资待遇'} >
                <InputItem
                    defaultValue={this.state.company}
                    clear  onChange={(v)=>{this.setState({company:v})}}>公司</InputItem>

                <InputItem
                    defaultValue={this.state.money}
                    clear  onChange={(v)=>{this.setState({money:v})}}>月薪</InputItem>


                </List>

            <List renderHeader={() => '要求'} >
                <TextareaItem
                    defaultValue={this.state.des}
                    clear autoHeight={true} onChange={(v)=>{this.setState({des:v})}}> </TextareaItem>
            </List>

            <WhiteSpace/>
            <Button type={"primary"} onClick={this.update}>保存</Button>
        </div>
    }
}

const State = (state)=>{
    return {
        state
    }
}

const update =userActions[2]
const Actions = (dispatch)=>{
    return{
        update:(a)=>dispatch(update(a))
    }
}

Bossinfo=connect(State,Actions)(Bossinfo)

export default Bossinfo
