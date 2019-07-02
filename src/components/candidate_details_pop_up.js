import React from "react";

class CandidateDetailsPopUp extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className />
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-9">
                <div className="chipIntroVideo ">
                  <video className="col-lg-12 introVideo" controls>
                    {}
                    <source
                      src="https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/IntroVideo%2Ftypetest.mp4?alt=media&token=eea4a83d-ac88-4f49-8907-16e1ea379599"
                      type="video/mp4"
                    />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
                <div className="chip col-lg-12">
                  <div className="row">
                    <div className="col-lg-2">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/ProfilePicture%2FAnkurProfilePic.JPG?alt=media&token=65d9598a-b6c3-407f-b7b9-ba9e4d8969da"
                        alt="Person"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="col-lg-10">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-8 pull-right text-left">
                            <h5>Ankur Sardar</h5>
                          </div>
                          <div className="col-lg-4 text-right">
                            <span className="skillSetLocation">
                              <i className="material-icons skillSetLocation">
                                place
                              </i>
                              Tokyo, Japan
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 text-left">
                        <p className="skills">ASP DotNet</p>
                        <p className="skills">ADO DotNet</p>
                        <p className="skills">ReactJs</p>
                        <p className="skills">JavaScript</p>
                        <p className="skills">SQL Server</p>
                        <p className="skills">HTML/CSSC</p>
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
                        Work Experience
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
                        Education
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
                        Projects
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
                        Certifications
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="workExperience"
                      role="tabpanel"
                      aria-labelledby="workExperience-tab"
                    >
                      <div className="row">
                        <div className="col-lg-8">
                          <span className="workExperience-Title">
                            Software Developer
                          </span>
                          <br />
                          <span className="workExperience-CpmpanyName">
                            Lunascape.
                          </span>
                        </div>
                        <div className="col-lg-4 text-right">
                          <span className="skillSetLocation">
                            <i className="material-icons skillSetLocation">
                              schedule
                            </i>
                            Dec 2017 ~
                          </span>
                          <br />
                          <p className="skillSetLocation">
                            <i className="material-icons skillSetLocation">
                              place
                            </i>
                            Tokyo, Japan
                          </p>
                        </div>
                        <div className="col-lg-12">
                          <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-8">
                          <span className="workExperience-Title">
                            Software Developer
                          </span>
                          <br />
                          <span className="workExperience-CpmpanyName">
                            Media Do.
                          </span>
                        </div>
                        <div className="col-lg-4 text-right">
                          <span className="skillSetLocation">
                            <i className="material-icons skillSetLocation">
                              schedule
                            </i>
                            April 2017 ~ Dec 2017
                          </span>
                          <br />
                          <p className="skillSetLocation">
                            <i className="material-icons skillSetLocation">
                              place
                            </i>
                            Kolkata, India
                          </p>
                        </div>
                        <div className="col-lg-12">
                          <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="education"
                      role="tabpanel"
                      aria-labelledby="education-tab"
                    >
                      Education Details
                    </div>
                    <div
                      className="tab-pane fade"
                      id="project"
                      role="tabpanel"
                      aria-labelledby="project-tab"
                    >
                      Project Details
                    </div>
                    <div
                      className="tab-pane fade"
                      id="certificate"
                      role="tabpanel"
                      aria-labelledby="certificate-tab"
                    >
                      Certification Details
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="row">
                  <button
                    type="button"
                    className="col-lg-12 btn btn-info btn-block"
                  >
                    Shortlist
                  </button>
                  <button
                    type="button"
                    className="col-lg-12 btn btn-outline-info btn-block"
                  >
                    Request an interview
                  </button>
                </div>
                <div className="row">
                  <div className="sidebarRight col-lg-12">
                    <div className="col-lg-12">
                      <i className="material-icons ">card_travel</i>
                      <br />
                      <span>
                        <b>2+ Years</b>
                      </span>
                      <br />
                      <p>Job Experience</p>
                    </div>
                    <div className="col-lg-12">
                      <i className="material-icons ">school</i>
                      <br />
                      <span>
                        <b>04</b>
                      </span>
                      <br />
                      <p>Certificates Achieved</p>
                    </div>
                    <div className="col-lg-12">
                      <i className="material-icons ">description</i>
                      <br />
                      <span>
                        <b>03</b>
                      </span>
                      <br />
                      <p>Internships completed</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 sidebarRightBottom">
                    <h6>Expertise</h6>
                    <br />
                    Agile Development
                    <br />
                    User Experience
                    <br />
                    User Interface
                    <br />
                    Full Stack Development
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className />
          </div>
        </div>
      </div>
    );
  }
}

export default CandidateDetailsPopUp;
