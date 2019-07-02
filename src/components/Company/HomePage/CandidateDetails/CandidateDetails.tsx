import React from "react";
import Noty from 'noty';
import './CandidateDetailsPopUp.css';
import { firebaseService } from '../../../../services/FirebaseService';
// import { Alert } from 'react-bootstrap';
const SweetAlert = require('react-bootstrap-sweetalert');
import swal from 'sweetalert';


// import SweetAlert from 'react-bootstrap-sweetalert';

interface IProps {
  candidate: any;
  shortListed: boolean;
  interviewRequested: boolean;
}

interface IState {
  interviewRequestedByComopany: boolean;
  shortlistedByComopany: boolean;
}

class CandidateDetailsPopUp extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      interviewRequestedByComopany: false,
      shortlistedByComopany: false
    };
  }

  checkInterviewRequestedStatus = () => {
    firebaseService.firestore().collection("Company").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id == this.props.candidate.id) {
            
          }
        });


      });
  }

  componentDidMount() {
    this.setState({
      interviewRequestedByComopany: this.props.interviewRequested,
      shortlistedByComopany: this.props.shortListed
    })
  }

  Alert(msg: any, type: any) {
    new Noty({
      type: type,
      layout: "topRight",
      // text: "Unable to login !",
      text: msg,
      timeout: 3000,
    }).show()
  }

  AlertMessage(msg: any, type: any) {
    swal("候補者リストに追加されました", msg, type);
  }

  requestInterview = () => {
      const sessionUID = sessionStorage.getItem('userID');
      let CandidateId= this.props.candidate.id;
      let CandidateName= this.props.candidate.name;
      let CandidateEmail= this.props.candidate.email;
      
        
      const a = firebaseService.firestore().collection("CompanyInfo").get()
        .then((querySnapshot) => {
          querySnapshot.forEach(
            (doc) => {
              if (doc.data().CompanyId == sessionUID) {
                var ref = firebaseService.firestore().collection("CompanyInfo").doc(doc.id);
                ref.update({
                  InterviewRequestedCandidates: firebaseService.firestore.FieldValue.arrayUnion(this.props.candidate.id)
                }).then(() => {
                  swal( "インタビューリクエストが \n"  + this.props.candidate.name + "さんに送信されました", '1営業日以内にOnetroチームからご連絡を差し上げます', 'success');
                  // swal("Interview request sent to candidate: " + this.props.candidate.name, 'We will contact you soon', 'success');
                  firebaseService.firestore().collection("CompanyInfo").where("CompanyId", "==", sessionUID)
                  .get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                      var monitorData={
                        CompanyId:sessionUID,
                        companyEmail: doc.data().email,
                        companyName: doc.data().CompanyName,
                        memberName: doc.data().MemberName,
                        memberEmail: doc.data().MemberEmail,
                        CandidateId: CandidateId,
                        CandidateName: CandidateName,
                        CandidateEmail: CandidateEmail,
                    };
                    firebaseService.firestore().collection("ActivityMonitor").doc("InterviewRequest")
                    .update({
                        Requests: firebaseService.firestore.FieldValue.arrayUnion(monitorData)
                        });
                    });                   
                  });
                  this.setState({interviewRequestedByComopany: true});
                });
              }
            }
          );
  
  
        });
    
  }

  shortlisted = () => {
    const sessionUID = sessionStorage.getItem('userID');
    // alert(sessionEmail);

    const a = firebaseService.firestore().collection("CompanyInfo").get()
      .then((querySnapshot) => {
        querySnapshot.forEach(
          (doc) => {
            if (doc.data().CompanyId == sessionUID) {
              var ref = firebaseService.firestore().collection("CompanyInfo").doc(doc.id);
              ref.update({
                ShortListedCandidates: firebaseService.firestore.FieldValue.arrayUnion(this.props.candidate.id)
              }).then(() => {
                // this.AlertMessage('You shortlisted ' + this.props.candidate.name, 'success');
                this.AlertMessage('対象者：' + this.props.candidate.name, 'success');
                this.setState({shortlistedByComopany: true});
              });
            }

          }
        );


      }
      );
  }

  render() {

    return (
      <div className="">
        <div className="row">

          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-9">
                <div className="chipIntroVideo col-lg-12 ">
                  <video className="introVideo" controls controlsList="nodownload">
                    <source
                      src={this.props.candidate.video}
                      type="video/mp4"
                    />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
                <div className="chip col-lg-12">
                  <div className="row">
                    <div className="col-lg-2">
                      <img
                        src={this.props.candidate.img}
                        alt="Person"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="col-lg-10">
                      {/* <div className="col-lg-12"> */}
                        <div className="row">
                          <div className="col-lg-8 pull-right text-left">
                            <h5>{this.props.candidate.name}</h5>
                          </div>
                          <div className="col-lg-4 text-right">
                            <span className="skillSetLocation">
                              <i className="material-icons skillSetLocation">
                                place
                              </i>
                              {this.props.candidate.place}
                            </span>
                          </div>
                        {/* </div> */}
                      </div>
                      <div className="col-lg-12 text-left">
                        {this.props.candidate.skills.map((skill: any) => (
                          <p key={skill} className="skills">{skill}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 chip">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active profileDetailsTabLink"
                        id="workExperience-tab"
                        data-toggle="tab"
                        href="#workExperience"
                        role="tab"
                        aria-controls="workExperience"
                        aria-selected="true"
                      >
                        職歴
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link profileDetailsTabLink"
                        id="education-tab"
                        data-toggle="tab"
                        href="#education"
                        role="tab"
                        aria-controls="education"
                        aria-selected="false"
                      >
                        学歴
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link profileDetailsTabLink"
                        id="project-tab"
                        data-toggle="tab"
                        href="#project"
                        role="tab"
                        aria-controls="project"
                        aria-selected="false"
                      >
                        プロジェクト経験
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link profileDetailsTabLink"
                        id="certificate-tab"
                        data-toggle="tab"
                        href="#certificate"
                        role="tab"
                        aria-controls="certificate"
                        aria-selected="false"
                      >
                        {/* Certifications */}
                        資格／実績
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content candidateDetailsTab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="workExperience"
                      role="tabpanel"
                      aria-labelledby="workExperience-tab"
                    >
                    {this.props.candidate.workExperience.length > 0 ? null : 
                      <div> <h1 className="workExperience-Title">
                      {/* No Record Found */}
                      記載はありません
                      </h1> </div>
                    }
                      {this.props.candidate.workExperience.map((work: any) => (
                        <div key={work.title}>
                          <div className="row">
                            <div className="col-lg-8">
                              <span className="workExperience-Title">
                                {work.title}
                              </span>
                              <br />
                              <span className="workExperience-CpmpanyName">
                                {work.company}
                              </span>
                            </div>
                            <div className="col-lg-4 text-right">
                              <span className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  schedule
                            </i>
                                {work.schedule}
                              </span>
                              <br />
                              <p className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  place
                            </i>
                                {work.place}
                              </p>
                            </div>
                            <div className="col-lg-12">
                              <p className="description">
                                {work.description}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>

                      ))}

                    </div>
                    <div
                      className="tab-pane fade"
                      id="education"
                      role="tabpanel"
                      aria-labelledby="education-tab"
                    >
                    {this.props.candidate.education.length > 0 ? null : 
                      <div> <h1 className="workExperience-Title">
                      {/* No Record Found */}
                      記載はありません
                      </h1> </div>
                    }
                      {this.props.candidate.education.map((education: any) => (
                        <div key={education.title}>
                          <div className="row">
                            <div className="col-lg-8">
                              <span className="workExperience-Title">
                                {education.title}
                              </span>
                              <br />
                              <span className="workExperience-CpmpanyName">
                                {education.organization}
                              </span>
                            </div>
                            <div className="col-lg-4 text-right">
                              <span className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  schedule
                            </i>
                                {education.schedule}
                              </span>
                              <br />
                              <p className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  place
                            </i>
                                {education.place}
                              </p>
                            </div>
                            <div className="col-lg-12">
                              <p className="description">
                                {education.description}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}


                    </div>
                    <div
                      className="tab-pane fade"
                      id="project"
                      role="tabpanel"
                      aria-labelledby="project-tab"
                    >
                    {this.props.candidate.project.length > 0 ? null : 
                      <div> <h1 className="workExperience-Title">
                      {/* No Record Found */}
                      記載はありません
                      </h1> </div>
                    }
                      {this.props.candidate.project.map((project: any) => (
                        <div key={project.title}>
                          <div className="row">
                            <div className="col-lg-8">
                              <span className="workExperience-Title">
                                {project.title}
                              </span>
                              <br />
                              <span className="workExperience-CpmpanyName">
                                {project.organization}
                              </span>
                            </div>
                            <div className="col-lg-4 text-right">
                              <span className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  schedule
                            </i>
                                {project.schedule}
                              </span>
                              <br />
                              <p className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  place
                            </i>
                                {project.place}
                              </p>
                            </div>
                            <div className="col-lg-12">
                              <p className="description">
                                {project.description}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}

                    </div>
                    <div
                      className="tab-pane fade"
                      id="certificate"
                      role="tabpanel"
                      aria-labelledby="certificate-tab"
                    >
                    {this.props.candidate.certificate.length > 0 ? null : 
                      <div> <h1 className="workExperience-Title">
                      {/* No Record Found */}
                      記載はありません
                      </h1> </div>
                    }
                      {this.props.candidate.certificate.map((certificate: any) => (
                        <div key={certificate.title}>
                          <div className="row">
                            <div className="col-lg-8">
                              <span className="workExperience-Title">
                                {certificate.title}
                              </span>
                              <br />
                              <span className="workExperience-CpmpanyName">
                                {certificate.organization}
                              </span>
                            </div>
                            <div className="col-lg-4 text-right">
                              <span className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  schedule
                            </i>
                                {certificate.schedule}
                              </span>
                              <br />
                              <p className="skillSetLocation">
                                <i className="material-icons skillSetLocation">
                                  place
                            </i>
                                {certificate.place}
                              </p>
                            </div>
                            <div className="col-lg-12">
                              <p className="description">
                                {certificate.description}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}


                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="row">
                  {this.state.shortlistedByComopany ?
                    <button
                      type="button"
                      className="col-lg-12 btn btn-outlineinfo"
                      disabled={true}
                    >
                      <a>リストに追加</a>
                    </button>
                    :
                    <button
                      type="button"
                      className="col-lg-12 btn btn-info"
                      onClick={() => this.shortlisted()}
                      disabled={this.props.shortListed}
                    >
                      <a>リストに追加</a>
                    </button>
                  }
                  {/* <button
                    type="button"
                    className="col-lg-12 btn btn-outline-info"
                  > */}
                  {this.state.interviewRequestedByComopany ?
                    <button
                      type="button"
                      className="col-lg-12 btn btn-outlineinfo"
                      disabled={true}
                    >
                      <a>面接へ招待</a>
                    </button>
                    :
                    <button type="button" className="col-lg-12 btn btn-outline-info" onClick={()=>this.requestInterview()}>
                    <a>面接へ招待</a>
                  </button>
                  }
                </div>
                <div className="row">
                  <div className="sidebarRight col-lg-12">
                    <div className="col-lg-12">
                      <i className="material-icons ">card_travel</i>
                      <br />
                      <span>
                        <b className="boldNumbers">{this.props.candidate.experience}</b>
                      </span>
                      <br />
                      <p>Job Experience</p>
                    </div>
                    <div className="col-lg-12">
                      <i className="material-icons ">school</i>
                      <br />
                      <span>
                        <b className="boldNumbers">0{this.props.candidate.certificate.length}</b>
                      </span>
                      <br />
                      <p>Certificates Achieved</p>
                    </div>
                    <div className="col-lg-12">
                      <i className="material-icons ">description</i>
                      <br />
                      <span>
                        <b className="boldNumbers">{this.props.candidate.noOfInternship}</b>
                      </span>
                      <br />
                      <p>Internships completed</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 sidebarRightBottom">
                    <div className="expertiseStyle">
                      <h6 >得意分野</h6>
                    </div>
                    {this.props.candidate.expertise.map((expertise: any) => (
                      <p key={expertise}>{expertise}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default CandidateDetailsPopUp;
