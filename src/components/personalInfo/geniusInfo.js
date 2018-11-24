import React from 'react'
import {connect} from 'react-redux'
import { Grid,WingBlank,NavBar,InputItem,WhiteSpace,List,TextareaItem,Button} from 'antd-mobile';
import {userActions} from '../../reducers/user'
class Geniusinfo extends React.Component{
    constructor()
    {
        super()
        this.state={
            avatar:'',
            job:'',
            des:''
        }
        this.update=this.update.bind(this)
    }

    update()
    {
        const user =this.props.state.userReducer.user;
        var {avatar,job,des} = this.state
        this.props.update({...{avatar,job,des},user})

    }

    componentWillMount()
    {
        if(this.props.state.userReducer.avatar)
        {
            var {avatar,des,job} =this.props.state.userReducer
            console.log(job)
            this.setState(
                {   avatar:avatar,
                    des:des,
                    job:job,
                    a:1
                })
            console.log(this.state)

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

        return <div>
            <NavBar mode={"dark"}>资料编辑</NavBar>
            <WingBlank>
                {this.state.avatar?isSelcet:notSelct}
            </WingBlank>
            <Grid data={data} columnNum={5} onClick={(el)=>{this.setState({avatar:el.icon})}}/>
            <List renderHeader={() => '填写求职信息'}>
                <InputItem
                    defaultValue={this.state.job}
                    clear  onChange={(v)=>{this.setState({job:v})}}>求职岗位</InputItem>
            </List>
            <List renderHeader={() => '填写个人简历'} >
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

Geniusinfo=connect(State,Actions)(Geniusinfo)

export default Geniusinfo