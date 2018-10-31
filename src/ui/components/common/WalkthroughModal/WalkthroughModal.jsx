// @flow 
// NODE MODULES
import * as React from "react";
import ReactSVG from 'react-svg';

// COMPONENT
export default class WalkthroughModal extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  render(): React.Element<"div"> {
    let { animateClass } = this.state;
    let { walkthroughInfoIsOpen, setModalIsActive } = this.props;

    return (
      <div className={ `WalkthroughModal ${ animateClass }` }>
        <div className="WalkthroughModal__heading">
          <h2>INFORMATION</h2>
          <h3 onClick={() => this.props.openWalkThroughInfo(false)}>x</h3>
        </div>
        <p>1. Click the i to find out more about each asset</p>
        <p>2. The red bar shows the overall national debt of the country</p>
        <p>3. Click the assets to see how much national debt could be paid off by selling them</p>
        <p>4. You can switch National Wealth on or off to see how countries would fare without it</p>
      </div>
    );
  }
}