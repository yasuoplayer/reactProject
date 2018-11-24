import React from 'react'
import logo from './logo.png'
require('./logo.css')
class Logo extends React.Component {
    constructor()
    {
        super();
        this.state={}
    }
    render()
    {
        return (
            <div className='logo'>
                <img src={logo}></img>
            </div>
        )
    }
}

export default Logo