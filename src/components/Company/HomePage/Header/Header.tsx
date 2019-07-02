import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import logo from '../../../../assets/images/logo.png';

import Pricing from '../../LandingPage/pricing/pricing';
import { firebaseService } from '../../../../services/FirebaseService';

import { Navbar, Badge, Nav, NavDropdown, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import { withRouter, RouteComponentProps } from 'react-router-dom';


import './style.css';

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
  companyDetails: any;
}

class Header extends React.Component<IProps & RouteComponentProps>{

  constructor(props: any) {
    super(props);
    this.Logout = this.Logout.bind(this);
  }

  public navigateToDashBoard = () => {
    this.props.history.push('/CompanyDashBoard');
  }
  public Logout = () => {
    // this.props.history.push('/LandingPage');
    // localStorage.removeItem('user');
    // alert("siginig out");
    firebaseService.auth().signOut();
    // alert("signed out");
  }

  render() {
    return (
      <div style={styles.root}>
        <div className=" header sticky" id="homeHeader">
          <Navbar>
            <Navbar.Brand href="#home">
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
              {/* <Button variant="link" className="jobListing">Job Postings</Button> */}
              <img
                className="media-object img-circle companyLogo"
                src='https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/CompanyLogo%2Foffice-logo.png?alt=media&token=3794b07e-b8d9-498e-88db-9d57ab2843cc'
                alt="office"
              />
              <Nav>
                <Dropdown className="" >
                  <DropdownButton variant="success" id="dropDownMenu" alignRight className="dropDownMenu"
                    title={this.props.companyDetails ? this.props.companyDetails.CompanyName : 'Unknown'}>

                    {/* <Dropdown.Menu className="dropDownMenu"> */}
                    <Dropdown.Item onClick={this.navigateToDashBoard} className="dropDownItem">ダッシュボード</Dropdown.Item>
                    <Dropdown.Divider className="dropSownSeperator" />
                    <Dropdown.Item href="https://willings.co.jp/contact" className="dropDownItem">お問い合わせ</Dropdown.Item>
                    <Dropdown.Divider className="dropSownSeperator" />
                    <Dropdown.Item onClick={this.Logout} className="dropDownItem">ログアウト</Dropdown.Item>
                    {/* </Dropdown.Menu> */}
                  </DropdownButton>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);