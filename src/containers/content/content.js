import React, { Component } from 'react';
import style from './style.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../../components/home/home'
class ContentContainer extends Component{
    constructor(props){
        super(props)
    }
    
    render(){          
          const About = () => (
            <div>
              <h2>About</h2>
            </div>
          );
          
        return (
        <Router>
        <div>
              <Route exact path="/home" component={Home} />
              <Route path="/mail" component={About} />
            </div>
          </Router>)
    }
}
export default ContentContainer