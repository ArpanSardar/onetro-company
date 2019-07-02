import React, { Component } from "react";

import GithubCorner from "../LandingPage/github/Corner";
import Header from "../LandingPage/header/Header";
import Process from "../LandingPage/process/process";
import Benefits from "../LandingPage/benefits/benefits";
import FaqSection from "./FAQ/faqPage";
import Pricing from "./pricing/pricing";
import Footer from "./footer/Footer";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../../assets/images/logo.png";
import "./headerStyle.css";
import { RouteComponentProps, withRouter } from "react-router-dom";
import $ from "jquery";

interface IProps {}

interface IDispProps {}

interface IState {
  className: string;
  loading: boolean;
}

class Main extends React.Component<IProps & RouteComponentProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      className: "",
      loading: true
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    // this.authListener();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = (event: any) => {
    // console.log(event);
    let scrollTop = event.srcElement.documentElement.scrollTop;
    let itemTranslate = Math.min(0, scrollTop / 3 - 250);
    if (itemTranslate == 0) {
      this.setState({ className: "header sticky" });
    } else {
      this.setState({ className: "" });
    }
  };

  onSignUpClicked = () => {
    this.props.history.push("/SignUp");
  };

  onSignInClicked = () => {
    this.props.history.push("/SignIn");
  };

  render() {
    return (
      <React.Fragment>
        {this.renderFloatingHeader(this.state.className)}
        <Header />
        {/* <NavBar /> */}
        <Process />
        <Benefits />
        <FaqSection />
        <Pricing />
        <Footer />
      </React.Fragment>
    );
  }

  renderFloatingHeader = (className: any) => {
    if (className == "") {
      return null;
    } else {
      return (
        <div className={className} id="myHeader">
          <Navbar>
            <Navbar.Brand onClick={this.scrollToTop}>
              <div className=" col topBar scrollToTopButton">
                <div className="row left headerLogo">
                  <img src={logo} alt="Logo" width="300%" height="100%" />
                </div>
                <div className="row">
                  <h3 className="forStyle">for companies</h3>
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link href="#home" />
              </Nav>
              <Button
                variant="link"
                className="headerText"
                onClick={this.onSignInClicked}
              >
                {/* Login */}
                ログイン
              </Button>
              <Button
                variant="link"
                className="headerText"
                onClick={this.onSignUpClicked}
              >
                {/* Signup */}
                サインアップ
              </Button>
              <Nav>
                <Button href="https://candidate.onetro.jp/" variant="link" className="bak1Head">
                  For Candidates >
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  };

  scrollToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  };
}

export default withRouter(Main);
