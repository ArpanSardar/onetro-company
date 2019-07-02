import React from 'react';

import './style.css';

import accomodation from '../../../../assets/images/accomodation@3x.png';
import flight from '../../../../assets/images/flight@3x.png';
import visa from '../../../../assets/images/visa@3x.png';
import pickup from '../../../../assets/images/airportPickup@3x.png';
import commuteAssist from '../../../../assets/images/travelCommuteAssist@3x.png';
import residence from '../../../../assets/images/residence@3x.png';
import bankAccount from '../../../../assets/images/bankAccount@3x.png';
import benifitBackground from '../../../../assets/images/benifitsBackground@3x.png';
import { Parallax } from 'react-scroll-parallax';


const iconSize = '140px';

const Benefits = () => (
  <div className="backgroundBenifits">
    <div className="containerBenifits">
      <div className="row container40p">
        <div className="col s12 m6 center">
          <h3 className="benifitsTitle">採用から入社まで安心して全てお任せください</h3>
        </div>
      </div>
      <div className="row container40p">
        <div className="col s12 m6 center benifitHeadingTitle">
          {/* <a className=""> */}
          Onetroユーザーだけの特権！
          {/* </a> */}
        </div>
      </div>
      {/* <div className="containerBenifits"> */}
      <div className="row">
        <div className="col leftIcon ">
          <Parallax
            offsetXMax={-20}
            offsetXMin={20}
            slowerScrollRate
            className="benifitTop"
          >
            <img src={accomodation} alt="accomodation" className="benifitImage image rotateImage" height={iconSize} width={iconSize} />
          </Parallax>

          <div className="row container40p">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">住居手配</h3>
              {/* <h3 className="benifitFooterTitle ">Accommodation</h3> */}
            </div>
          </div>
        </div>
        <div className="col">
          <Parallax
            offsetXMax={-20}
            offsetXMin={20}
            slowerScrollRate
            className="benifitTop"
          >
            <img src={flight} className="benifitImage image rotateImage" alt="flight" height={iconSize} width={iconSize} />
          </Parallax>
          <div className="row container40p">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">航空券手配</h3>
              {/* <h3 className="benifitFooterTitle ">Flight tickets</h3> */}
            </div>
          </div>
        </div>
        <div className="col rightIcon">
          <Parallax
            offsetXMax={-20}
            offsetXMin={20}
            slowerScrollRate
            className="benifitTop"
          >
            <img src={visa} alt="visa" className="benifitImage image rotateImage" height={iconSize} width={iconSize} />
          </Parallax>
          <div className="row container40p">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">ビザ申請サポート</h3>
              {/* <h3 className="benifitFooterTitle ">Support</h3> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col benifitsRow">
          <Parallax
            offsetXMax={20}
            offsetXMin={-20}
            slowerScrollRate
            className="benifitBottom"
          >
            <img src={pickup} alt="pickup" className="benifitImage image rotateImage" height={iconSize} width={iconSize} />
          </Parallax>
          <div className="row container40p">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">空港出迎え</h3>
              {/* <h3 className="benifitFooterTitle ">the Airport</h3> */}
            </div>
          </div>
        </div>
        <div className="col benifitsRow">
          <Parallax
            offsetXMax={20}
            offsetXMin={-20}
            slowerScrollRate
            className="benifitBottom"
          >
            <img src={commuteAssist} className=" benifitImage image rotateImage" alt="commuteAssist" height={iconSize} width={iconSize} />
          </Parallax>
          <div className="row ">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">スマホ/SIMカード契約同行</h3>
              {/* <h3 className="benifitFooterTitle ">Phone Connection</h3> */}
            </div>
          </div>
        </div>
        <div className="col benifitsRow">
          <Parallax
            offsetXMax={20}
            offsetXMin={-20}
            slowerScrollRate
            className="benifitBottom"
          >
            <img src={residence} alt="residence" className="benifitImage image rotateImage" height={iconSize} width={iconSize} />
          </Parallax>
          <div className="row container10p">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">住民票登録</h3>
              {/* <h3 className="benifitFooterTitle ">registration</h3> */}
            </div>
          </div>
        </div>
        <div className="col benifitsRow">
          <Parallax
            offsetXMax={20}
            offsetXMin={-20}
            slowerScrollRate
            className="benifitBottom"
          >
            <img src={bankAccount} alt="bankAccount" className="benifitImage image rotateImage" height={iconSize} width={iconSize} />
          </Parallax>
          <div className="row container10p">
            <div className="col s12 m6 center">
              <h3 className="benifitFooterTitle ">銀行口座開設</h3>
              {/* <h3 className="benifitFooterTitle ">bank account</h3> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  </div>
);

export default Benefits;