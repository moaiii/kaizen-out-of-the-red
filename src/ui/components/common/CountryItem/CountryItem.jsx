// @flow
// NODE MODULES
import * as React from "react";
import Humanize from 'humanize-plus';
import ReactCountryFlag from "react-country-flag";
import Bar from '../../custom/Bar';

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class CountryItem extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  // CLASS FUNCTIONS
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  onBarClick = (attr) => {
    let countryName = this.props.data.Country;
    this.props.setBarClicked( {countryName, attr} );
    this.props.onBarSelected();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  render(): React.Element<"div"> {

    const { animateClass } = this.state;
    const { 
      data, debtMax, currencySymbol, 
      currencyRate, isNationalWealthSelected,
      onSelect, walkthroughStep } = this.props;

    let _debtVal = data["National Debt"] * currencyRate;
    let _nationalDebt = Humanize.compactInteger(_debtVal, 1);
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
            <div className="debt-card --mobile">
              <div className="inner">
                <div className="top">
                  <p>{currencySymbol} {_nationalDebt} </p>
                </div>
                <div className="bottom">
                  <p>{data["% of debt (with national wealth)"]}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="stacked-bar-chart">
            <Bar style={{'opacity':_redBarMod}} attr={'National Debt'} width={totalDebtWidth} classMod={'--national-debt'} onClick={() => null}/>
            <div className="stack">
              {isNationalWealthSelected 
                ? <Bar style={{'opacity':_blueBarMod}} attr={'National Net Wealth'} width={nationalWealthWidth} classMod={'--national-wealth'} onClick={this.onBarClick}/>  
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
              <p>{currencySymbol} {_nationalDebt} </p>
            </div>
            <div className="bottom">
              <p>{Math.ceil(percPaidOff)} %</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}