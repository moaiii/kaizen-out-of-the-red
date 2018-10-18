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

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  render(): React.Element<"div"> {
    // DEBUG
    if( process.env.REACT_APP_RENDER_DEBUG === "true" ) {
      console.log("rendering", this) };

    // VARIABLES
    const { animateClass } = this.state;
    const { data, debtMax, currencySymbol, 
      currencyRate, isNationalWealthSelected,
      onSelect } = this.props;

    // DYNAMIC STYLES AND CLASSES
    // ...

    // PRIVATE COMPONENTS
    // ...

    let _nationalDebt = parseInt(Humanize.compactInteger(data["National Debt"], 1)) * currencyRate;
    let totalDebtWidth = data["National Debt"] / debtMax;
    let nationalWealthWidth = data["National Net Wealth"] / debtMax;
    let businessWidth = data["BUSINESS AND FINANCE TOTAL"] / debtMax;
    let resourceWidth = data["RESOURCE TOTAL"] / debtMax;
    let tourismWidth = data["Tourism Receipts"] / debtMax;
    let sportCultureWidth = data["SPORT & CULTURE TOTAL"] / debtMax;

    // FINAL RENDERED JSX
    return (
      <div className={`CountryItem ${ animateClass }`}>
        <div className="lhs" onClick={() => onSelect(data.Country)}>
          <ReactCountryFlag code={data.code} svg/>
          <h3>{data.Country}</h3>
        </div>
        <div className="stacked-bar-chart">
          <div className="stack">
            {isNationalWealthSelected 
              ? <Bar width={nationalWealthWidth} classMod={'--national-wealth'}/>  
              : null 
            }
            <Bar width={businessWidth} classMod={'--business'}/>  
            <Bar width={resourceWidth} classMod={'--resource'}/>  
            <Bar width={tourismWidth} classMod={'--tourism'}/>  
            <Bar width={sportCultureWidth} classMod={'--sport'}/>  
          </div>
          <Bar width={totalDebtWidth} classMod={'--total-debt'}/>
        </div>
        <div className="debt-card">
          <div className="top">
            <p>{currencySymbol} {_nationalDebt} Trillion</p>
          </div>
          <div className="bottom">
            <p>{data["% of debt (with national wealth)"]}</p>
          </div>
        </div>
      </div>
    );
  }
}