import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';

import './style.css';

import { Navbar, Badge, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import {firebaseService,facebookProvider,googleProvider} from '../../../../services/FirebaseService';
import '../../../../../node_modules/noty/lib/noty.css';
import '../../../../../node_modules/noty/lib/themes/mint.css';
import Noty from 'noty';
import GoogleButton from '../../../../assets/images/btn_google_signin.png';
import FacebookButton from '../../../../assets/images/facebooklogin.png';

// import Modal from '@material-ui/core/Modal';


interface IProps {
}

interface IDispProps { }

interface IState {
  [key: string]: any;
}

const styles: any = {
  paper: {
    sition: 'absolute',
    outline: 'none',
  },
};

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

class SignUpForm extends Component<IProps & RouteComponentProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      employeeName: '',
      // userName:'',
      email: '',
      password: '',
      confirmpassword: '',
      error:'',
      validationErrors:{
        name:"",
        employeeName:"",
        // userName:'',
        email:"",
        password:"",
        confirmpassword:""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authWithFacebook=this.authWithFacebook.bind(this);
    this.authWithGoogle=this.authWithGoogle.bind(this);
  }

  handleChange(e: any) {
    let target = e.target;
    // let value = target.type === 'checkbox' ? target.checked : target.value;
    let value = target.value;

    let name = target.name;

    let validationErrors=this.state.validationErrors;
    switch(name)
    {
      case "name":
        validationErrors.name = value.length<4 ?"Company Name is Rquired and must be at least 4 characters":""; 
        break;
      case "userName":
        validationErrors.userName = value.length<4 ?"User Name is Rquired and must be at least 4 characters":""; 
        break;
      case "email":
        validationErrors.email = emailRegEx.test(value) ?"":"Invalid email address"; 
        break;
      case "password":
        validationErrors.password = value.length<5 ?"password required":""; 
        break;
      case "confirmpassword":
        validationErrors.confirmpassword = value===this.state.password ?"":"Confirm password should match with password"; 
      break;
      default:
        break;
    }

    this.setState({
      validationErrors,
      [name]: value
    });
  }

  
  Alert(msg: any,type: any){
    new Noty({
      type: type,
      layout: "topRight",
      // text: "Unable to login !",
      text: msg,
      timeout: 4000 ,
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

  handleSubmit(e: any) {

    e.preventDefault();
    if(formValid(this.state.validationErrors,this.state.name,this.state.email,this.state.password,this.state.confirmpassword))
    {
     firebaseService.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then((u:any)=>{
              // this.Alert('Regsitration successful','success');
              let userId= u.user.uid;
              let subscription={
                PlanName: '無料',
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
                  email:this.state.email,
                  CompanyName:this.state.name,
                  MemberName:this.state.employeeName,
                  MemberEmail: this.state.email,
                  CompanyDescription:'',
                  WhatWeDo:'',
                  Founder:'',
                  Industry:'',
                  SubscriptionDetails:subscription
                  };

              var monitorData={
                  email:this.state.email,
                  CompanyName:this.state.name,
                  employeeName:this.state.employeeName,
                  CompanyId:userId,
                  Date: new Date()
              }
              firebaseService.firestore().collection("CompanyInfo").doc(userId).set(docData)
              .then(function() {
                firebaseService.firestore().collection("ActivityMonitor").doc("CompanyRegistration")
                .update({
                  Company: firebaseService.firestore.FieldValue.arrayUnion(monitorData)
                });
              });
        }).catch((error)=>{
        this.Alert(error.message,'error');
        // this.setState({redirect: false});     
       });
    }
  }

  //Below code is to check if email already exist . if not then create or aletr user
  // handleSubmit(e: any) {
  //   e.preventDefault();
  //   // console.log('The form was submitted with the following data:');
  //   // console.log(this.state);
  //   const _email= this.state.email.value;
  //   alert(_email);
  //   firebaseService.auth().fetchProvidersForEmail(_email)
  //   .then((provider)=>{

  //     if(provider.length===0){
  //       //create user
  //       return firebaseService.auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
  //       alert("Need to create user");
  //     }
  //     else if(provider.indexOf("password")===-1){
  //       alert("User already eregistered using same email through social login.");
  //       // this.toaster.show({intent:Intent.WARNING, message:"Try alternate login."})
  //     }
  //     else{
  //       //Sign user in
  //       alert("Registration Successful");
  //       // this.setState({redirect: true}); 
  //           // this.toaster.show({intent:Intent.DANGER, message:"Unable to sign in with Facebook."})
  //       this.handleClose();
  //       }
  //     }
  //   ).catch((error:any)=>{
  //     alert(error);
  //     // this.setState({redirect: false});
  //   });

    
  // }

  handleClose = () => {
    this.props.history.push('/Candidate/LandingPage');
  }

  render() 
  {
    
    return (
      <Modal  show={true}  onHide={this.handleClose}>
        <div className="close">
          <button type="button" className="close" aria-label="Close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <Modal.Title className="modalTitle">Sign up</Modal.Title>
        <Modal.Body>
          <div className="FormCenter align-self-center">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormTitle">
                <label className="FormField__CheckboxLabel">
                  {/* Registering to this website, you accept our
              <a href="" className="FormField__TermsLink">Terms of Use</a> and our
              <a href="" className="FormField__TermsLink">Privacy Policy</a>. */}
                <Link to="/TermsAndConditions">利用規約</Link>と<Link to="/PrivacyPolicy">プライバシーポリシー</Link>をご確認の上、本サービスにご登録ください。
              </label>
              </div>
              <div className="FormTitle">
                {/* <label className="FormField__CheckboxLabel"> */}
                SNSアカウントでログイン
                {/* </label> */}
              </div>
              <div className="SocialLogin modalTitle">
                {/* <Button className="loginBtn loginBtn--facebook" onClick={()=>{this.authWithFacebook()}}>
                  Facebook
                </Button>
                <Button className="loginBtn loginBtn--google" onClick={()=>{this.authWithGoogle()}}>
                  Google
                </Button> */}
                 <img src={FacebookButton} className="SocialloginBtnimg"  alt="my image" onClick={()=>{this.authWithFacebook()}} />
                
                <img src={GoogleButton} className="SocialloginBtnimg"  alt="my image" onClick={()=>{this.authWithGoogle()}} />
              
              </div>

              <hr className="FormField__hr"></hr>

              <div className="FormField">
                <div className="FormField">
                  {/* <label className="FormField__Label" htmlFor="name">User name</label> */}
                  <input type="text" id="name" 
                className={this.state.validationErrors.name.length>0 ?"error":"FormField__Input"} 
                placeholder="Enter your company name" name="name" 
                  value={this.state.name} onChange={this.handleChange} formNoValidate />
                  {this.state.validationErrors.name.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.name}</span>
                )}
                </div>

                <div className="FormField">
                  {/* <label className="FormField__Label" htmlFor="email">Email</label> */}
                  <input type="employeeName" id="employeeName" 
                className={this.state.validationErrors.employeeName.length>0 ?"error":"FormField__Input"} 
                placeholder="Enter your name" name="employeeName" 
                  value={this.state.employeeName} onChange={this.handleChange} formNoValidate />
                  {this.state.validationErrors.employeeName.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.employeeName}</span>
                )}
                </div>

                <div className="FormField">
                  {/* <label className="FormField__Label" htmlFor="email">Email</label> */}
                  <input type="email" id="email" 
                className={this.state.validationErrors.email.length>0 ?"error":"FormField__Input"} 
                placeholder="Enter your email" name="email" 
                  value={this.state.email} onChange={this.handleChange} formNoValidate />
                  {this.state.validationErrors.email.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.email}</span>
                )}
                </div>
                <div>
                  <input type="password" id="password" 
                className={this.state.validationErrors.password.length>0 ?"error":"FormField__Input"} 
                placeholder="Enter your password" name="password" 
                  value={this.state.password} onChange={this.handleChange} formNoValidate />
                  {this.state.validationErrors.password.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.password}</span>
                )}
                </div>
                <div className="FormField">
                  {/* <label className="FormField__Label" htmlFor="confirmpassword">Confirm Password</label> */}
                  <input type="password" id="confirmpassword" 
                className={this.state.validationErrors.confirmpassword.length>0 ?"error":"FormField__Input"} 
                placeholder="Confirm password" 
                  name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange} formNoValidate/>
                {this.state.validationErrors.confirmpassword.length>0 && (
                  <span className="errorMessage">{this.state.validationErrors.confirmpassword}</span>
                )}
                </div>

                <div className="FormField">
                  {/* <button className="FormField__Button mr-20">Sign Up</button> */}
                  <Button className="buttonLogin" onClick={this.handleSubmit}><span>サインアップ</span></Button>
                <br/>
                  <Link to="/SignIn" className="FormField__Link">既に登録済みの企業様はこちら</Link>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  
}
}
export default withRouter(SignUpForm);