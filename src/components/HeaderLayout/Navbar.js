import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
// import { Navbar, Badge, Nav, NavDropdown, Button } from 'react-bootstrap';
// import logo from '../../assets/images/logo.png';



const NavBar=()=>{
    return(
       <nav className="nav-wrapper grey darken-3">
       <div className="container">
       <Link to='/' className="brand-logo">Onetro
       
            {/* <img src={logo} alt="Logo" /> */}
        
       </Link> 
       <SignedInLinks/>
       <SignedOutLinks/>

       </div>
       </nav> 
//        <div className="">
// <Navbar>
// <Navbar.Brand href="#home">
//   <div className="col topBar">
//     <div className="row left topLogo">
//       <img src={logo} alt="Logo" />
//     </div>
//     <div className="row">
//     <h3 className="forStyle">for companies</h3>
//     </div>
   
//   </div>
// </Navbar.Brand>
// <Navbar.Toggle />
// <Navbar.Collapse >
//   <Nav className="mr-auto">
//     <Nav.Link href="#home"></Nav.Link>
//   </Nav>
//   <Nav>
//     <Button variant="link" className="bak1Head">For Candidates ></Button>
//   </Nav>
// </Navbar.Collapse>
// </Navbar>
// </div>
    )
}

export default NavBar;