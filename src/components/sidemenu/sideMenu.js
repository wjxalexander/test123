import React, { Component } from 'react';
import { Menu, Icon} from 'antd';
import style from "./sider.css"
import { BrowserRouter as Router, Route, Link,withRouter,NavLink } from "react-router-dom";

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
    constructor(props){
        super(props)
    }
  state = {
    theme: 'dark',
    current: '1',
  }
 componentDidMount(){
 }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
      let {width} = this.props
      return (
      <div className="sidemenu-container">
        <h2 className='sidemenu-title'>你好</h2>
        <Router>
        <Menu
          theme='dark'
          onClick={this.handleClick}
          style={{ width: width}}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
        
          <Menu.Item key="1">
            <Icon type="mail" />
            <span>Option 1</span>
            <NavLink to="main/home">Option 1</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="pie-chart" />
            <span>Option 2</span>
            <NavLink to="main/mail">Option 2</NavLink>
          </Menu.Item><Menu.Item key="3">
            <Icon type="desktop" />
            <span>Option 3</span>
            <NavLink to="main/desktop">Option 3</NavLink>
          </Menu.Item>
        </Menu>
        </Router>
      </div>
    );
  }
}
export default withRouter(Sider)

