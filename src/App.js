import React, { Component } from 'react';
import './App.css';


import Sider from './components/sidemenu/sideMenu'
import Topbar from './components/topbar/topbar'
import ContentContainer from './containers/content/content'
class App extends Component {
  render() {
    return (
      <div className="App">
          <Sider width='256'/>
        <div className="right-pannel">
          <Topbar />
          <div className='App-reight-pannel-children'>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default App;