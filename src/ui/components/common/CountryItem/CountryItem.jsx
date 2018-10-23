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
      onSelect } = this.props;

    let _debtVal = data["National Debt"] * currencyRate;
    let _nationalDebt = Humanize.compactInteger(_debtVal, 1);
    let totalDebtWidth = data["National Debt"] / debtMax;
    let nationalWealthWidth = data["National Net Wealth"] / debtMax;
    let businessWidth = data["Business Net Wealth"] / debtMax;
    let resourceWidth = data["Resource Net Wealth"] / debtMax;
    let tourismWidth = data["Tourism Receipts"] / debtMax;
    let sportCultureWidth = data["SPORT & CULTURE TOTAL"] / debtMax;

    // FINAL RENDERED JSX
    return (
      <div className={`CountryItem ${ animateClass }`}>
        <div className="group">
          <div className="lhs" onClick={() => onSelect(data.Country)}>
            <ReactCountryFlag code={data.code} svg/>
            <h3>{data.Country}</h3>
          </div>
          <div className="stacked-bar-chart">
            <div className="stack">
              {isNationalWealthSelected 
                ? <Bar attr={'National Net Wealth'} width={nationalWealthWidth} classMod={'--national-wealth'} onClick={this.onBarClick}/>  
                : null 
              }
              <Bar attr={'Business Net Wealth'} width={businessWidth} classMod={'--business'} onClick={this.onBarClick}/>  
              <Bar attr={'Resource Net Wealth'} width={resourceWidth} classMod={'--resource'} onClick={this.onBarClick}/>  
              <Bar attr={'Tourism Receipts'} width={tourismWidth} classMod={'--tourism'} onClick={this.onBarClick}/>  
              <Bar attr={'SPORT & CULTURE TOTAL'} width={sportCultureWidth} classMod={'--sport'} onClick={this.onBarClick}/>  
            </div>
            <Bar attr={'National Debt'} width={totalDebtWidth} classMod={'--national-debt'} onClick={this.onBarClick}/>
          </div>
        </div>
        <div className="debt-card">
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
    );
  }
}