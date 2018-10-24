// @flow
// NODE MODULES
import * as React from "react";
import ReactSVG from 'react-svg';
import ReactCountryFlag from "react-country-flag";
import Humanize from 'humanize-plus';

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class Tooltip extends React.Component<Props, State> {
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
    // VARIABLES
    const { country, dataSelection, currencySymbol, setModalIsActive, handleCountrySelect, currencyRate } = this.props;
    const { animateClass } = this.state;


    const val = country && dataSelection
      ? country[dataSelection] * currencyRate
      : 0;

    const valClean = country && dataSelection
      ? Humanize.compactInteger(val, 1) 
      : 0;

    const totalDebt = country && dataSelection
      ? country['National Debt']
      : 0;

    const perc = country && dataSelection
      ? Math.ceil((country[dataSelection]) / totalDebt * 100)
      : 0;

    const leftOver = country && dataSelection
      ? (country['National Debt'] - country[dataSelection]) * currencyRate
      : 0;

    const leftOverClean = country && dataSelection
      ? Humanize.compactInteger(leftOver, 1) 
      : 0;

    // FINAL RENDERED JSX
    return !country 
      ? (<div>no country</div>)
      : (
      <div className={`Tooltip ${ animateClass }`}>
        <div className="clickable" 
          onClick={() => this.props.setModalIsActive(false)}/>
        <div className="inner">
          <div className="header">
            <h2>{ dataSelection }</h2>
          </div>
          <div className="country">
            <ReactCountryFlag code={country.code} svg/>
            <p className="country-name">{ country.Country }</p>
          </div>
          <div className="table">
            <div className="data-line">
              <p>{ dataSelection }</p>
              <p className={`angle`}>></p>
              <p className={`value`}>{currencySymbol} {valClean}</p>
            </div>
            <div className="data-line">
              <p>Percentage of debt</p>
              <p className={`angle`}>></p>
              <p className={`value`}>{perc} %</p>
            </div>
            <div className="data-line">
              <p>Left over</p>
              <p className={`angle`}>></p>
              <p className={`value`}>{currencySymbol} {leftOverClean}</p>
            </div>
          </div>
          <div className="footer">
            <button onClick={() => setModalIsActive(false)}>
              <h2>Close X</h2>  
            </button>        
            <button onClick={() => handleCountrySelect(country.Country)}>
              <h2>View Country ></h2>  
            </button>        
          </div>
        </div>
      </div>
    );
  }
}