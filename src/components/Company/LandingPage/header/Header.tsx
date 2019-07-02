import React from 'react';

import { Navbar, Badge, Nav, NavDropdown, Button } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import {NavLink, Link, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import logo from '../../../../assets/images/logo.png';
import screens from '../../../../assets/images/screen.png';
import desktop from '../../../../assets/images/Phone@3x.png'
import cup from '../../../../assets/images/Cup@3x.png';
// import Video from '../../../../assets/';
interface IProps {
}

class Top extends React.Component<IProps & RouteComponentProps>{

  onSignUpClicked = () => {
    this.props.history.push('/SignUp');
  }

  onSignInClicked = () => {
    this.props.history.push('/SignIn');
  }

  goToOnetroCandidate=()=>{
    this.props.history.push('/Candidate/LandingPage');
    
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
              <h3 className="forStyle">for companies</h3>
              </div>
             
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Nav className="mr-auto">
              <Nav.Link href="#home"></Nav.Link>
            </Nav>
            <Nav>
              <Button variant="link" className="bak1Head" href="https://candidate.onetro.jp/">For Candidates ></Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="parentVideo">
        <div className=" backgroundScreen">
          <video loop autoPlay muted className="desktopVideo">
            <source src="https://s3-ap-northeast-1.amazonaws.com/onetrovideo/demo-High.mov" type="video/mp4" />>
          
            Your browser does not support HTML5 video.
          </video>
        </div>
        <div className=" backgroundPhoneScreen">
          {/* <img src={screens} alt="screens" width="750" height="370" className="screenImage" /> */}
          <video className="phoneVideo" loop autoPlay muted>
            <source src="https://s3-ap-northeast-1.amazonaws.com/onetrovideo/demo-High.mov" type="video/mp4" />>
          
            Your browser does not support HTML5 video.
          </video>
          {/* <iframe frameBorder="0" allowFullScreen width="200" height="200" src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY?autoplay=1"/>> */}
        </div>
      </div>
      <div className="row container10p">
        <div className="col s12 m6 center">
          <h3 className="pgTitle bak1Head">今日も明日も、1分間で世界のITエンジニアと出会う</h3>
        </div>
      </div>
      <div className="row container20p center">
        <h3 className="col pgDescription">日本を目指す優秀なITエンジニアだけを厳選</h3>
      </div>
      <div className="row container20p center">
      <h3 className="col pgDescription">採用した後のサポートも充実</h3>
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