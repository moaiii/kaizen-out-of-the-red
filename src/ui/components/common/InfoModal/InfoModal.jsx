// @flow 
// NODE MODULES

import * as React from "react";
import ReactSVG from 'react-svg';


// COMPONENT
export default class InfoModal extends React.Component<Props, State> {
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
    let { infoModal, setModalIsActive } = this.props;

    return (
      <div className={ `InfoModal ${ animateClass }` }>
        <div className="InfoModal__heading">
          <h2>{infoModal.modalType}</h2>
          <h3 onClick={() => this.props.setInfoModal()}>x</h3>
        </div>
        <p>{infoModal.modalText}</p>
      </div>
    );
  }
}