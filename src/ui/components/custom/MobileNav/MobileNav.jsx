// @flow
// NODE MODULES
import * as React from "react";

import Currency from '../Currency';
import { MdClose } from 'react-icons/md';
import Social from '../Social';

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class MobileNav extends React.Component<Props, State> {
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
    const { isMobileNavOpen, setMobileNavIsOpen } = this.props;
    const {animateClass } = this.state;

    let openClassMod = isMobileNavOpen ? '--isOpen' : '';

    return (
      <div className={`MobileNav ${ animateClass } ${ openClassMod }`}>
        <div className="close-container">
          <MdClose className={'mobile-nav-menu-close'} onClick={() => setMobileNavIsOpen( false )} />
        </div>
        <Social classMod={`--mobile-nav`}/>
        <p className={`blurb`}> Most countries are in trillions of debt to other nations in what seems like a never ending cycle of IOU's. If these countries needed to actually pay up, what assets could they sell to do so?</p>
        <Currency classMod={`--mobile-nav`}/>
      </div>
    );
  }
}