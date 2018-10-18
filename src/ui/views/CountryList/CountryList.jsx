// NODE MODULES

import * as React from "react";

// IMPORT COMPONENTS

import Bar from '../../components/custom/Bar';
import Header from '../../components/custom/Header';
import Navigation from '../../components/custom/Navigation';
import CountryItem from '../../components/common/CountryItem';

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

  _handleCountrySelect = ( name ) => { //console.log(id)
    this.props.history.push( `/country?name=${ encodeURI(name) }` );
  }

  render(): React.Element<"div"> {

    // VARIABLES
    const { data } = this.props;

    
    let _debtArray = data.map( data => data["National Debt"]);
    let _debtMax = Math.max(..._debtArray);

    let _countryItems = data.map( (countryData, i) => {
      return (
        <CountryItem 
          onSelect={this._handleCountrySelect}
          key={`${i}-country-list-item`}
          data={countryData} 
          debtMax={_debtMax} />
      );
    })

    return (
      <div className={`CountryList`}>
        <Header />
        <Navigation />
        <div className="list">
          {_countryItems}
        </div>
      </div>
    );
  }
}