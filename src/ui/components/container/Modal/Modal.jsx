// @flow
// NODE MODULES
import * as React from "react";

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class Modal extends React.Component<Props, State> {
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

    let { modalIsActive } = this.props;

    let activeClassMod = modalIsActive ? '--isActive' : '';

    return (
      <div className={`Modal ${activeClassMod}`}>
        { this.props.modalComponent }
      </div>
    );
  }
}