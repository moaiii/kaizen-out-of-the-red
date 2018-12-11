// @flow
// NODE MODULES
import * as React from "react";

import { MdClose, MdMenu } from 'react-icons/md';

// ASSETS
import Logo from '../../../../assets/svg/Logo.svg';
import ReactSVG from 'react-svg';
// COMPONENTS
import Social from '../Social';

// UTILITIES
// ........

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class Header extends React.Component<Props, State> {
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
    const { walkthroughStep, isMobileNavOpen } = this.props;
    const { animateClass } = this.state;

    let style = { opacity: walkthroughStep < 5 ? '0.1' : 1 }

    // FINAL RENDERED JSX
    return (
      <div className={`Header ${ animateClass }`} style={style}>
        <div className="title">
          <h1 className="title-line">
            OUT OF THE <span>RED</span>
          </h1>
          <p className="header-tagline --title">
            What would countries have to sell to pay off their national debt?
          </p>
        </div>
        <div className="mobile-nav-wrapper">
          {
            !isMobileNavOpen
              ? <MdMenu 
                  className={`mobile-nav-control`} 
                  onClick={() => this.props.setMobileNavIsOpen(true)}/>
              : <MdClose 
                  className={'mobile-nav-control'} 
                  onClick={() => this.props.setMobileNavIsOpen(false)} />
          }
        </div>
        <Social 
          classMod={`--header`}/>
      </div>
    );
  }
}