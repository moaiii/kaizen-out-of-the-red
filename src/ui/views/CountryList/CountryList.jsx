// NODE MODULES

import * as React from "react";

// IMPORT COMPONENTS

import Bar from '../../components/custom/Bar';


// COMPONENT

export default class CountryList extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // LIFECYCLE METHODS 

  componentDidMount() { }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  };

  // CLASS FUNCTIONS

  _handleCountryClick = ( name ) => { //console.log(id)
    this.props.history.push( `/country/?name=${ name }` );
  }

  render(): React.Element<"div"> {

    // VARIABLES

    const { countries } = this.props;


    return (
      <div className={`CountryList`}>
        country list
      </div>
    );
  }
}