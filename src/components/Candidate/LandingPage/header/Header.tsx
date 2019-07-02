import React from 'react';

import { Navbar, Badge, Nav, NavDropdown, Button } from 'react-bootstrap';
import {NavLink, Link, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import logo from '../../../../assets/images/logo.png';

interface IProps {
}

class Top extends React.Component<IProps & RouteComponentProps>{

  onSignUpClicked = () => {
    this.props.history.push('/Candidate/SignUp');
  }

  onSignInClicked = () => {
    this.props.history.push('/Candidate/SignIn');
  }

  render() {
    return(
    <div className="topBackground">
      <div className="">
        <Navbar>
          <Navbar.Brand href="#home">
            <div className="col topBar">
              <div className="row left topLogo">
                <img src={logo} alt="Logo" width="250%" height="100%"/>
              </div>
              <div className="row">
              <h3 className="forStyle">for candidates</h3>
              </div>
             
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Nav className="mr-auto">
              <Nav.Link href="#home"></Nav.Link>
            </Nav>
            <Nav>
              <Button variant="link" className="bak1Head">For Candidates ></Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      
      
      <div className="btnAreaonPage">
        <a className="waves-effect waves-light btn signinButtononPage" onClick={this.onSignInClicked}>
            {/* <h3 className="buttonColorDark">ログイン</h3> */}ログイン
          </a>
        <a className="waves-effect waves-light btn signupButtononPage" onClick={this.onSignUpClicked}>
          {/* 今すぐ使ってみる */}
          サインアップ
        </a>
      </div>
    </div>
    );
  }
};

export default withRouter(Top);