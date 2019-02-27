import React from 'react'
import { BrowserRouter as Router, Route, Link,withRouter,NavLink,Switch,HashRouter } from "react-router-dom";
import App from './App'
import Home from "./components/home/home"
import Mail from "./components/mail/mail"
import Desktop from "./components/dektop/desktop"

const Routes = ()=>(
    <Switch>
      <Route path='/mail' component={Mail}/>
      <Route path="/desktop" component={Desktop} />
      <Route component={Home} />
    </Switch>
)
export default Routes