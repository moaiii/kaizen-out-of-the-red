// @flow
// NODE MODULES
import * as React from "react";
import ReactSVG from 'react-svg';

import PoundLogo from '../../../../assets/svg/pound.svg';
import DollarLogo from '../../../../assets/svg/dollar.svg';
import EuroLogo from '../../../../assets/svg/euro.svg';

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
      selection: "pound"
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
    // DEBUG
    if( process.env.REACT_APP_RENDER_DEBUG === "true" ) {
      console.log("rendering", this) };

    // VARIABLES
    //const {} = this.props;
    const { animateClass, selection } = this.state;
    const { currencySelection, classMod } = this.props;

    // DYNAMIC STYLES AND CLASSES
    let isPoundSelected = currencySelection === 'pound' 
      ? '--isSelected' : '';
      
    let isDollarSelected = currencySelection === 'dollar' 
      ? '--isSelected' : '';
      
    let isEuroSelected = currencySelection === 'euro' 
      ? '--isSelected' : '';
      

    // PRIVATE COMPONENTS
    // ...

    // FINAL RENDERED JSX
    return (
      <div className={`Currency ${ animateClass } ${ classMod }`}>
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