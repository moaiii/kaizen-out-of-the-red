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

  render(): React.Element<"div"> {
    let { animateClass } = this.state;
    let { width, classMod, style } = this.props;

    let _style = Object.assign({}, style, {
      width: `${width * 100}%`
    });

    return (
      <div className={ `Bar ${ animateClass } ${ classMod }` } 
        onClick={() => this.props.onClick( this.props.attr )}
        style={ _style } />
    );
  }
}