import React, { Component } from 'react';

import Header from './Header/Header';
import AllPositionList from './AllPosition/AllPosition';
import Footer from '../LandingPage/footer/Footer';

import CandidateDetailsService from '../../../services/CandidateDataService';
import { firebaseService } from '../../../services/FirebaseService';
import GridList from "@material-ui/core/GridList";

import './style.css';

interface IProps {
  user: any,
  companyDetails: any;
}

interface IDispProps {
}

interface IState {
  list: any;
  loading: boolean;
}
class HomePage extends React.Component<IProps & IDispProps, IState>
{
  constructor(props: any) {
    super(props);
    this.state =
      {
        list: [],
        loading: true
      };
    this.dataAdd = this.dataAdd.bind(this);
  }

  dataAdd() {
    let data =
    {
      id: 'mp3RiyiUpOh23dlZpES78Bd7Nqp1',
      JobProfile: 'Software Engineer',
      name: 'Dominykas Jonusas',
      place: 'Lithuania',
      video: 'https://onetro.s3.ap-northeast-1.amazonaws.com/displayVideo/1552424225154.mp4',
      videoThumb: '',
      img: 'https://onetro.s3.ap-northeast-1.amazonaws.com/displayPicture1553030783893',
      currentCompany: 'Unknown',
      interviewCount: [],
      linkedinURL: '',
      shortListedCount: [],
      email: 'jonusas.dominykas@gmail.com',
      contactNumber: '+37068965080',
      dob: '',
      skypeId: 'domux212',
      SocialLikes: [],
      active: true,
      skills: [
        "C#","Python","C","Java","C++"
      ],
      expertise: [
        'English', 'Russian','Lithuanian'
        ],
      experience: '',
      noOfInternship: '2',
      workExperience:[
        {
          title: 'Virtustream - Quality Assurance Intern.',
          company: 'Unknown',
          schedule: 'Unknown',
          place: 'Unknown',
          description: "By working here I strongly increased my cooperation skills while working in a team. Worked with a Linux operating system. Got introduced in a vast amount of technologies/tools such as: vSphere, databases(MongoDB, PostgreSQL), load balancing with (HAProxy), message broker (RabbitMQ)."
        },
        {
          title: 'Present Connection - REMOTE INTERNSHIP',
          company: 'Unknown',
          schedule: 'Unknown',
          place: 'Unknown',
          description: "Gained basic understanding about MVC, experience in .NET, writing unit tests and planning databases."
        },
        // {
        //   title: 'Freelancer',
        //   company: 'Unknown',
        //   schedule: 'December 1, 2013 ~ Present',
        //   place: 'Lithuania',
        //   description: "Working On Multiple Projects. Creating Online Stores, Creating Web Sites, Updating Websites, Creating Unique Websites, Managing Projects And Project Servers. Wordpress Can Be Your Best Friend Or Worst Enemy."
        // }
        '',
      ],
      education:
        [
          {
          title: 'Kaunas University Of Technology',
          organization: 'University',
          fieldOfStudy: "Computer",
          grade: "Bachelor of Technology",
          schedule: '',
          place: 'Lithuania',
          description: "Bachelor of Technology in Software engineerin. Grade-8.04"
        },
        {
          title: 'Šilutės first gymnasium',
          organization: 'School',
          fieldOfStudy: "High school diploma",
          grade: "12th Class",
          schedule: '',
          place: 'Unknown',
          description: "Grade-9"
        }
      ],
      project:
        [
        //   {
        //   title: 'Registrador',
        //   organization: 'Unknown',
        //   schedule: 'Unknown',
        //   place: 'India',
        //   teamSize: '4',
        //   responsibilities: 'I implemented the blockchain in node.js and MongoDB from scratch.',
        //   description: "A Blockchain based land Registry Application.\nIt’s a blockchain solution implemented in node.js from scratch.\nThe proposed solution is a private blockchain maintained by the government.\nGithub Link - https://github.com/amany9000/Registrador",
        //   usedSkills: ["Node.js","Javascript","HTML","CSS"]
        // },
        // {
        //   title: 'Sahara',
        //   organization: 'Unknown',
        //   schedule: 'Unknown',
        //   place: 'India',
        //   teamSize: '4',
        //   responsibilities: 'I developed the Solidity Code and its corresponding node.js endpoints using the Infura API.',
        //   description: "A Decentralised Non-profit funding platform.\nIt confronts the problem of corruption in non-profits. It makes the financial transaction of an non-profit transparent and consensus based.\nGithub Link - https://github.com/amany9000/Sahara",
        //   usedSkills: ["Node.js","Javascript","HTML","CSS"]
        // },
        // {
        //   title: 'Chat App',
        //   organization: 'Unknown',
        //   schedule: 'Unknown',
        //   place: 'India',
        //   teamSize: '1',
        //   responsibilities: 'I developed and deployed the entire application.',
        //   description: "A socket.io based server-client chat application.\nThe back-end in is Node.js. The front-end is in jQuery. The testing is through mocha and expect.\nGithub Link - https://github.com/amany9000/node-chat-app",
        //   usedSkills: ["Node.js","Javascript","jQuery","HTML","CSS"]
        // }
        
      ],
      certificate: [
      //   {
      //   title: 'ACM ICPC India 2017-18 Nationals Qualifier',
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/open?id=1yPoDp6UIMmrpt6wLtbQhBavX3F8gQyvb'
      // },
      // {
      //   itle: 'Winner of HackIIITV’18 Hackathon',
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/file/d/1-nunnH_kqzxyByQPO6tFHaoGQ2vTdDh3/view?usp=sharing'
      // },
      // {
      //   itle: "Google Code-In Mentor at SCoRe Labs",
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/open?id=1Q-su87Gb4KjfLTPw77YT3TRPlqXmN0Xm'
      // },
      // {
      //   itle: "Winner of Hired-2019",
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/file/d/1iUMyIWYOi4ARg07SJdRqpMf4j_IbEnjI/view?usp=sharing'
      // },
      // {
      //   itle: "2nd Place in Ideathon-2019",
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/open?id=1DH3IxayjE6xQZgneIlx7SEk_bWQ5CNha'
      // },
      // {
      //   itle: "Winner of Code Baton-2018",
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/open?id=1t75Yy7Y-MH0QL6n3_l_ohICwj6sKU-h1'
      // },
      // {
      //   itle: "Udemy Ethereum Course",
      //   organization: 'Unknown',
      //   place: 'India',
      //   description: 'Certificate link: https://drive.google.com/open?id=1Q6J1LjIXUMazzXun7rYRRcFPOnsCYV2U'
      // }
    ],
      personalInterest: {
        hobbies: 'Spent summer in USA with Work&Travel (2018)\nWon several Olympics in Math, Physics as well as Informatics\nSilute Music School graduate (2013)\nTrumpet player in Wind Orchestra Pamarys (2013)\nGraduate of VSI Vakarai Junior Studies Guitar Class (2014)\nEarned a Completion Certificate of Lithuania Junior Achievement program (2016)\nReceived an annex to existing Economics and Business diploma (2016)\nRepresenting sports dance club “Viesulas” at Kaunas University of Technology.\nRepresented my previous sports dance club “Lūgnė“ for 8 years.\nLove solving various math related as well as simple theoretical or physical puzzles.\nEnjoy participating in various lectures about newest technologies and other related topics.',
        motivation: 'My motivation to visit Japan comes from my deep interest in traveling to foreign countries. But to me Japan has very strong and different cultural background which is very appealing to my mind. I really enjoy a lot of things raging from history, scenery to delicious food. And i think it would be an amazing oportunity to visit this country.'
      }

    }

    firebaseService.firestore().collection("CandidateInfo").doc("mp3RiyiUpOh23dlZpES78Bd7Nqp1").set(data)
      .then(function (docRef) {
        alert('document creted');


      }).catch((error) => {
        alert(error.message);
      });;
  }

  dataCreate(){
    firebaseService.firestore().collection("CandidateInfo").where("id", "==", "1n3nRIHyLBPi6XfxzqVhzGBpE8g1")
    // firebaseService.firestore().collection("CandidateInfo").where("email", "==", "201651009@iiitvadodara.ac.in")

    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            firebaseService.firestore().collection("CandidateInfo").doc("y70RvrsQSsN6nlJEumbNGWnFaUv1").set(doc.data())
            .then(()=>{
              alert('document created');
            })
            .catch((error)=>{
              alert(error);
            });
        });
    }).catch((error)=>{
      alert(error);
    });
  }

  componentDidMount() {

    let candidateIdArray: any = [];
    firebaseService.firestore().collection('CandidateInfo').where("active","==",true)
    .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(
          (doc) => {
            candidateIdArray.push(doc.data());
          }
        );
        // console.log(candidateIdArray);
        this.setState({ list: candidateIdArray });
          this.setState({loading: false});
      }
      );
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <Header companyDetails={this.props.companyDetails}/>
          {/* <button className="btn btn-sm btn-primary" onClick={()=>{this.dataAdd()}}>ADD
                </button> */}
                {/* <button className="btn btn-sm btn-info" onClick={()=>{this.dataCreate()}}>CREATE
                </button> */}
          {!this.state.loading?
          <div className="rootContainer">
            <AllPositionList list={this.state.list} companyDetails={this.props.companyDetails} />
          </div>
          :
          <div className="rootContainer">
            <div>
            <h1 className="homeSubHeader">All Positions</h1>
            <div className="expandListContainer">
            <GridList cellHeight={300} className="gridList-loading">

              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>

              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
            </GridList>

            </div>
            <hr className="separator"></hr>
            <h1 className="homeSubHeader">Software Engineer</h1>
            <div className="expandListContainer">
            <GridList cellHeight={300} className="gridList-loading">

              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>

              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile-loading">
                <div className="img-box-loading"></div>
                <div className="name-loading"></div>
                <div className="like-loading"></div>
                <div className="skill-loading"></div>
                <div className="address-loading"></div>
              </div>
            </GridList>

            </div>
            <hr className="separator"></hr>


            </div>
          </div>
          }
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

export default HomePage;