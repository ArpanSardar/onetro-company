import React from "react";

import './Style.css';
import { firebaseService } from '../../../services/FirebaseService';
import DashBoardHeader from './Header/DashBoardHeader';
import Footer from '../LandingPage/footer/Footer';
import noItemIcon from '../../../assets/images/no_item_found.png';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Noty from 'noty';
import swal from 'sweetalert';
import Modal from "react-modal";

import CandidateDetails from "../HomePage/CandidateDetails/CandidateDetails";

interface IProps {
  user: any;
  companyDetails: any;
}

interface IState {
    [key: string]: any;
}

const customStyles = {
  content: {
    top: "10%",
    left: "15%",
    right: "15%",
    bottom: "5%"
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'
  }
};
class DashBoard extends React.Component<IProps & RouteComponentProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      company: {},
      shortListedList: [],
      jobPostings: [],
      jobPostEditIDX: -1,
      companyProfileDisable: true,
      memberAccountDisable: true,
      newJobFields: {},
      JobProfile: '',
      JobCategory: '',
      Location: '',
      Description: '',
      Subscription:{},
      showCandidateDetails: false,
      currentCandidate: "",
      currentCandidateShortlisted: false,
      currentCandidateInterviewlisted: false,
      loading: true,
      newCompanyLogo: {},
      newCompanyLogoURL: '',
      currentCompanyLogoURL:''
    };
    this.handleDeleteShortlistedCandidate = this.handleDeleteShortlistedCandidate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewLogoUpload=this.handleNewLogoUpload.bind(this);
  }

  handleNewLogoUpload=(e:any)=>{
    if(e.target.files[0]){
      let file=e.target.files[0];
      var reader = new FileReader();
      reader.onloadend=()=>{
      this.setState({
        newCompanyLogo: file,
        newCompanyLogoURL: reader.result
      })      
      }
      reader.readAsDataURL(e.target.files[0]);

    }
  }
  private handleClose = () => {
    this.setState({
      showCandidateDetails: false
    });
  };
  onCandidateDetailsClicked = (candidate: any) => {
    function checkexist(id: any) {
      return id == candidate.id;
    }
    if (this.state.company) {
      const shortlistedIndex = this.state.company.ShortListedCandidates.findIndex(checkexist);
      const interviewRequestedIndex = this.state.company.InterviewRequestedCandidates.findIndex(checkexist);
      const alreadyShortlisted = shortlistedIndex == -1 ? false : true;
      const alreadyInterviewRequested =
        interviewRequestedIndex == -1 ? false : true;
      this.setState({
        currentCandidate: candidate,
        showCandidateDetails: true,
        currentCandidateShortlisted: alreadyShortlisted,
        currentCandidateInterviewlisted: alreadyInterviewRequested
      });
    }
  };

  onNewJobFieldChange = (updatedValue: any) => {
    this.setState({
      newJobFields: {
        ...this.state.newJobFields,
        ...updatedValue
      }
    })
  }

  onchangeNewJob = (e: any) => {
    this.onNewJobFieldChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  saveNewJobPost = (e: any) => {
    e.preventDefault();

    var newArray = this.state.company.JobPostings.slice();
    newArray.push(this.state.newJobFields);
    this.setState({
      company: { ...this.state.company, JobPostings: newArray }
    });

    firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
      .set({ ...this.state.company, JobPostings: newArray })
      .then(() => {
        // this.Alert('Data updates successful', 'success');
        // this.AlertMessage('New Job added successfully', 'success');
        this.AlertMessage('新たに募集が追加されました', 'success');
      })
      .catch(function (error: any) {
        // this.Alert(error.message,'error');
      });
    this.setState({ jobPostings: newArray });

    // console.log(this.state.company);
    this.setState({
      JobProfile: '',
      JobCategory: '',
      JobLocation: '',
      JobDescription: ''
    });
    this.onNewJobFieldChange({
      JobProfile: '',
      JobCategory: '',
      JobLocation: '',
      JobDescription: ''
    });
  }

  logout = () => {
    firebaseService.auth().signOut();
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      company: { ...this.state.company, [name]: value }
    });
    // console.log(this.state.company);
  }

  Alert(msg: any, type: any) {
    new Noty({
      type: type,
      layout: "topRight",
      // text: "Unable to login !",
      text: msg,
      timeout: 4000,
    }).show()
  }

  AlertMessage(msg: any, type: any) {
    swal("完了", msg, type);
  }
  memberAccountEdit = () => {
    this.setState({ memberAccountDisable: false });
  }
  memberAccountSave = () => {
    this.setState({ memberAccountDisable: true });
    firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
      .set(this.state.company)
      .then(() => {
        // this.Alert('Data updates successful', 'success');
        this.AlertMessage('データが更新されました', 'success');
      })
      .catch(function (error: any) {
        // this.Alert(error.message,'success');
      });
  }
  companyProfileEdit = () => {
    this.setState({ companyProfileDisable: false });
  }

  companyProfileSave = () => {
    this.setState({ companyProfileDisable: true });
    if (this.state.newCompanyLogoURL == '') {
      firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
        .set(
          { ...this.state.company }
        )
        .then(() => {
          // this.Alert('Data updates successful', 'success');
          this.AlertMessage('データが更新されました', 'success');
        })
        .catch(function (error: any) {
          // this.Alert(error.message,'success');
        });
    } else {
      firebaseService.storage().ref()
        .child(`CompanyLogo/${this.state.company.CompanyId}_${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}_${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
        .put(this.state.newCompanyLogo).then((snapshot) => {

          // console.log(firebaseService.storage().ref().child(snapshot.metadata.fullPath).getDownloadURL());
          firebaseService.storage().ref().child(snapshot.metadata.fullPath).getDownloadURL().then(url => {
            // console.log(url);
            this.setState({ company: { ...this.state.company, CompanyLogo: url } });
            this.setState({ currentCompanyLogoURL: url });
            this.setState({ newCompanyLogoURL: '' });
            console.log('from storage', this.state.company);
            console.log(this.state.currentCompanyLogoURL);
          }).then(() => {

            firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
              .set(
                { ...this.state.company }
              )
              .then(() => {
                // this.Alert('Data updates successful', 'success');
                this.AlertMessage('データが更新されました', 'success');
              })
              .catch(function (error: any) {
                // this.Alert(error.message,'success');
              });
          });
        })
    }
  }
  jobPostHandleChange = (e: any, propName: any, index: any) => {
    const { value } = e.target;
    this.setState({
      jobPostings: this.state.jobPostings
        .map((item: any, j: any) => j === index ? ({ ...item, [propName]: value }) : item),
    });
  }
  startJobPostEditing = (index: any) => {
    this.setState({ jobPostEditIDX: index });
  }
  stopJobPostEditing = (index: any) => {
    this.setState({ jobPostEditIDX: -1 });
    // console.log(this.state.jobPostings);
    firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
      .update({
        JobPostings: this.state.jobPostings,
      })
      .then(() => {
        // this.Alert('Data updates successful', 'success');
        this.AlertMessage('Data updated successfully', 'success');
      })
      .catch(function (error: any) {
        // this.Alert(error.message,'success');
      });

  }
  handleEditJobPostings = (index: any) => {
    this.state.jobPostEditIDX === index;

  }
  deleteJobPostingPressed = (index: any) => {
    swal({
      // title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this Job Posting",
      // icon: "warning",
      title: "削除してもよろしいですか？",
      text: "一旦募集を削除すると、元に戻すことはできません",
      icon: "warning",
      // buttons: true,
      dangerMode: true,
    })
      .then((willDelete: any) => {
        if (willDelete) {
          this.handleDeleteJobPostings(index);
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
  }
  handleDeleteJobPostings = (index: any) => {
    this.setState({
      jobPostings: this.state.jobPostings.filter((job: any, jobindex: any) => jobindex != index),
    });
    const _company = this.state.company;
    _company.JobPostings = this.state.jobPostings;

    this.setState({
      company: _company
    });

    firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
      .update({
        JobPostings: this.state.jobPostings.filter((job: any, i: any) => i != index),
      })
      .then(() => {
        // alert('Data deleted')
        this.AlertMessage('募集を削除しました', 'success');
      })
      .catch(function (error) {
        console.error("Error removing job post: ", error);
      });
  }

  deleteShortlistedCandidatePressed = (index: any) => {
    swal({
      // title: "Are you sure you want to remove this person from the Shortlist?",
      text: "この候補者をリストから削除してもよろしいですか？",
      icon: "warning",
      buttons: ['Cancel' , 'Ok'],
      dangerMode: true,
    })
      .then((willDelete: any) => {
        if (willDelete) {
          this.handleDeleteShortlistedCandidate(index);
          
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
  }
  handleDeleteShortlistedCandidate = (index: any) => {
    var _shortListedList = [...this.state.shortListedList];
    var updatedShortlist = _shortListedList.filter((candidate: any, candidateindex: any) => candidateindex != index);

    let updatedCandidateEmailList: any = [];
    updatedShortlist.map((candidate: any) => {
      updatedCandidateEmailList.push(candidate.id);
    })

    this.setState({
      shortListedList: updatedShortlist
    });
    firebaseService.firestore().collection('CompanyInfo').doc(this.state.company.CompanyId)
      .update({
        ShortListedCandidates: updatedCandidateEmailList,
      })
      .then(() => {
        // alert('Data deleted')
        swal("この候補者をリストから削除しました", {
          icon: "success",
        });
      })
      .catch(function (error) {
        console.error("Error removing shortlistd candidate: ", error);
      });
  }
  componentWillMount() {
    firebaseService.firestore().collection('CompanyInfo').where("CompanyId", "==", this.props.companyDetails.CompanyId).get()
      .then((querySnapshot) => {
        querySnapshot.forEach(
          (doc) => {
            this.setState({currentCompanyLogoURL: doc.data().CompanyLogo})
            this.setState({ company: doc.data() });
            this.setState({Subscription: this.state.company.SubscriptionDetails});
            // console.log(this.state.Subscription);
            //Prepare shortListed candidates
            if(doc.data().ShortListedCandidates.length>0)
            {
            let candidateIdArray: any = [];
            doc.data().ShortListedCandidates.map((candidate: any) => {
              // console.log(candidate);
              firebaseService.firestore().collection('CandidateInfo').where("id", "==", candidate).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach(
                    (doc) => {
                      candidateIdArray.push(doc.data());
                    }
                  );
                  this.setState({ shortListedList: candidateIdArray });
                }
                );
              });
            }

            //Prepare Job postings
            if(doc.data().JobPostings.length>0)
            {
              let jobPostingArray: any = [];
              doc.data().JobPostings.map((job: any) => {
                // console.log(job);
                jobPostingArray.push(job);
              });
              this.setState({ jobPostings: jobPostingArray });
            }
          });
      })
      .then(()=>{          
        this.setState({loading: false});
    });

  }

  contactForPlanChange=(action:string)=>{
    var value= this.state.company.MemberEmail;
    swal("ありがとうございます", `${value} にメールをお送りいたします`, "success");

    var monitorData={
      email:this.state.company.MemberEmail,
      CompanyName:this.state.company.CompanyName,
      MemberName: this.state.company.MemberName,
      CompanyId: sessionStorage.getItem("userID"),
      CurrentPlan: this.state.company.SubscriptionDetails,
      RequestedAction: action,
      Date: new Date()
    }
    firebaseService.firestore().collection("ActivityMonitor").doc("SubscriptionEnquiry")
                .update({
                  Subscription: firebaseService.firestore.FieldValue.arrayUnion(monitorData)
                });

  }
  public goToHomePage = () => {
    this.props.history.push('/HomePage');
  }

  render() {
    return (
      <div className="">
        {/* <DashBoardHeader /> */}
        <DashBoardHeader companyName={this.props.companyDetails.CompanyName} />
        {this.state.loading?
                <div className="loader"></div>
          :null
        }
        <div className="row ">
          <div className="col-lg-3 leftNavigation">
            <div
              className="nav nav-pills flex-column"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <span className="menubarHeading">管理</span>
              <a
                className="nav-link active dashboardNavIcon navBarButton"
                id="tab_a-tab"
                href="#tab_a"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_a"
                aria-selected="true"
              >
                <div className="row">
                  <div className="">
                    <i className="material-icons ">business_center</i>
                  </div>
                  <div className="col-lg-8 navBarText">募集</div>
                </div>
              </a>
              <a
                className="nav-link dashboardNavIcon navBarButton"
                id="tab_b-tab"
                href="#tab_b"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_b"
                aria-selected="false"
              >
                <div className="row">
                  <div className="">
                    <i className="material-icons">how_to_reg</i>
                  </div>
                  <div className="col-lg-10 navBarText">候補者</div>
                </div>
              </a>
              <span className="menubarHeading">アカウント情報</span>
              <a
                className="nav-link dashboardNavIcon navBarButton"
                id="tab_c-tab"
                href="#tab_c"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_c"
                aria-selected="false"
              >
                <div className="row">
                  <div className="">
                    <i className="material-icons ">business</i>
                  </div>
                  <div className="col-lg-10 navBarText">会社情報</div>
                </div>
              </a>
              <a
                className="nav-link dashboardNavIcon navBarButton"
                id="tab_d-tab"
                href="#tab_d"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_d"
                aria-selected="false"
              >
                <div className="row">
                  <div className="">
                    <i className="material-icons ">person</i>
                  </div>
                  <div className="col-lg-9 navBarText">担当者アカウント</div>
                </div>
              </a>
              <span className="menubarHeading">現在ご利用中のプラン</span>
              <h6>{this.state.Subscription.PlanName}</h6>
              {/* <h6 className="planExpiryDate">有効期限 2019/05/31</h6> */}
              <h6 className="planExpiryDate">有効期限 {this.state.Subscription.EndDate}</h6>

              <div className="row">
                <div className="">
                  <button
                    type="button"
                    className="col-lg-12 btn btn-outline-info btn-block planButton"
                    onClick={()=>{this.contactForPlanChange("Want to renew plan.")}}
                  >
                    {/* Renew Plan */}
                    プランの更新
                  </button>
                  <button
                    type="button"
                    className="col-lg-12 btn btn-outline-info btn-block planButton"
                    onClick={()=>{this.contactForPlanChange("Wnat to change plan.")}}
                    >
                    {/* Change Plan */}
                    プランをアップグレード
                  </button>
                </div>
              </div>
              <div>
                <br />
                <hr />
              </div>
              <span className="menubarHeading">お問い合わせ</span>
              <a className=" navBarContactUs" href="https://willings.co.jp/contact" target="_blank">メールでのお問い合わせ</a>
              <br />
              <div className="row">
                <button type="button" className="btn btn-link navBarButton" onClick={this.logout}>
                  {/* Log Out */}
                  ログアウト
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab_a" role="tabpanel" aria-labelledby="tab_a-tab">
                {this.state.jobPostings.length > 0 ?
                  <div>
                    <div className="row">
                      <div className="col-lg-3">
                        <h4 className="companyProfileHeader">Job Postings</h4>
                      </div>
                      <div className="col-lg-6"></div>
                      <div className="col-lg-1 align-items-end">
                        <button className="btn btn-info btn-sm companyProfileHeader " data-toggle="modal" data-target="#modalJobPosting" >
                          {/* Add a new job posting */}
                          募集を開始
                        </button>
                        <div id="modalJobPosting" className="modal fade" role="dialog">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              {/* <div className="flex-row">
                              <button type="button" className="close " data-dismiss="modal">&times;</button>
                            </div> */}
                              <div className="close">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Job Title */}
                                      職種
                                    </strong></small></label>
                                    <input type="text" onChange={e => this.onchangeNewJob(e)}
                                      className="form-control" name="JobProfile" id="JobProfile"
                                      placeholder="Example: Software Engineer" required/>
                                  </div>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Category */}
                                      採用目的
                                    </strong></small></label>
                                    <input type="text" onChange={e => this.onchangeNewJob(e)}
                                      className="form-control" name="JobCategory" id="JobCategory"
                                      placeholder="Example: Fulltime" required/>
                                  </div>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Location */}
                                      所在地
                                    </strong></small></label>
                                    <input type="text" onChange={e => this.onchangeNewJob(e)}
                                      className="form-control" name="Location" id="Location"
                                      placeholder="Example: Tokyo,Japan" required/>
                                  </div>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Description */}
                                      業務内容
                                    </strong></small></label>
                                    <textarea onChange={e => this.onchangeNewJob(e)}
                                      className="form-control"
                                      name="Description" id="Description" rows={3}
                                      placeholder=""
                                      required
                                    ></textarea>
                                  </div>
                                  <button className="btn btn-success" onClick={this.saveNewJobPost} type="button" data-dismiss="modal">
                                    {/* Save */}
                                    保存
                                  </button>
                                </form>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <hr />
                    <div className="col-lg-12">
                      {this.state.jobPostings.map((job: any, index: any) =>
                        (
                          <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-12">
                              <div className="post-content col-lg-12" key={index}>
                                <div className="panel panel-default">
                                  <div className="panel-body ">
                                    <div className="row">
                                      <div className="pull-left col-lg-1">
                                        <img
                                          className="media-object img-circle postingLogo pull-left"
                                          // src={this.state.company.CompanyLogo}
                                          src='https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/CompanyLogo%2Foffice-logo.png?alt=media&token=3794b07e-b8d9-498e-88db-9d57ab2843cc'

                                          alt="office"
                                        />
                                      </div>
                                      <div className="col-lg-9">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <h6>
                                              {this.state.jobPostEditIDX === index ?
                                                <div className="input-group-sm col-lg-4">
                                                  <input type="text" className="form-control editJobInputText" name="JobProfile" value={job.JobProfile} onChange={(e: any) => { this.jobPostHandleChange(e, "JobProfile", index) }} />
                                                </div>
                                                : <strong className="jobTitle">{job.JobProfile}</strong>
                                              }
                                            </h6>
                                          </div>
                                          <div className="col-lg-12">
                                            {this.state.jobPostEditIDX === index ?
                                              <div className="input-group-sm col-lg-4">
                                                <input className="form-control editJobInputText" type="text" name="JobCategory"
                                                  value={job.JobCategory}
                                                  onChange={(e: any) => { this.jobPostHandleChange(e, "JobCategory", index) }} />
                                              </div>
                                              :
                                              <small>
                                                <small className="jobCategory">
                                                  <i aria-hidden="true" /> {job.JobCategory}
                                                </small>
                                              </small>}
                                          </div>
                                          <div className="col-lg-12">
                                            {this.state.jobPostEditIDX === index ?
                                              <div className="input-group-sm col-lg-4">
                                                <input className="form-control editJobInputText" type="text" name="Location"
                                                  value={job.Location}
                                                  onChange={(e: any) => { this.jobPostHandleChange(e, "Location", index) }} />
                                              </div>
                                              : <div className="jobCategory">
                                                <i className="material-icons postinglocationicon jobPostingLocation">place</i>
                                                <small className=""> {job.Location}</small>
                                              </div>
                                            }
                                          </div>

                                        </div>
                                      </div>
                                      <div className="col-lg-2">
                                        <div className="btn btn-group">
                                          <div className="btn btn-link" >
                                            {this.state.jobPostEditIDX === index ?
                                              <i className="material-icons text-success" onClick={() => this.stopJobPostEditing(index)}>done</i>
                                              : <i className="material-icons jobPostingEditIcon" onClick={() => this.startJobPostEditing(index)}>edit</i>
                                            }
                                          </div>
                                          <div className="btn btn-link" onClick={() => this.deleteJobPostingPressed(index)}>
                                            {this.state.jobPostEditIDX === index ?
                                              <div></div> :
                                              <i className="material-icons jobPostingEditIcon">delete_outline</i>
                                            }

                                          </div>
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="col-lg-12">
                                        <hr />
                                        <div className="post-content-body col-lg-12">
                                          {this.state.jobPostEditIDX === index ?
                                            <div className="col-lg-12">
                                              <textarea className="col-lg-12 form-control" rows={3} name="Description"
                                                value={job.Description}
                                                onChange={(e: any) => { this.jobPostHandleChange(e, "Description", index) }} />
                                            </div>
                                            :
                                            <p className="jobDescription">{job.Description}</p>}

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1"></div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  :
                  <div>
                  <div>
                    <div className="noItemIcon">
                      <img src={noItemIcon} alt="noItemIcon" className="noItemIcon" />
                    </div>
                    <div className="noJobTitle">
                      <p>
                        {/* No Job Posting Founds! */}
                        現在募集はありません。
                    </p>
                    </div>
                    <div className="noJobDescription">
                      <p>
                        {/* You have not posted any jobs yet. Start adding jobs to get start hiring! */}
                        まだ募集が掲載されていません。今すぐ募集を開始しましょう！
                    </p>
                    </div>
                      <div className="row">
                      <div className="col noJobButtonSection">
                        <button className=" btn btn-info btn-block noJobButton" data-toggle="modal" data-target="#modalJobPosting" >
                          {/* Add a new job posting */}
                          募集を開始
                      </button>
                      </div>
                        <div id="modalJobPosting" className="modal fade" role="dialog">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              {/* <div className="flex-row">
                              <button type="button" className="close " data-dismiss="modal">&times;</button>
                            </div> */}
                              <div className="close">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Job Title */}
                                      職種
                                    </strong></small></label>
                                    <input type="text" onChange={e => this.onchangeNewJob(e)}
                                      className="form-control" name="JobProfile" id="JobProfile"
                                      placeholder="Example: Software Engineer" />
                                  </div>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Category */}
                                      採用目的
                                    </strong></small></label>
                                    <input type="text" onChange={e => this.onchangeNewJob(e)}
                                      className="form-control" name="JobCategory" id="JobCategory"
                                      placeholder="Example: Fulltime" />
                                  </div>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Location */}
                                      所在地
                                    </strong></small></label>
                                    <input type="text" onChange={e => this.onchangeNewJob(e)}
                                      className="form-control" name="Location" id="Location"
                                      placeholder="Example: Tokyo,Japan" />
                                  </div>
                                  <div className="form-group input-group-sm">
                                    <label ><small><strong>
                                      {/* Description */}
                                      業務内容
                                    </strong></small></label>
                                    <textarea onChange={e => this.onchangeNewJob(e)}
                                      className="form-control"
                                      name="Description" id="Description" rows={3}
                                      placeholder=""
                                    ></textarea>
                                  </div>
                                  <button className="btn btn-success" onClick={this.saveNewJobPost} type="button" data-dismiss="modal">
                                    {/* Save */}
                                    保存
                                  </button>
                                </form>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                }
              </div>


              <div className="tab-pane fade show " id="tab_b" role="tabpanel" aria-labelledby="tab_b-tab">
                {this.state.shortListedList.length > 0 ?
                  <div >
                    <div className="row">

                      <div className="col-lg-4">
                        <h4 className="companyProfileHeader">
                        {/* Shortlisted Candidates */}
                        候補者
                        </h4>
                      </div>
                      <div className="col-lg-6"></div>
                      <div className="col-lg-1 align-items-end">
                        <button className="btn btn-info btn-sm companyProfileHeader " onClick={this.goToHomePage} >
                          {/* Start Exploring */}
                          もっと候補者を探す
                      </button>
                      </div>

                    </div>
                    <div className="border">
                      <table className="table table-hover table-table-bordered">
                        <thead>
                          <tr>
                            <th scope="col" >
                            <a className="shortlistTableName">氏名</a>
                            </th>
                            <th scope="col">職種</th>
                            <th scope="col">ステータス</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.shortListedList.map((candidate: any, index: any) =>
                            (
                              <tr>
                                <td className="tdCandidateName">
                                    <div className="profileCard">
                                      <div className="profileCard-profileImage">
                                          <img src={candidate.img} alt="Avatar"/>
                                      </div>
                                      <div className="profileCard-details">
                                        <div className="profileCard-details__name">
                                          <a>{candidate.name}</a>
                                        </div>
                                        <div className="profileCard-details__location">
                                          <i className="material-icons iconLocation">place</i>
                                          {candidate.place}
                                        </div>
                                        <div className="profileCard-details__skills">
                                        {candidate.skills.map((skill: any) => (
                                            <a>{skill}</a>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  {/* </div> */}
                                </td>
                                <td className="tdCandidateJobTitle">
                                  <div className="shortListedJobProfile">
                                    <strong>{candidate.JobProfile}</strong>

                                  </div>
                                </td>
                                <td className="tdCandidateShortlisted">
                                  <button className="btn btn-outline-info shortListedAction" onClick={() => this.deleteShortlistedCandidatePressed(index)}>
                                    <div className="row shortlistButton">
                                      <i className=" material-icons text-info doneIcon" >done</i>                                     
                                      <span className="col">
                                      {/* Shortlisted */}
                                      候補者
                                      </span>
                                    </div>
                                  </button>
                                  <button className="btn btn-info viewDetails" onClick={() => this.onCandidateDetailsClicked(candidate)}>
                                    <div className="row shortlistButton">
                                      {/* <i className=" material-icons text-info doneIcon" >done</i>                                      */}
                                      <span className="col">
                                      View Profile
                                      </span>
                                    </div>
                                  </button>
                                </td>
                              </tr>
                            ))}

                        </tbody>
                      </table>
                      <Modal
          isOpen={this.state.showCandidateDetails}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.handleClose}
          style={customStyles}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          <div className="close">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <br />
          <br />
          <CandidateDetails
            candidate={this.state.currentCandidate}
            shortListed={this.state.currentCandidateShortlisted}
            interviewRequested={this.state.currentCandidateInterviewlisted}
          />
        </Modal>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="noItemIcon">
                      <img src={noItemIcon} alt="noItemIcon" className="noItemIcon" />
                    </div>
                    <div className="noJobTitle">
                      <p>
                        {/* You have not shortlisted any candidates yet! */}
                        現在候補者はいません。
                  </p>
                    </div>
                    <div className="noJobDescription">
                      <p>
                        {/* Start shortlisting candidates */}
                        今すぐ候補者探しを開始しましょう！
                  </p>
                    </div>
                    <button
                      type="button"
                      className="col-lg-12 btn btn-info btn-block noJobButton"
                      onClick={this.goToHomePage}
                    >
                      {/* Start Exploring */}
                      検索をはじめる
                  </button>
                  </div>

                }

              </div>
              <div className="tab-pane fade show" id="tab_c" role="tabpanel" aria-labelledby="tab_c-tab">
                <div className="row">
                  <div className="col companyProfileHeaderTitle">
                    <h5>会社情報</h5>
                  </div>
                  {this.state.companyProfileDisable ?
                    <div className="col companyProfileHeader">
                      <button className="btn btn-sm btn-info editButton companyProfileEditButton" onClick={() => { this.companyProfileEdit() }}>
                        {/* Edit Company Profile */}
                        会社情報を編集する
                      </button>
                    </div>
                    :
                    null
                  }

                </div>
                <hr />

                <div className="col-lg-7">
                  {this.state.companyProfileDisable ?
                    <div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Company Name */}
                          会社名
                                            </strong></small></label>
                        <div className="companyDetails">{this.state.company.CompanyName}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Company Description */}
                          会社紹介
                          </strong></small></label>
                        <div className="companyDetails">{this.state.company.CompanyDescription}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* What we do */}
                          事業内容
                          </strong></small></label>
                        <div className="companyDetails">{this.state.company.WhatWeDo}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Website */}
                          ウェブサイト
                          </strong></small></label>
                        <div className="companyDetails">{this.state.company.Website}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Address */}
                          アドレス
                          </strong></small></label>
                        <div className="companyDetails">{this.state.company.Address}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          創業者
                          {/* Founder */}
                        </strong></small></label>
                        <div className="companyDetails">{this.state.company.Founder}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Company Size */}
                          従業員数
                          </strong></small></label>
                        <div className="companyDetails">{this.state.company.TotalEmployee}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Industry */}
                          業界
                          </strong></small></label>
                        <div className="companyDetails">{this.state.company.Industry}</div>
                      </div>
                      <div className="form-group">
                        <label className="companyDetailsTitle"><small><strong>
                          {/* Logo */}
                          会社ロゴ
                          </strong></small>
                        </label>
                          <div>
                            <div className="dashborad-img-companyLogo">
                              <div>
                                <span>Current logo</span>
                              </div>
                              <div className="img-box-currentLogo">
                              {this.state.currentCompanyLogoURL.length>0?
                                <img src={this.state.currentCompanyLogoURL}></img>
                                :<img src="https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/CompanyLogo%2Foffice-logo.png?alt=media&token=3794b07e-b8d9-498e-88db-9d57ab2843cc"></img>
                              }
                              </div>
                            </div>

                           
                          </div>
                      </div>
                    </div>
                    :
                    <form>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Company Name */}
                          会社名
                          </strong></small></label>
                        <input type="text" disabled={this.state.companyProfileDisable} value={this.state.company.CompanyName} className="form-control" name="CompanyName" id="CompanyName" placeholder="Company Name" onChange={this.handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Company Description */}
                          会社紹介
                          </strong></small></label>
                        <textarea onChange={this.handleInputChange} value={this.state.company.CompanyDescription} className="form-control" name="CompanyDescription" id="CompanyDescription" rows={3} placeholder="例）私たちの会社は、現在インド工科大学のインターンシップサービス、日本で就業する外国籍の方へのカウンセリングサービスを主な事業としています。 日本企業が国籍にとらわれず人材を採用し、その人材の戦力化をサポートすることによって、世界に誇る日本社会の創造に貢献しています。"></textarea>
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* What we do */}
                          事業内容
                          </strong></small></label>
                        <textarea onChange={this.handleInputChange} value={this.state.company.WhatWeDo} className="form-control" name="WhatWeDo" id="WhatWeDo" rows={3} placeholder="例）現GoogleのCEOを輩出した理系大国インドの最高峰に位置する「インド工科大学」。この大学に在籍する学生を、インターンシップ経由で採用出来るサービスを運営しています。"></textarea>
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Website */}
                          ウェブサイト
                          </strong></small></label>
                        <input onChange={this.handleInputChange} type="text" value={this.state.company.Website} className="form-control" name="Website" id="Website" placeholder="例）https://willings.co.jp/" />
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Address */}
                          アドレス
                          </strong></small></label>
                        <input onChange={this.handleInputChange} type="text" value={this.state.company.Address} className="form-control" name="Address" id="Address" placeholder="例）〒103-0013 東京都中央区日本橋人形町3-3-5" />
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Founder */}
                          創業者
                          </strong></small></label>
                        <input onChange={this.handleInputChange} type="text" value={this.state.company.Founder} className="form-control" name="Founder" id="Founder" placeholder="Example: Tim Bezoz" />
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Company Size */}
                          従業員数
                          </strong></small></label>
                        <input onChange={this.handleInputChange} type="text" value={this.state.company.TotalEmployee} className="form-control" name="TotalEmployee" id="TotalEmployee" placeholder="例）10名" />
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          {/* Industry */}
                          業界
                          </strong></small></label>
                        <input onChange={this.handleInputChange} value={this.state.company.Industry} type="text" className="form-control" name="Industry" id="Industry" placeholder="例）IT・人材紹介事業" />
                      </div>
                      <div className="form-group">
                        <label ><small><strong>
                          Logo
                          {/* 会社ロゴ */}
                          </strong></small>
                        </label>
                        <div>
                            <div className="dashborad-img-companyLogo">
                              <div>
                                <span>Current logo</span>
                              </div>
                              <div className="img-box-currentLogo">
                              {this.state.currentCompanyLogoURL.length>0?
                                <img src={this.state.currentCompanyLogoURL}></img>
                                :<img src="https://firebasestorage.googleapis.com/v0/b/onetrowebapiservice.appspot.com/o/CompanyLogo%2Foffice-logo.png?alt=media&token=3794b07e-b8d9-498e-88db-9d57ab2843cc"></img>
                              }
                              </div>
                            </div>

                            <div className="dashborad-img-editCompanyLogo">
                            <div className="upload-btn-wrapper">
                              <button className="btnUpload">Upload new logo</button>
                              <input type="file" name="newCompanyLogo" onChange={e=>{this.handleNewLogoUpload(e)}}/>
                            </div>
                              <div className="img-box-newLogo">
                              {this.state.newCompanyLogoURL.length>0?
                                <img src={this.state.newCompanyLogoURL}></img>
                                :<img src="https://via.placeholder.com/100"></img>
                              }
                              </div>
                              
                            </div>
                          </div>
                      </div>
                    </form>
                  }
                  {this.state.companyProfileDisable ?
                    null
                    :
                    <div className="companyProfileHeader">
                      <button className="btn btn-info editButton companyProfileSaveButton" onClick={() => { this.companyProfileSave() }}>
                        {/* Save Changes */}
                        保存する
                      </button>
                    </div>
                  }
                </div>

              </div>
              <div className="tab-pane fade show" id="tab_d" role="tabpanel" aria-labelledby="tab_c-tab">
                <div>
                  <div className="row">
                    <div className="col companyProfileHeaderTitle">
                      <h5>My Account</h5>
                    </div>
                    {this.state.memberAccountDisable ?
                      <div className="col companyProfileHeader">
                        <button className="btn btn-sm btn-info editButton companyProfileEditButton" onClick={() => { this.memberAccountEdit() }}>
                          {/* Edit User Profile */}
                          担当者アカウントを編集する
                        </button>
                      </div>
                      :
                      null
                    }
                  </div>
                </div>
                <hr />
                <div className="col-lg-7">
                  <form>
                    {/* <div className="form-group">
                      <label ><small><strong>
                        Current Password
                          </strong></small></label>
                      <input type="password" disabled={true}
                        value="******"
                        className="form-control" name="companyPassword" id="companyPassword"
                        placeholder="" />
                    </div>
                    <div className="form-group">
                      <label ><small><strong>
                        New Password
                          </strong></small></label>
                      <input type="password" disabled={true}
                        value=""

                        className="form-control" name="companyNewPassword" id="companyNewPassword"
                        placeholder="Enter new password" />
                    </div>
                    <div className="form-group">
                      <label ><small><strong>
                        Re-enter new Password
                          </strong></small></label>
                      <input type="password" disabled={true}
                        value=""

                        className="form-control" name="companyReenterNewPassword" id="companyReenterNewPassword"
                        placeholder="re-enter new password" />
                    </div> */}

                    <div className="form-group">
                      <label ><small><strong>
                        {/* Member's name handing this account */}
                        担当者氏名
                          </strong></small></label>
                      <input type="text" disabled={this.state.memberAccountDisable}
                        value={this.state.company.MemberName}
                        onChange={this.handleInputChange}
                        className="form-control" name="MemberName" id="MemberName"
                        placeholder="" />
                    </div>
                    <div className="form-group">
                      <label ><small><strong>
                        {/* Member's E-mail */}
                        担当者メールアドレス
                          </strong></small></label>
                      <input type="text" disabled={this.state.memberAccountDisable}
                        value={this.state.company.MemberEmail}
                        onChange={this.handleInputChange}
                        className="form-control" name="MemberEmail" id="MemberEmail"
                        placeholder="example@example.com" />
                    </div>
                    {/* <div className="form-group">
                      <label ><small><strong>
                        Member's phone number
                          </strong></small></label>
                      <input type="text" disabled={this.state.memberAccountDisable}
                        value={this.state.company.MemberPhone}
                        onChange={this.handleInputChange}
                        className="form-control" name="MemberPhone" id="MemberPhone"
                        placeholder="Member's phone number" />
                    </div>
                    <div className="form-group">
                      <label ><small><strong>
                        Company E-mail
                          </strong></small></label>
                      <input type="text" disabled={this.state.memberAccountDisable}
                        value={this.state.company.CompanyEmail}
                        onChange={this.handleInputChange}
                        className="form-control" name="CompanyEmail" id="CompanyEmail"
                        placeholder="example@example.com" />
                    </div>
                    <div className="form-group">
                      <label ><small><strong>
                        Company phone number
                          </strong></small></label>
                      <input type="text" disabled={this.state.memberAccountDisable}
                        value={this.state.company.CompanyPhoneNumber}
                        onChange={this.handleInputChange}
                        className="form-control" name="CompanyPhoneNumber" id="CompanyPhoneNumber"
                        placeholder="Company phone number" />
                    </div> */}
                  </form>
                  {this.state.memberAccountDisable ?
                    null
                    :
                    <div className="companyProfileHeader">
                      <button className="btn btn-info editButton companyProfileSaveButton" onClick={() => { this.memberAccountSave() }}>Save Changes</button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </div>

    );
  }
}

export default withRouter(DashBoard);
