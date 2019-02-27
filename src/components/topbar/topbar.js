import React, { Component } from 'react';

import style from './topbar.css'
class Topbar extends Component{
    render(){
        return(
            <div className="topbar-container">
                <h2>你好,xxx</h2>
                <button>返回首页</button>
            </div>
        )
    }
}
export default Topbar