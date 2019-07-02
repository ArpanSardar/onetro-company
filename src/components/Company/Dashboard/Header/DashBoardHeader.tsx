import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import logo from '../../../../assets/images/logo.png';

import Pricing from '../../LandingPage/pricing/pricing';
import { firebaseService } from '../../../../services/FirebaseService';

import { Navbar, Badge, Nav, NavDropdown, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import { withRouter, RouteComponentProps } from 'react-router-dom';


import './DashBoardHeader.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
interface IProps {
  companyName: string;
}

class Header extends React.Component<IProps & RouteComponentProps>{

  constructor(props: any) {
    super(props);
  }
  private FloatingHeader = () => (
    <div className=" headerDashBoard sticky" id="homeHeader">
      <Navbar>
        <Navbar.Brand onClick={this.goToHomePage}>
          <div className="topBar">
            <div className="left headerLogo">
              <img src={logo} alt="Logo" width="250%" height="100%" />
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse >
          <Nav className="mr-auto">
            <Nav.Link href="#home"></Nav.Link>
          </Nav>
          <Button onClick={this.goToHomePage} variant="link" className="jobListing">Home </Button>
          <img
            className="media-object img-circle companyLogo"
            src='https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/CompanyLogo%2Foffice-logo.png?alt=media&token=3794b07e-b8d9-498e-88db-9d57ab2843cc'
            alt="office"
          />
          <Nav>
            <p className="companyNameonHeader jobListing">{this.props.companyName}</p>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )

  public goToHomePage = () => {
    this.props.history.push('/HomePage');
  }

  render() {
    return (
      <div style={styles.root}>
        <this.FloatingHeader />
      </div>
    );
  }
}

export default withRouter(Header);