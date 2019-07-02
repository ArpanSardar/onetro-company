import React from "react";

import "./style.css";
import background1 from "../../../../assets/images/background1@3x.png";
// import hire from '../../../../assets/images/hire@3x.png';
// import interview from '../../../../assets/images/interview@3x.png';
import video from "../../../../assets/images/video@3x.png";
import exploreBackground from "../../../../assets/images/Explore-Oval.png";
import explore from "../../../../assets/images/Explore.png";
import interviewBack from "../../../../assets/images/Interview-Oval.png";
import interview from "../../../../assets/images/support (1).png";
import hireBack from "../../../../assets/images/Hire-Oval.png";
import hire from "../../../../assets/images/Hire.png";

import { Parallax } from "react-scroll-parallax";

const sectionStyle = {
  backgroundImage: "url(" + { background1 } + ")"
};

const Process = () => (
  <div className="background">
    <div className="container">
      <div className="row">
        <div className="col ">
          <div className="parentProcess">
            <Parallax
              className="exploreBack"
              offsetYMax={30}
              offsetYMin={-70}
              slowerScrollRate
              tag="figure"
            >
              <img
                src={exploreBackground}
                className="exploreBack"
                height="200px"
                width="200px"
              />
              {/* <img src={video} alt="video" className="image left iconInfo" height="244px" width="338px" /> */}
            </Parallax>
            <Parallax
              className="explore"
              offsetYMax={0}
              offsetYMin={0}
              slowerScrollRate
              tag="figure"
            >
              <img src={explore} className="" height="160px" width="230px" />
            </Parallax>
          </div>
          <div className="row processContainer">
            <div className="col s12 m6 center">
              <h3 className="processHeading ">探す & 見る</h3>
            </div>
          </div>
          <div className="row containerDescription">
            <h3 className="processDescription">
              レジュメだけでは判断が難しい海外エンジニアの採用。1分間の動画には、レジュメ1200枚分と同じ情報量が含まれていると言われています。スキルや経験だけでなく、キャンディデイトをより深く把握することが可能です。
            </h3>
          </div>
        </div>
        <div className="col">
          {/* <Parallax
            className="custom-class"
            offsetYMax={25}
            offsetYMin={-25}
            slowerScrollRate
          >
            <img src={interview} className="image middle" alt="interview" height="250px" width="250px" />
          </Parallax> */}

          <Parallax
            className="exploreBack"
            offsetYMax={30}
            offsetYMin={-70}
            slowerScrollRate
          >
            <img
              src={interviewBack}
              className="exploreBack"
              height="200px"
              width="200px"
            />
            {/* <img src={video} alt="video" className="image left iconInfo" height="244px" width="338px" /> */}
          </Parallax>
          <Parallax
            className="interview"
            offsetYMax={0}
            offsetYMin={0}
            slowerScrollRate
          >
            <img src={interview} className="" height="160px" width="170px" />
          </Parallax>
          <div className="row processContainer">
            <div className="col s12 m6 center">
              <h3 className="processHeading processHeadingExtra">
                インタビュー
              </h3>
            </div>
          </div>
          <div className="row containerDescription">
            <h3 className="processDescription">
              会いたいキャンディデイトが見つかれば、Skype面接を実施しましょう。面接日程の設定はOnetroチームにお任せください。
            </h3>
          </div>
        </div>
        <div className="col">
          {/* <Parallax
            className="custom-class"
            offsetYMax={40}
            offsetYMin={-40}
            slowerScrollRate
          >
            <img src={hire} alt="hire" className="image right" height="260px" width="270px" />
          </Parallax> */}
          <Parallax
            className="exploreBack"
            offsetYMax={30}
            offsetYMin={-70}
            slowerScrollRate
          >
            <img
              src={hireBack}
              className="exploreBack"
              height="200px"
              width="200px"
            />
            {/* <img src={video} alt="video" className="image left iconInfo" height="244px" width="338px" /> */}
          </Parallax>
          <Parallax
            className="hire"
            offsetYMax={0}
            offsetYMin={0}
            slowerScrollRate
          >
            <img src={hire} className="" height="160px" width="250px" />
          </Parallax>
          <div className="row processContainer">
            <div className="col s12 m6 center">
              <h3 className="processHeading processHeadingExtra ">採用</h3>
            </div>
          </div>
          <div className="row containerDescription">
            <h3 className="processDescription">
              海外エンジニアの採用が決まったら、不安なのは入社までの内定者フォローと諸々の来日手続き。Onetroユーザーだけが利用できる海外人材の入社トータルサポートもご用意しています。
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Process;
