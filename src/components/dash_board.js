import React from "react";

class DashBoard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 leftNavigation">
            <div
              className="nav nav-pills flex-column"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <span className="menubarHeading">Manage</span>
              <a
                className="nav-link active"
                id="tab_a-tab"
                href="#tab_a"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_a"
                aria-selected="true"
              >
                <div className="row">
                  <div className="col-lg-2">
                    <i className="material-icons">business_center</i>
                  </div>
                  <div className="col-lg-8">Job Posting</div>
                </div>
              </a>
              <a
                className="nav-link "
                id="tab_b-tab"
                href="#tab_b"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_b"
                aria-selected="false"
              >
                <div className="row">
                  <div className="col-lg-2">
                    <i className="material-icons">how_to_reg</i>
                  </div>
                  <div className="col-lg-10">Shortlisted Applicants</div>
                </div>
              </a>
              <span className="menubarHeading">Account Information</span>
              <a
                className="nav-link "
                id="tab_c-tab"
                href="#tab_c"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_c"
                aria-selected="false"
              >
                <div className="row">
                  <div className="col-lg-2">
                    <i className="material-icons ">business</i>
                  </div>
                  <div className="col-lg-10">Company Profile</div>
                </div>
              </a>
              <a
                className="nav-link "
                id="tab_d-tab"
                href="#tab_d"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_d"
                aria-selected="false"
              >
                <div className="row">
                  <div className="col-lg-2">
                    <i className="material-icons ">person</i>
                  </div>
                  <div className="col-lg-9">My Account</div>
                </div>
              </a>
              <span className="menubarHeading">Current Plan</span>
              <h6>Basic Plan</h6>
              <div className="row">
                <div className="col-lg-12">
                  <button
                    type="button"
                    className="col-lg-12 btn btn-outline-info btn-block"
                  >
                    Renew Plan
                  </button>
                  <button
                    type="button"
                    className="col-lg-12 btn btn-info btn-block"
                  >
                    Change Plan
                  </button>
                </div>
              </div>
              <div>
                <br />
                <hr />
              </div>
              <span className="menubarHeading">Contact Us</span>
              <a
                className="nav-link "
                id="tab_c-tab"
                href="#tab_c"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_c"
                aria-selected="false"
              >
                <div className="row">
                  <div className="col-lg-2">
                    <i className="material-icons ">contact_mail</i>
                  </div>
                  <div className="col-lg-8">Via Mail</div>
                </div>
              </a>
              <a
                className="nav-link "
                id="tab_d-tab"
                href="#tab_d"
                data-toggle="pill"
                role="tab"
                aria-controls="tab_d"
                aria-selected="false"
              >
                <div className="row">
                  <div className="col-lg-2">
                    <i className="material-icons ">contact_phone</i>
                  </div>
                  <div className="col-lg-8">Via Phone</div>
                </div>
              </a>
              <br />
              <div className="row">
                <button type="button" className="btn btn-link">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="tab_a"
                role="tabpanel"
                aria-labelledby="tab_a-tab"
              >
                <h4>Job Postings</h4>
                <hr />
                <div className="post-content">
                  <div className="panel panel-default">
                    <div className="panel-body col-lg-12">
                      <div className="row">
                        <div className="pull-left col-lg-1">
                          <img
                            className="media-object img-circle postingLogo pull-left"
                            src="https://diaspote.org/uploads/images/thumb_large_283df6397c4db3fe0344.png"
                          />
                        </div>
                        <div className="col-lg-9">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6>
                                <strong>UI/UX Designer</strong>
                              </h6>
                            </div>
                            <div className="col-lg-12">
                              <small>
                                <small>
                                  <i aria-hidden="true" /> Ofra Inc.
                                </small>
                              </small>
                            </div>
                            <div className="postinglocationtext">
                              <small> Kolkata, India</small>
                            </div>
                            <div>
                              <i className="material-icons postinglocationicon">
                                place
                              </i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="btn btn-group btn-link">
                            <a href="#" className="btn btn-link btn-sm">
                              Edit
                            </a>
                            <a href="#" className="btn btn-link btn-sm">
                              Delete
                            </a>
                          </div>
                        </div>
                        <hr />
                        <div className="col-lg-12">
                          <hr />
                          <div className="post-content-body">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Curabitur vel gravida metus, non ultrices
                              sapien. Morbi odio metus, dapibus non nibh id
                              amet. Lorem ipsum dolor sit amet, consectetur
                              adipiscing elit. Curabitur vel gravida metus, non
                              ultrices sapien. Morbi odio metus, dapibus non
                              nibh id amet.
                            </p>
                            <small>
                              <small>- Posted 4 days ago.</small>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-content">
                  <div className="panel panel-default">
                    <div className="panel-body col-lg-12">
                      <div className="row">
                        <div className="pull-left col-lg-1">
                          <img
                            className="media-object img-circle postingLogo pull-left"
                            src="https://diaspote.org/uploads/images/thumb_large_283df6397c4db3fe0344.png"
                          />
                        </div>
                        <div className="col-lg-9">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6>
                                <strong>FrontEnd Developer</strong>
                              </h6>
                            </div>
                            <div className="col-lg-12">
                              <small>
                                <small>
                                  <i aria-hidden="true" /> Ofra Inc.
                                </small>
                              </small>
                            </div>
                            <div className="postinglocationtext">
                              <small> Kolkata, India</small>
                            </div>
                            <div>
                              <i className="material-icons postinglocationicon">
                                place
                              </i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="btn btn-group btn-link">
                            <a href="#" className="btn btn-link btn-sm">
                              Edit
                            </a>
                            <a href="#" className="btn btn-link btn-sm">
                              Delete
                            </a>
                          </div>
                        </div>
                        <hr />
                        <div className="col-lg-12">
                          <hr />
                          <div className="post-content-body">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Curabitur vel gravida metus, non ultrices
                              sapien. Morbi odio metus, dapibus non nibh id
                              amet. Lorem ipsum dolor sit amet, consectetur
                              adipiscing elit. Curabitur vel gravida metus, non
                              ultrices sapien. Morbi odio metus, dapibus non
                              nibh id amet.
                            </p>
                            <small>
                              <small>- Posted 4 days ago.</small>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-content">
                  <div className="panel panel-default">
                    <div className="panel-body col-lg-12">
                      <div className="row">
                        <div className="pull-left col-lg-1">
                          <img
                            className="media-object img-circle postingLogo pull-left"
                            src="https://diaspote.org/uploads/images/thumb_large_283df6397c4db3fe0344.png"
                          />
                        </div>
                        <div className="col-lg-9">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6>
                                <strong>Software Developer</strong>
                              </h6>
                            </div>
                            <div className="col-lg-12">
                              <small>
                                <small>
                                  <i aria-hidden="true" /> Ofra Inc.
                                </small>
                              </small>
                            </div>
                            <div className="postinglocationtext">
                              <small> Kolkata, India</small>
                            </div>
                            <div>
                              <i className="material-icons postinglocationicon">
                                place
                              </i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="btn btn-group btn-link">
                            <a href="#" className="btn btn-link btn-sm">
                              Edit
                            </a>
                            <a href="#" className="btn btn-link btn-sm">
                              Delete
                            </a>
                          </div>
                        </div>
                        <hr />
                        <div className="col-lg-12">
                          <hr />
                          <div className="post-content-body">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Curabitur vel gravida metus, non ultrices
                              sapien. Morbi odio metus, dapibus non nibh id
                              amet. Lorem ipsum dolor sit amet, consectetur
                              adipiscing elit. Curabitur vel gravida metus, non
                              ultrices sapien. Morbi odio metus, dapibus non
                              nibh id amet.
                            </p>
                            <small>
                              <small>- Posted 4 days ago.</small>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show "
                id="tab_b"
                role="tabpanel"
                aria-labelledby="tab_b-tab"
              >
                <h4>Pane B</h4>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas.
                </p>
              </div>
              <div
                className="tab-pane fade show"
                id="tab_c"
                role="tabpanel"
                aria-labelledby="tab_c-tab"
              >
                <h4>Pane C</h4>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas.
                </p>
              </div>
              <div
                className="tab-pane fade show"
                id="tab_d"
                role="tabpanel"
                aria-labelledby="tab_c-tab"
              >
                <h4>Pane D</h4>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
