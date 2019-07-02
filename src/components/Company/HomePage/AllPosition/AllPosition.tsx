import React, { Component } from 'react';

import SingleLineGrid from './SingleListGrid';

import ExpandableList from '../CategoryBasedExpandableList/ExpandableList';


import './style.css';

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

interface IProps {
  list: any;
  companyDetails: any;
}

class AllPositionList extends Component<IProps> {
  
  render() {
    return (
      <div>
        <h1 className="homeSubHeader">All Positions</h1>
        
        <SingleLineGrid list={this.props.list} companyDetails={this.props.companyDetails}/>

        <hr className="separator"></hr>
        <h1 className="homeSubHeader">Software Engineer</h1>

        <ExpandableList list={this.props.list} companyDetails={this.props.companyDetails}/>

        <hr className="separator"></hr>

      </div>
    );
  }
}

export default AllPositionList;