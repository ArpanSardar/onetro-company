import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import SignIn from '../../../../services/SignIn';
import { Navbar, Badge, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';
import {firebaseService,facebookProvider,googleProvider} from '../../../../services/FirebaseService';
import '../../../../../node_modules/noty/lib/noty.css';
import '../../../../../node_modules/noty/lib/themes/mint.css';
import Noty from 'noty';
import GoogleButton from '../../../../assets/images/btn_google_signin.png';
import FacebookButton from '../../../../assets/images/facebooklogin.png';



import { RouteComponentProps, withRouter } from 'react-router-dom';
import { object } from '../../../../../node_modules/@types/prop-types';


interface IProps {
}
interface IState {
  [key: string]: any;
}

const emailRegEx=RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

const formValid = (validationErrors: string , ...rest: string[])=>{
  let valid=true;

  Object.values(validationErrors).forEach(val => {
    val.length > 0 && (valid=false)
  });

  Object.values(rest).forEach(val=>{
    val===null && (valid=false)
  });
  return valid;
}


class SignInForm extends Component<IProps & RouteComponentProps, IState>{
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error:'',
      validationErrors:{
        email:"",
        password:""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authWithFacebook=this.authWithFacebook.bind(this);
    this.authWithGoogle=this.authWithGoogle.bind(this);
  }
  
  Alert(msg: any,type: any){
    new Noty({
      type: type,
      layout: "topRight",
      // text: "Unable to login !",
      text: msg,
      timeout: 3000 ,
    }).show()
  }

  authWithFacebook(){
    firebaseService.auth().signInWithPopup(facebookProvider)
    .then((u:any)=>{
      firebaseService.firestore().collection("CompanyInfo").where("CompanyId", "==", u.user.uid)
      .get()
      .then(function(querySnapshot) {
        
          if(querySnapshot.empty)
          {
            let userId= u.user.uid;
            let subscription={
              PlanName: 'Basic',
              StartDate: '',
              EndDate: '',
              MonthlyCost: 0
            };
            var docData = {
              Address:'',
              AdminList:[],
              CompanyId:userId,
              CompanyLogo:'',
              ContactNumber:'',
              Internships:[],
              JobPostings:[],
              ShortListedCandidates:[],
              InterviewRequestedCandidates:[],
              TotalEmployee:'',
              Website:'',
              email: u.user.email,
              CompanyName: '',
              MemberName: '',
              MemberEmail: u.user.email,
              CompanyDescription:'',
              WhatWeDo:'',
              Founder:'',
              Industry:'',
              SubscriptionDetails:subscription
                };
      
                var monitorData={
                  email:u.user.email,
                  CompanyName:'',
                  employeeName:'',
                  CompanyId:userId,
                  Date: new Date()
                };
            firebaseService.firestore().collection("CompanyInfo").doc(userId).set(docData)
            .then(function() {
              firebaseService.firestore().collection("ActivityMonitor").doc("CompanyRegistration")
                      .update({
                        Company: firebaseService.firestore.FieldValue.arrayUnion(monitorData)
                      });
                });
              
            }
        });
      
      }).catch((error)=>{
      this.Alert(error.message,'error');
      });
  }

  authWithGoogle(){
    firebaseService.auth().signInWithPopup(googleProvider)
    .then((u:any)=>{
      firebaseService.firestore().collection("CompanyInfo").where("CompanyId", "==", u.user.uid)
      .get()
      .then(function(querySnapshot) {
        
          if(querySnapshot.empty)
          {
            let userId= u.user.uid;
            let subscription={
              PlanName: 'Basic',
              StartDate: '',
              EndDate: '',
              MonthlyCost: 0
            };
            var docData = {
              Address:'',
              AdminList:[],
              CompanyId:userId,
              CompanyLogo:'',
              ContactNumber:'',
              Internships:[],
              JobPostings:[],
              ShortListedCandidates:[],
              InterviewRequestedCandidates:[],
              TotalEmployee:'',
              Website:'',
              email: u.user.email,
              CompanyName: '',
              MemberName: '',
              MemberEmail: u.user.email,
              CompanyDescription:'',
              WhatWeDo:'',
              Founder:'',
              Industry:'',
              SubscriptionDetails:subscription
                };
      
                var monitorData={
                  email:u.user.email,
                  CompanyName:'',
                  employeeName:'',
                  CompanyId:userId,
                  Date: new Date()
                };
            firebaseService.firestore().collection("CompanyInfo").doc(userId).set(docData)
            .then(function() {
              firebaseService.firestore().collection("ActivityMonitor").doc("CompanyRegistration")
                      .update({
                        Company: firebaseService.firestore.FieldValue.arrayUnion(monitorData)
                      });
                });
              
            }
        });
      
      }).catch((error)=>{
      this.Alert(error.message,'error');
      });
  }
  

  handleChange(e: any) {
    let target = e.target;
    let value = target.value;

    let name = target.name;
    
    let validationErrors=this.state.validationErrors;
    switch(name)
    {
      case "email":
        validationErrors.email = emailRegEx.test(value) ?"":"Invalid email address"; 
        break;
      case "password":
        validationErrors.password = value.length<5 ?"password required":""; 
        break;
      default:
        break;
    }

    this.setState({
      validationErrors,
      [name]: value
    });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    

    if(formValid(this.state.validationErrors,this.state.email,this.state.password))
    {
     firebaseService.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
     .then((u:any)=>{

          // this.Alert('Hi there! Welcome back.','success');
          
      }).catch((error:any)=>{
        this.Alert(error.message,'error');
      });

    }
  }

  

  handleClose = () => {
    this.props.history.push('/Candidate/LandingPage');
  }

  

  render() {
    
    return (
      <Modal show={true} onHide={this.handleClose}>
        <div className="close">
          <button type="button" className="close" aria-label="Close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Modal.Title className="modalTitle">Sign in</Modal.Title>
        <Modal.Body>
          <div className="FormCenter">
            {/* <form onSubmit={this.handleSubmit} noValidate> */}
            <form noValidate>
              <div className="FormTitle">
                {/* <label className="FormField__CheckboxLabel"> */}
                {/* With your social network */}
                SNSアカウントでログイン
                {/* </label> */}
              </div>
              <div className="SocialLogin modalTitle">
                {/* <Button className="loginBtn loginBtn--facebook" onClick={()=>{this.authWithFacebook()}}>
                  Facebook
                </Button> */}
                {/* <Button className="loginBtn loginBtn--google" onClick={()=>{this.authWithGoogle()}}>
                  Google
                </Button>
                <br/> */}
                  <img src={FacebookButton} className="SocialloginBtnimg"  alt="my image" onClick={()=>{this.authWithFacebook()}} />
                
                  <img src={GoogleButton} className="SocialloginBtnimg"  alt="my image" onClick={()=>{this.authWithGoogle()}} />
                
                  {/* <img src={GoogleButton} className="imgSocialbtn" onClick={()=>{this.authWithGoogle()}}/> */}
                  
                
              </div>

              

              <hr className="FormField__hr"></hr>
              {/* <div className="FormField"> */}

                {/* <label className="FormField__Label" htmlFor="email">E-Mail Address</label> */}
                <input type="email" id="email" 
                className={this.state.validationErrors.email.length>0 ?"error":"FormField__Input"} 
                placeholder="メールアドレス" name="email" value={this.state.email} 
                onChange={this.handleChange} 
                formNoValidate/>
                {this.state.validationErrors.email.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.email}</span>
                )}
              {/* </div> */}
              {/* <div className="FormField"> */}
                {/* <label className="FormField__Label" htmlFor="password">Password</label> */}
                <input type="password" id="password" 
                className={this.state.validationErrors.password.length>0 ?"error":"FormField__Input"} 
                placeholder="パスワード" name="password" 
                value={this.state.password} onChange={this.handleChange} formNoValidate/>
                {this.state.validationErrors.password.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.password}</span>
                )}
              {/* </div> */}
              {/* <div className=""> */}
                {/* <button className="FormField__Button mr-20" >Sign In</button> */}
                <Button className="buttonLogin" onClick={this.handleSubmit}><span>ログイン</span></Button>
                <br/>
                <div className="d-flex">
                <Link to="/SignUp" className="FormField__Link p-2">Create an account</Link>

              <Link to="/PasswordReset" className="FormField__Link ml-auto p-2">Forgot password ?</Link>
              </div>
              
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  // }
  }
}
export default withRouter(SignInForm);