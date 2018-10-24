// @flow
// NODE MODULES
import * as React from "react";
import ReactSVG from 'react-svg';

// COMPONENTS
import Social from '../Social';
import { MdMenu } from 'react-icons/md';

// ASSETS
import Logo from '../../../../assets/svg/Logo.svg';

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
    const { walkthroughStep } = this.props;
    const { animateClass } = this.state;

    let style = { opacity: walkthroughStep < 5 ? '0.1' : 1 }

    // FINAL RENDERED JSX
    return (
      <div className={`Header ${ animateClass }`} style={style}>
        <div className="title">
          <ReactSVG src={Logo} className={'logo-svg'}/>
        </div>
        <MdMenu className={`mobile-nav-control`} onClick={() => this.props.setMobileNavIsOpen(true)}/>
        <Social classMod={`--header`}/>
      </div>
    );
  }
}