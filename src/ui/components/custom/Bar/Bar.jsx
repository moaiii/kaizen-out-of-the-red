// @flow 
import * as React from "react";

// COMPONENT
export default class Bar extends React.Component<Props, State> {
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

  render() {
    let { animateClass } = this.state;
    let { width, classMod, style } = this.props;

    let _style = Object.assign({}, style, {
      width: `${width}%`
    });

    return (
      <div className={ `Bar ${ animateClass } ${ classMod }` } 
        onClick={() => this.props.onClick( this.props.attr )}
        onMouseOver={() => this.props.onClick()}
        onMouseOut={() => {
          this.props.leaving()}}
        style={ _style } />
    );
  }
}