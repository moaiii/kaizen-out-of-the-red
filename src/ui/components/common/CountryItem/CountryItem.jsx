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

  onBarClick = (o) => {
    this.props.setTooltipVisibility(o)
  }

  getHumanValue = (val) => {
    return Humanize
      .compactInteger(val, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion')
      .replace('M', ' Million')
  }

  render() {

    const { animateClass } = this.state;

    const { 
      data, 
      debtMax,
      currencySymbol, 
      currencyRate, 
      isNationalWealthSelected,
      onSelect, 
      showToolTip,
      walkthroughStep } = this.props;
      

    /**
     * TOOLTIP
     */
    let _AngleToolTip = 
      <AngleTooltip 
        showTooltip={showToolTip}
        onBarClick={() => this.onBarClick(null)}
        data={data}
        currencySymbol={currencySymbol}
        getHumanValue={this.getHumanValue} />



    /**
     * WRITE NEATLY
     */

    let _remainingDebt = Math.abs((data["National Debt"] - data["Total assets (without national wealth)"]) * currencyRate);
    
    let _nationalDebt = window.innerWidth > 425
      ? Humanize
          .compactInteger(data["National Debt"] * this.props.currencyRate, 1)
          .replace('T', ' Trillion')
          .replace('B', ' Billion')
      : Humanize
          .compactInteger(data["National Debt"] * this.props.currencyRate, 1)


    let _remainingDebtString = Humanize
      .compactInteger(_remainingDebt, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion');

      
    /**
     * VALUES
     */

    const nationalWealth = data["National Net Wealth"];
    const business = data['BUSINESS AND FINANCE TOTAL'];
    const resource = data["RESOURCE TOTAL"];
    const tourism = data["Tourism Receipts"];
    const sportCulture = data["SPORTS VALUE"];

    const totalAssets =
      + business
      + resource
      + tourism
      + sportCulture;
      

    /**
     * WIDTHS OF BARS
     */
    
    let _inProfit = data["Total assets (without national wealth)"] > data["National Debt"];
    
    let _debtCleared = Math.min(data["% of debt (without national wealth)"] * 100, 100).toFixed(1);

    let _percOfDebt = ((totalAssets / data["National Debt"]) * 100).toFixed(1);

    let _profit = Math.ceil(data["% of debt (without national wealth)"] * 100 - 100);

    
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
    let _blueBarMod = walkthroughStep !== 3 && walkthroughStep < 4 
      ? '0.1' 
      : '1';

    let _walkthroughStyle = {
      'opacity': walkthroughStep < 4
        ? '0.1' : '1'
    };

    let _x = {
      'opacity': walkthroughStep !== 2 && walkthroughStep !== 4 && walkthroughStep !== 5 && walkthroughStep !== 6
        ? '0.1' : '1'
    };


    /**
     * CUSTOM STYLES
     */
    let _hideBorder = {
      'borderBottom': walkthroughStep < 4
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
              }}>
              {_AngleToolTip}
              <Bar
                style={{'opacity':_blueBarMod}} 
                attr={'BUSINESS AND FINANCE TOTAL'} 
                width={_widths.business * 100} 
                classMod={'--business'} 
                onMouseOver={() => this.onBarClick(this.props.index)}
                leaving={() => this.onBarClick(null)}
                onClick={() => this.onBarClick(this.props.index)}/>  
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'RESOURCE TOTAL'} 
                width={_widths.resource * 100} 
                classMod={'--resource'} 
                onMouseOver={() => this.onBarClick(this.props.index)}
                leaving={() => this.onBarClick(null)}
                onClick={() => this.onBarClick(this.props.index)}/>
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'Tourism Receipts'} 
                width={_widths.tourism * 100} 
                classMod={'--tourism'} 
                onMouseOver={() => this.onBarClick(this.props.index)}
                leaving={() => this.onBarClick(null)}
                onClick={() => this.onBarClick(this.props.index)}/>  
              <Bar 
                style={{'opacity':_blueBarMod}} 
                attr={'SPORTS VALUE'} 
                width={_widths.sportCulture * 100} 
                classMod={'--sport'} 
                onMouseOver={() => this.onBarClick(this.props.index)}
                leaving={() => this.onBarClick(null)}
                onClick={() => this.onBarClick(this.props.index)}/>  
            </div>
          </div>
        </div>
        <div className="debt-card" style={_walkthroughStyle}>
          <div className="inner">
            <div className="top">
              <p className={'--small'}>
                {_inProfit ? "Surplus" : "Remaining debt"}
              </p>
              <p>
                {currencySymbol} {_remainingDebtString} 
              </p>
            </div>
            <div className="bottom">
              <p>{_inProfit ? _profit : _percOfDebt} %</p>
              <p>{_inProfit ? "Cleared" : "Cleared"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}