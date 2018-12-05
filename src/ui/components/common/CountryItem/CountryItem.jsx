// @flow
import * as React from "react";

import Bar from '../../custom/Bar';
import BusinessLogo from '../../../../assets/svg/business.svg';
import Humanize from 'humanize-plus';
import NationalWealthLogo from '../../../../assets/svg/nat-wealth.svg';
import ReactCountryFlag from "react-country-flag";
import ReactSVG from 'react-svg';
import ResourceLogo from '../../../../assets/svg/resource.svg';
import SportCultureLogo from '../../../../assets/svg/sportculture.svg';
import TourismLogo from '../../../../assets/svg/tourism.svg';

export default class CountryItem extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: "",
      showTooltip: false
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  onBarClick = (attr) => {
    // let countryName = this.props.data.Country;
    // this.props.setBarClicked( {countryName, attr} );
    // this.props.onBarSelected();

    this.setState({
      showTooltip: !this.state.showTooltip
    })
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  getHumanValue = (val) => {
    return Humanize
      .compactInteger(val, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion')
      .replace('M', ' Million')
  }

  render(): React.Element<"div"> {

    const { animateClass, showTooltip } = this.state;
    const { 
      data, 
      debtMax,
      currencySymbol, 
      currencyRate, 
      isNationalWealthSelected,
      onSelect, 
      walkthroughStep } = this.props;

    let _AngleToolTip = <div 
      className={`Angle-Tooltip ${showTooltip ? 'show' :''}`}
      onClick={this.onBarClick}>
      <div className="arrow" />
      <div className="holder">
        <ReactSVG 
          className={`angletooltip__icon`} 
          src={BusinessLogo} />
        <p>National Wealth {currencySymbol} {this.getHumanValue(data["National Net Wealth"])}</p>
      </div>
      <div className="holder">
        <ReactSVG 
          className={`angletooltip__icon`} 
          src={BusinessLogo} />
        <p>Business {currencySymbol} {this.getHumanValue(data["Business (Top Bank and Company)"])}</p>
      </div>
      <div className="holder">
        <ReactSVG 
          className={`angletooltip__icon`} 
          src={ResourceLogo} />
        <p>Resource {currencySymbol} {this.getHumanValue(data["Resource (Gold and FX Reserves)"])}</p>
      </div>
      <div className="holder">
        <ReactSVG 
          className={`angletooltip__icon`} 
          src={TourismLogo} />
        <p>Tourism {currencySymbol} {this.getHumanValue(data["Tourism Receipts"])}</p>
      </div>
      <div className="holder">
        <ReactSVG 
          className={`angletooltip__icon`} 
          src={SportCultureLogo} />
        <p>Sport & Culture {currencySymbol} {this.getHumanValue(data["Sport & Culture (Top Footballer and Piece of Art)"])}</p>
      </div>
    </div>

    let _debtVal = data["National Debt"] * currencyRate;
    let _nationalDebt = Humanize
      .compactInteger(_debtVal, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion');

    let totalDebtWidth = data["National Debt"] / debtMax;
    let nationalWealthWidth = data["National Net Wealth"] / debtMax;
    let businessWidth = data['Business (Top Bank and Company)'] / debtMax;
    let resourceWidth = data["Resource (Gold and FX Reserves)"] / debtMax;
    let tourismWidth = data["Tourism Receipts"] / debtMax;
    let sportCultureWidth = data["Sport & Culture (Top Footballer and Piece of Art)"] / debtMax;

    const percPaidOff 
      = isNationalWealthSelected
        ? ((data["National Net Wealth"] + data['Business (Top Bank and Company)'] + data["Resource (Gold and FX Reserves)"] + data["Tourism Receipts"] + data["Sport & Culture (Top Footballer and Piece of Art)"]) / data["National Debt"] * 100) 
        : ((data['Business (Top Bank and Company)'] + data["Resource (Gold and FX Reserves)"] + data["Tourism Receipts"] + data["Sport & Culture (Top Footballer and Piece of Art)"]) / data["National Debt"] * 100);


    let _redBarMod = walkthroughStep !== 2 && walkthroughStep < 5 ? '0.1' : '1';
    let _blueBarMod = walkthroughStep !== 3 && walkthroughStep < 5 ? '0.1' : '1';
    let _walkthroughStyle = {
      'opacity': walkthroughStep < 5 ? '0.1' : '1'
    };

    let _hideBorder = {
      'borderBottom': walkthroughStep < 5 ? 'none' : '1px solid #3566B2'
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
            <div className="debt-card-national">
              <div className="inner">
                <div className="top">
                  <p>{currencySymbol} {_nationalDebt} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="stacked-bar-chart">
            {_AngleToolTip}
            <div className="stack">
              {isNationalWealthSelected 
                ? <Bar 
                    style={{'opacity':_blueBarMod}} 
                    attr={'National Net Wealth'} 
                    width={nationalWealthWidth} 
                    classMod={'--national-wealth'} 
                    onClick={this.onBarClick}/>  
                : null 
              }
              <Bar style={{'opacity':_blueBarMod}} attr={'Business (Top Bank and Company)'} width={businessWidth} classMod={'--business'} onClick={this.onBarClick}/>  
              <Bar style={{'opacity':_blueBarMod}} attr={'Resource (Gold and FX Reserves)'} width={resourceWidth} classMod={'--resource'} onClick={this.onBarClick}/>  
              <Bar style={{'opacity':_blueBarMod}} attr={'Tourism Receipts'} width={tourismWidth} classMod={'--tourism'} onClick={this.onBarClick}/>  
              <Bar style={{'opacity':_blueBarMod}} attr={'Sport & Culture (Top Footballer and Piece of Art)'} width={sportCultureWidth} classMod={'--sport'} onClick={this.onBarClick}/>  
            </div>
          </div>
        </div>
        <div className="debt-card" style={_walkthroughStyle}>
          <div className="inner">
            <div className="top">
              <p className={'--small'}>Remaining Debt</p>
              <p>{currencySymbol} {_nationalDebt} </p>
            </div>
            <div className="bottom">
              <p>{Math.ceil(percPaidOff)} %</p>
              <p>Cleared</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}