import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, HashRouter,withRouter} from "react-router-dom";
import Routes from './routes'

import Sider from './components/sidemenu/sideMenu'
import Topbar from './components/topbar/topbar'
import ContentContainer from './containers/content/content'
class App extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Sider width='256'/>
        <div className="right-pannel">
          <Topbar />
          <div className='App-reight-pannel-children'>
          <ContentContainer>
             <Routes/>
          </ContentContainer>
          </div>
        </div>
      </div>
      </Router>
      
    );
  }
}

export default App;