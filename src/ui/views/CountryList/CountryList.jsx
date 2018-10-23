// NODE MODULES

import * as React from "react";
import {trackPage} from '../../../lib/utils/google-analytics'

// IMPORT COMPONENTS

import Bar from '../../components/custom/Bar';
import Header from '../../components/custom/Header';
import Navigation from '../../components/custom/Navigation';
import CountryItem from '../../components/common/CountryItem';
import Modal from '../../components/container/Modal';
import Tooltip from '../../components/custom/Tooltip';

export default class CountryList extends React.Component {
  constructor() {
    super();

    this.state = {
      maxValue: 0
    };
  }

  // LIFECYCLE METHODS 

  componentDidMount() {
    trackPage();
    this._getMaxValue();
  }

  _getMaxValue = () => {
    let maxValue = 0;

    let valuesDebt = this.props.data
      .map( country => country['National Debt']);

    let valuesWealth = this.props.data
      .map( country => country['National Net Wealth']);

    let vals = [...valuesDebt, ...valuesWealth];

    for(let i=0; i<vals.length; i++) {
      if(vals[i] > maxValue) {
        maxValue = vals[i];
      }
    }

    this.setState({ maxValue }, () => console.log(this.state.maxValue));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  };

  // CLASS FUNCTIONS

  _handleCountrySelect = ( name ) => { //console.log(id)
    this.props.history.push( `/country?name=${ encodeURI(name) }` );
  }

  _handleBarSlection = () => {
    // open modal 
    this.props.setModalIsActive(true);
  }

  render(): React.Element<"div"> {
    // VARIABLES
    const { maxValue } = this.state;
    const { data, modalIsActive, countryDataSelected, dataSelection } = this.props;

    let _tooltip = <Tooltip handleCountrySelect={this._handleCountrySelect} country={countryDataSelected} dataSelection={dataSelection}/>;
    let _modal = <Modal modalComponent={ _tooltip } />;
    let _debtArray = data.map( data => data["National Debt"]);
    let _debtMax = Math.max(..._debtArray);

    let _countryItems 
      = data.map( (countryData, i) => {
        return (
          <CountryItem
            onBarSelected={this._handleBarSlection}
            onSelect={this._handleCountrySelect}
            key={`${i}-country-list-item`}
            data={countryData} 
            debtMax={maxValue} />
        );
      })

    return (
      <div className={`CountryList`}>
        { _modal }
        <Navigation />
        <div className="list">
          {_countryItems}
        </div>
      </div>
    );
  }
}