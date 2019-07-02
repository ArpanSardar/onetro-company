import React from 'react';

import './style.css';

import logo from '../../../../assets/images/logo.png';
import { Navbar, Badge, Nav, NavDropdown, Button } from 'react-bootstrap';


const FooterBar = () => (
  <div>
    <Navbar>
      <Navbar.Brand href="#home">
        <div className="topBar">
          <div className="left topLogo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse >
        <Nav className="mr-auto">
          <div className="btnArea">
            <a className="waves-effect waves-light btn" ><h3 className="buttonColorDark">Login</h3></a>
          </div>
        </Nav>
        <Nav className="mr-auto">
          <div className="btnArea">
            <a className="waves-effect waves-light btn" >
              Sign up
          </a>
          </div>
        </Nav>
        <Nav>
          <Button variant="link" className="bak1Head">For Candidates ></Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default FooterBar;