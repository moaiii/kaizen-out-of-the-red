// NODE MODULES

import * as React from "react";

// COMPONENT

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // LIFECYCLE METHODS 

  componentDidMount() {}

  // CLASS FUNCTIONS

  _handleEnter = ( ) => { 
    this.props.history.push( `/country-list` );
  }

  render() {

    // VARIABLES

    const { countries } = this.props;


    return (
      <div className={`Home`}>
        Home
        <button onClick={ () => this._handleEnter() }>Enter</button>
      </div>
    );
  }
}