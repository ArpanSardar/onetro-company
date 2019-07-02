import React, { Component } from 'react';
import './App.css';
import LandingPageCompany from './components/Company/LandingPage';
import HomePage from './components/Company/HomePage';
import { HashRouter as Router, Route, Redirect, RouteComponentProps , withRouter} from 'react-router-dom';
import SignUpForm from './components/Company/LandingPage/signup/SignUpForm';
import SignInForm from './components/Company/LandingPage/signin/SignInForm';
import LandingPage from './components/Company/LandingPage';
import {firebaseService} from './services/FirebaseService';
import NavBar from './components/HeaderLayout/Navbar';
import DashBoard from './components/Company/Dashboard/CompanyDashBoard';
import PasswordResetForm from './components/Company/LandingPage/passwordreset/passwordResetForm';
import TermsAndConditions from './components/Company/LandingPage/TermAndConditions/TermsAndConditions';
import PrivacyPolicy from './components/Company/LandingPage/PrivacyPolicy/PrivacyPolicy';
import CandidateLanding from './components/Candidate/LandingPage'
import CandidateSignUpForm from './components/Candidate/LandingPage/signup/SignUpForm';
import CandidateSignInForm from './components/Candidate/LandingPage/signin/SignInForm';
interface IProps {
}

interface IDispProps {
}

interface IState {
  userID: any;
  isSignedIn: boolean;
  companyDetails: any;
}
class App extends React.Component<IProps & IDispProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userID: "",
      isSignedIn: false,
      companyDetails: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebaseService.auth().onAuthStateChanged((user: any) => {
      if (user) {

        firebaseService.firestore().collection('CompanyInfo').where("CompanyId", "==", user.uid).get()
          .then((querySnapshot) => {
            querySnapshot.forEach(
              (doc) => {
                // console.log(doc.data());
                this.setState({ companyDetails: doc.data() });
              }
            );
            // console.log(candidateIdArray);
            // this.setState({ list: candidateIdArray });
            this.setState({
              // isSignedIn: !!user
              isSignedIn: true,
              userID: user.uid
            });
            sessionStorage.setItem('userID', user.uid);
          }).catch((error) => {
            new Noty({
              type: 'error',
              layout: "topRight",
              // text: "Unable to login !",
              text: error.message,
              timeout: 3000,
            }).show()
          });

      }
      else {
        this.setState({
          isSignedIn: false,
          userID:""
        });
        // alert("removing user");
        sessionStorage.removeItem('userID');
      }
    });
  }
  

  render() {
    if(this.state.isSignedIn===true){
      // <Redirect to='/HomePage'/>
      return(<div>
         <Redirect to='/HomePage'/>
         <Route exact path="/HomePage" 
        //  component={HomePage}
         render={(props) => <HomePage {...props} user={this.state.userID} companyDetails={this.state.companyDetails}/>}
         />
         <Route exact path="/CompanyDashBoard" 
        //  component={DashBoard}
          render={(props) => <DashBoard {...props} user={this.state.userID} companyDetails={this.state.companyDetails} />} 
         />
          {/* <HomePage userName={this.state.user}/> */}
         </div>);
      
    }
    else{
    return (

      <div className="App">
        <Redirect to='/LandingPage'/>
        <Route exact path="/LandingPage" component={LandingPage} />
        <Route exact path="/SignUp" component={SignUpForm} />
        <Route exact path="/SignIn" component={SignInForm} />
        <Route exact path="/PasswordReset" component={PasswordResetForm} />
        <Route exact path="/TermsAndConditions" component={TermsAndConditions}/>
        <Route exact path="/PrivacyPolicy" component={PrivacyPolicy}/>
        {/* <Route exact path="/HomePage" strict render={({match})=>(
          this.state.isSignedIn? <HomePage userName={match.params.username}/>: <Redirect to='/LandingPage'/>
        )} /> */}
        <Route exact path="/HomePage" component={HomePage}/>
        {/* <LandingPage/> */}
        {/* <Route exact path="/Candidate/LandingPage" component={CandidateLanding}/>
        <Route exact path="/Candidate/SignUp" component={CandidateSignUpForm} />
        <Route exact path="/Candidate/SignIn" component={CandidateSignInForm} /> */}
      </div>
    );
  }
}
}

export default App;
