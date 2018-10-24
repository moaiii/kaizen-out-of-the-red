// @flow
// NODE MODULES
import * as React from "react";

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class Walkthrough extends React.Component<Props, State> {
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

  _getStep = () => {
    let {walkthroughStep} = this.props;

    let text;

    if( walkthroughStep === 1 ) text = `Click the i to find out more about each asset`
    if( walkthroughStep === 2 ) text = `The red bar shows the overall national debt of the country`
    if( walkthroughStep === 3 ) text = `Click the assets to see how much national debt could be paid off by selling them`
    if( walkthroughStep === 4 ) text = `You can switch National Wealth on or off to see how countries would fare without it`

    return text;
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {}
  
  render(): React.Element<"div"> {

    const { walkthroughStep, setWalkthroughStep } = this.props;
    const { animateClass } = this.state;

    let _visibleClassMod 
      = walkthroughStep > 0 && walkthroughStep < 5
        ? '--isActive' 
        : '';


    // FINAL RENDERED JSX
    return (
      <div className={`Walkthrough ${ animateClass } ${ _visibleClassMod }`}
        onClick={() => setWalkthroughStep()}>
          <h1>{ this._getStep() }</h1>
      </div>
    );
  }
}