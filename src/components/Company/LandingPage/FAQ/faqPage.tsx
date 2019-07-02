import React from 'react';

import './style.css';

import lineSeperator from '../../../../assets/images/lineSeperator@3x.png';
import bulb from '../../../../assets/images/bulb.png';
import ExpandableView from './expansionPannel';

const FaqSection = () => (
  <div className="backgroundFaq">
    <div className="">
      <img src={bulb} alt="bulb" className="bulbImage" height="6%" width="10%"/>
      <h3 className="faqHeader">FAQ</h3>
      <h3 className="signFaq"></h3>
    </div>
    <div className="expandableView">
      <ExpandableView/>
    </div>
    <div className="footerSeperator">
      <img src={lineSeperator} alt="lineSeperator" className="image left iconInfo" height="100%" width="100%" />
    </div>
    
  </div>
);

export default FaqSection;