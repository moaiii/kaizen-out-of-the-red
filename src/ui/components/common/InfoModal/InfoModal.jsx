// @flow 
import * as React from "react";

// COMPONENT
export default class InfoModal extends React.Component {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  render() {
    let { animateClass } = this.state;
    let { infoModal } = this.props;

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