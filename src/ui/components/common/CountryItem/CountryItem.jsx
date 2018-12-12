// @flow
import * as React from "react";

import AngleTooltip from './AngleTooltip';
import Bar from '../../custom/Bar';
import Humanize from 'humanize-plus';
import ReactCountryFlag from "react-country-flag";

export default class CountryItem extends React.Component {
  constructor() {
    super();

    this.state = {
      animateClass: "",
      showTooltip: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  onBarClick = () => {
    this.setState({
      showTooltip: !this.state.showTooltip
    })
  }

  getHumanValue = (val) => {
    return Humanize
      .compactInteger(val, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion')
      .replace('M', ' Million')
  }

  render() {

    const { animateClass, showTooltip } = this.state;

    const { 
      data, 
      debtMax,
      currencySymbol, 
      currencyRate, 
      isNationalWealthSelected,
      onSelect, 
      walkthroughStep } = this.props;


    /**
     * TOOLTIP
     */
    let _AngleToolTip = 
      <AngleTooltip 
        showTooltip={showTooltip}
        onBarClick={this.onBarClick}
        data={data}
        currencySymbol={currencySymbol}
        getHumanValue={this.getHumanValue}/>


    /**
     * WIDTHS OF BARS
     */
    
    let _inProfit = data["Total assets (without national wealth)"] > data["National Debt"];

    let _remainingDebt = Math.abs((data["National Debt"] - data["Total assets (without national wealth)"]) * currencyRate);
    
    let _debtCleared = Math.min(data["debt cleared"], 100).toFixed(0);

    let _profit = Math.ceil(data["debt cleared"] - 100);


    /**
     * WRITE NEATLY
     */
    
    let _nationalDebt = Humanize
      .compactInteger(data["National Debt"], 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion');


    let _remainingDebtString = Humanize
      .compactInteger(_remainingDebt, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion');

    /**
     * VALUES
     */

    const nationalWealth = data["National Net Wealth"];
    const business = data['Business (Top Bank and Company)'];
    const resource = data["Resource (Gold and FX Reserves)"];
    const tourism = data["Tourism Receipts"];
    const sportCulture = data["Sport & Culture (Top Footballer and Piece of Art)"];

    const totalAssets = 
      // nationalWealth 
      + business
      + resource
      + tourism
      + sportCulture;

    
    /**
     * BLUE BAR WIDTHS
     */

    const _widths = {
      business: business / totalAssets,
      resource: resource / totalAssets,
      tourism: tourism / totalAssets,
      sportCulture: sportCulture / totalAssets,
    };


    /**
     * WALKTHROUGH STEPS
     */
    let _blueBarMod = walkthroughStep !== 3 && walkthroughStep < 5 
      ? '0.1' 
      : '1';

    let _walkthroughStyle = {
      'opacity': walkthroughStep < 5 
        ? '0.1' : '1'
    };

    let _x = {
      'opacity': walkthroughStep !== 2 && walkthroughStep !== 5 && walkthroughStep !== 6
        ? '0.1' : '1'
    };


    /**
     * CUSTOM STYLES
     */
    let _hideBorder = {
      'borderBottom': walkthroughStep < 5 
        ? 'none' : '1px solid #3566B2'
    };


    // FINAL RENDERED JSX
    return (
      <div className={`CountryItem ${ animateClass }`} style={_hideBorder}>
        <div className="group">
          <div className="lhs" onClick={() => onSelect(data.Country)}>
            <div className="countryandflag" style={_walkthroughStyle}>
              <ReactCountryFlag code={data.code} svg/>
              <h3>{data.Country}</h3>
            </div>
            <div className="debt-card-national" style={_x}>
              <div className="inner">
                <div className="top">
                  <p>{currencySymbol} {_nationalDebt} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="stacked-bar-chart">
            <div className="stack" style={
              {
                width:`${_debtCleared}%`
              }
            }>
              {_AngleToolTip}
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'Business (Top Bank and Company)'} 
                width={_widths.business * 100} 
                classMod={'--business'} 
                onClick={this.onBarClick}/>  
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'Resource (Gold and FX Reserves)'} 
                width={_widths.resource * 100} 
                classMod={'--resource'} 
                onClick={this.onBarClick}/>
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'Tourism Receipts'} 
                width={_widths.tourism * 100} 
                classMod={'--tourism'} 
                onClick={this.onBarClick}/>  
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'Sport & Culture (Top Footballer and Piece of Art)'} 
                width={_widths.sportCulture * 100} 
                classMod={'--sport'} 
                onClick={this.onBarClick}/>  
            </div>
          </div>
        </div>
        <div className="debt-card" style={_walkthroughStyle}>
          <div className="inner">
            <div className="top">
              <p className={'--small'}>{_inProfit ? "Surplus" : "Remaining debt"}</p>
              <p>{currencySymbol} {_remainingDebtString} </p>
            </div>
            <div className="bottom">
              <p>{_inProfit ? _profit : _debtCleared} %</p>
              <p>{_inProfit ? "Profit" : "Cleared"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}