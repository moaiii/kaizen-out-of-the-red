// @flow
// NODE MODULES
import * as React from "react";

import DollarLogo from '../../../../assets/svg/dollar.svg';
import EuroLogo from '../../../../assets/svg/euro.svg';
import PoundLogo from '../../../../assets/svg/pound.svg';
import ReactSVG from 'react-svg';

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class Currency extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: "",
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

  _handleSelectCurrency = (currencySelection) => {
    this.props.setCurrency( currencySelection );
  }

  render(): React.Element<"div"> {
    // VARIABLES
    //const {} = this.props;
    const { animateClass } = this.state;
    const { currencySelection, classMod, walkthroughStep } = this.props;

    // DYNAMIC STYLES AND CLASSES
    let isPoundSelected = currencySelection === 'pound' 
      ? '--isSelected' : '';
      
    let isDollarSelected = currencySelection === 'dollar' 
      ? '--isSelected' : '';
      
    let isEuroSelected = currencySelection === 'euro' 
      ? '--isSelected' : '';
      

    let styleCurrency = { opacity: walkthroughStep < 4 ? '0.1' : 1 }


    // FINAL RENDERED JSX
    return (
      <div className={`Currency ${ animateClass } ${ classMod }`}
        style={styleCurrency}>
        <p>Currency displayed</p>
        <div className="buttons">
          <div className={`button ${isPoundSelected}`} 
            onClick={() => this._handleSelectCurrency('pound')}>
            <ReactSVG src={PoundLogo}/>
          </div>
          <div className={`button ${isDollarSelected}`} 
            onClick={() => this._handleSelectCurrency('dollar')}>
            <ReactSVG src={DollarLogo}/>
          </div>
          <div className={`button --euro ${isEuroSelected}`} 
            onClick={() => this._handleSelectCurrency('euro')}>
            <ReactSVG src={EuroLogo}/>
          </div>
        </div>
      </div>
    );
  }
}