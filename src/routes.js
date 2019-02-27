import React from 'react'
import { BrowserRouter as Router, Route, Link,withRouter,NavLink,Switch,HashRouter } from "react-router-dom";
import App from './App'
import Home from "./components/home/home"

const routes = ()=>(
    <Router>
            <Route path = "/main" 
            component={props=>(
                <App{...props}>
                <Route path='/home' component={Home}/>
                <Route path='/mail' component={Home}/>
                <Route path='/pie' component={Home}/>
                </App>
            )}/>
    </Router>
)
export default routes