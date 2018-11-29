import React from 'react';
import ReactDOM from 'react-dom';
import {compose,createStore,applyMiddleware} from 'redux'
import {BrowserRouter,Switch,Route,Redirect}  from 'react-router-dom'
import {Provider,connect}  from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reduce'
import axios from 'axios'
import {Toast} from 'antd-mobile';
import {userActions} from './reducers/user'
import Login from './components/login/login'
import Register from './components/register/register'
import Geniusinfo from './components/personalInfo/geniusInfo'
import Bossinfo from './components/personalInfo/bossInfo'
import Content from './components/content/content'
axios.interceptors.request.use(function (config) {
    Toast.loading('数据加载中', 0)
    return config
})

axios.interceptors.response.use(function (response) {
    Toast.hide()
    return response
})

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state={ }
    }
    componentDidMount ()
    {
        if(localStorage.getItem('Uid'))
        {
            var id = localStorage.getItem('Uid')
            this.getmsg(id)
        }
    }
    getmsg(_id)
    {
        this.props.getmsg(_id)
    }

    render()
    {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/bossinfo' component={Bossinfo}></Route>
                        <Route path='/geniusinfo'  component={Geniusinfo} />
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register'  component={Register}/>
                        <Route path='/content'  component={Content}/>
                        <Redirect to='/login' component={Login}></Redirect>
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }

}

const State =(state)=>{
    return{
        state
    }
}
const getmsg = userActions[3]
const Actions = (dispatch)=>{
    return {
        getmsg:(a)=> dispatch(getmsg(a))
    }

}

App=connect(State,Actions)(App)

const store = createStore(
  reducer,
  compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

