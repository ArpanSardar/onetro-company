import React, { Component } from "react";

import "./style.css";
import "../AllPosition/CandidateList/CandidateListOnSearch.css";
import { FavoriteOutlined, FavoriteBorderOutlined } from "@material-ui/icons";

import GridList from "@material-ui/core/GridList";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "react-modal";

import CandidateDetails from "../CandidateDetails/CandidateDetails";
import { firebaseService } from "../../../../services/FirebaseService";

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
interface IProps {
  list: any;
  companyDetails: any;
}

interface IDispProps {}

interface IState {
  items: any;
  pageNo: number;
  showCandidateDetails: boolean;
  currentCandidate: any;
  currentCandidateShortlisted: boolean;
  currentCandidateInterviewlisted: boolean;
}

const videoPerPage = 6;

class ExpandableList extends React.Component<
  IProps & RouteComponentProps,
  IState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: this.props.list.slice(0, 6),
      pageNo: 1,
      showCandidateDetails: false,
      currentCandidate: "",
      currentCandidateShortlisted: false,
      currentCandidateInterviewlisted: false
    };
  }

  handleDislike = (candidateId: any) => {
    var candidateList = this.state.items;
    var newArray: any = [];

    var candidateSocialLikestoUpdate: any = [];
    candidateList.map((candidate: any) => {
      if (candidate.id == candidateId) {
        candidate.SocialLikes = candidate.SocialLikes.filter(
          (companyId: any) => {
            return companyId != sessionStorage.getItem("userID");
          }
        );
        candidateSocialLikestoUpdate = candidate.SocialLikes;
      }
      newArray.push(candidate);
    });
    this.setState({ items: newArray });

    firebaseService
      .firestore()
      .collection("CandidateInfo")
      .doc(candidateId)
      .update({
        SocialLikes: candidateSocialLikestoUpdate
      });
  };

  handleLike = (candidateId: any) => {
    var candidateList = this.state.items;
    var newArray: any = [];

    var candidateSocialLikestoUpdate: any = [];
    candidateList.map((candidate: any) => {
      if (candidate.id == candidateId) {
        candidate.SocialLikes.push(sessionStorage.getItem("userID"));
        candidateSocialLikestoUpdate = candidate.SocialLikes;
      }

      newArray.push(candidate);
    });
    this.setState({ items: newArray });

    firebaseService
      .firestore()
      .collection("CandidateInfo")
      .doc(candidateId)
      .update({
        SocialLikes: candidateSocialLikestoUpdate
      });
  };
  onCandidateDetailsClicked = (candidate: any) => {
    function checkexist(id: any) {
      return id == candidate.id;
    }
    if (this.props.companyDetails) {
      const shortlistedIndex = this.props.companyDetails.ShortListedCandidates.findIndex(
        checkexist
      );
      const interviewRequestedIndex = this.props.companyDetails.InterviewRequestedCandidates.findIndex(
        checkexist
      );
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

  componentDidUpdate(prevProps: any) {
    if (prevProps.list !== this.props.list) {
      this.setState({
        items: this.props.list.slice(0, 6)
      });
    }
  }

  render() {
    return (
      <div className="expandListContainer">
        <GridList cellHeight={300} className="gridList">
          {this.state.items.map((tile: any) => (
            <div
              key={tile.id}
              className="col-lg-2 col-md-3 col-sm-4 col-xs-12 profile"
            >
              <div
                className="img-box"
                onClick={() => this.onCandidateDetailsClicked(tile)}
              >
                <img
                  src={tile.img}
                  className="img-responsive profilePhoto "
                  height="20"
                  width="40"
                />
                <div className="text-block">
                  <i className="material-icons ">card_travel</i>
                  <span className="label">{tile.experience}</span>
                </div>
                {/* <a className="checkmark" data-toggle="tooltip" data-placement="right" title="Shortlisted">
                  <div className="checkmark_circle"></div>
                  <div className="checkmark_stem"></div>
                  <div className="checkmark_kick"></div>
                </a> */}
              </div>
              <div className="searchTileDetails">
                <h1>{tile.name}</h1>
                <div className="searchTileLike">
                  {tile.SocialLikes.includes(
                    sessionStorage.getItem("userID")
                  ) ? (
                    <div
                      title="Like it"
                      onClick={() => this.handleDislike(tile.id)}
                      className="btnAlreadyLike btnAlreadyLike-counter"
                      data-count={
                        tile.SocialLikes.length > 0
                          ? tile.SocialLikes.length
                          : 0
                      }
                    >
                      {/* <a>&#x2764;</a> */}
                      <FavoriteOutlined id="likeButton" />
                    </div>
                  ) : (
                    <div
                      title="Like it"
                      onClick={() => this.handleLike(tile.id)}
                      className="btnLike btnLike-counter"
                      data-count={
                        tile.SocialLikes.length > 0
                          ? tile.SocialLikes.length
                          : 0
                      }
                    >
                      {/* <span>&#x2764;</span> */}
                      <FavoriteBorderOutlined id="likeButton" />
                    </div>
                  )}
                </div>
              </div>
              {tile.skills.map((skill: any) => (
                <span key={skill} className="badge badge-info skills">{skill}</span>
              ))}
              <br />
              <i className="material-icons Location locationIcon">place</i>
              <span className="Location"> {tile.place}</span>
            </div>
          ))}
        </GridList>
        <div className="expandButtonDiv">{this.renderButton()}</div>
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
    );
  }

  public renderButton() {
    if (this.state.pageNo > 1) {
      return (
        <div>
          <Button
            className="expandButton"
            variant="link"
            onClick={this.showLessPressed}
          >
            Show Less
          </Button>
          {this.state.pageNo * 6 <= this.props.list.length ? (
            <Button
              className="expandButton"
              variant="link"
              onClick={this.showMorePressed}
            >
              Show More
            </Button>
          ) : null}
        </div>
      );
    } else {
      return (
        <Button
          className="expandButton"
          variant="link"
          onClick={this.showMorePressed}
        >
          Show More
        </Button>
      );
    }
  }

  private handleClose = () => {
    this.setState({
      showCandidateDetails: false
    });
  };

  private showLessPressed = () => {
    this.setState({
      pageNo: 1,
      items: this.props.list.slice(0, 6)
    });
  };
  private showMorePressed = () => {
    const currentPageNo = this.state.pageNo;
    const newPageNo = currentPageNo + 2;
    const newIndex = newPageNo * videoPerPage;
    this.setState({
      pageNo: newPageNo,
      items: this.props.list.slice(0, newIndex)
    });
  };
}

export default withRouter(ExpandableList);
