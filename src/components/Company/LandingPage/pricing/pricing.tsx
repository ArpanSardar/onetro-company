import React from 'react';
import './style.css';


import freeCard from '../../../../assets/images/freeCard@3x.png';
import basicCard from '../../../../assets/images/basicCard@3x.png';
import premiumCard from '../../../../assets/images/premiumCard@3x.png';

const FreeCard = () => (
  <div className="col ">
  <div className="col card1 card">
    <h3 className="freeHeader" >無料</h3>
    <h3 className="freePrice">月額／¥0</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">すべての機能</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">会社情報掲載（基本）</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">募集情報掲載 ×1</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">-</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">-</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">-</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <button className="button freeButton" data-toggle="modal" data-target="#modalFreeSubscription">SELECT</button>
    
  </div>
  <div id="modalFreeSubscription" className="modal fade" role="dialog">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">無料</h6>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            <p>下記のリンクよりお申し込みください</p>
            <a href="https://willings.co.jp/contact" target="_blank" >https://willings.co.jp/contact</a>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    </div>
);

const BasicCard = () => (
  <div className="col ">
  <div className="col card2 card">
    <div><h3 className="freeHeader" >ベーシック</h3></div>
    <h3 className="basicPrice">月額／¥30,000</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">すべての機能</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">求職者の採用※1</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">会社情報掲載（詳細）</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">募集情報掲載 ×5</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">来日サポート利用※2</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">-</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <button className="button basicButton" data-toggle="modal" data-target="#modalBasicSubscription">SELECT</button>
  </div>
  <div id="modalBasicSubscription" className="modal fade" role="dialog">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">ベーシックプラン</h6>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
          <p>下記のリンクよりお申し込みください</p>
            <a href="https://willings.co.jp/contact" target="_blank" >https://willings.co.jp/contact</a>          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PremiumCard = () => (
<div className="col ">
  <div className="col card3 card">
    <h3 className="freeHeader" >プレミアム</h3>
    <h3 className="premiumPrice">月額／¥50,000</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">すべての機能</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">求職者の採用※1</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">会社情報掲載（詳細</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">募集情報掲載 ×10</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">来日サポート利用※2</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <h3 className="cardText">コンサルティング</h3>
    <hr className="lineSeperator" style={{marginLeft:"10%", marginRight: "10%"}} />
    <button className="button premiumButton" data-toggle="modal" data-target="#modalPremiumSubscription">SELECT</button>
  </div>
  <div id="modalPremiumSubscription" className="modal fade" role="dialog">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">プレミアム</h6>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
          <p>下記のリンクよりお申し込みください</p>
            <a href="https://willings.co.jp/contact" target="_blank" >https://willings.co.jp/contact</a>          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);




const Pricing = () => (
  <div className=" center">
    <h3 className="pricingHeader">
      料金プラン
      </h3>
    <div className="row priceContainer">
      <FreeCard />
      <BasicCard />
      <PremiumCard />
    </div>

  </div>
);

export default Pricing;