import React, { Component } from 'react';
import Line from '../charts/line/line'
class Mail extends Component{
    render(){
        return (<div> <Line data={{average:[70,150],person:[80,190]}}/></div>)
    }
}
export default Mail