// NODE MODULES

import * as React from "react";

import CountryItem from '../../components/common/CountryItem';
import InfoModal from '../../components/common/InfoModal';
import Modal from '../../components/container/Modal';
import Navigation from '../../global/Navigation';
import Tooltip from '../../components/custom/Tooltip';
import Walkthrough from '../../global/Walkthrough';
import WalkthroughModal from "../../components/common/WalkthroughModal";
import {trackPage} from '../../../lib/utils/google-analytics'

var sortBy = require('lodash.sortby');

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
    this.props.setWalkthroughStep();
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

    this.setState({ maxValue });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  };

  _handleCountrySelect = ( name ) => { //console.log(id)
    this.props.history.push( `/country?name=${ encodeURI(name) }` );
  }

  _handleSlection = () => {
    this.props.setModalIsActive(true);
  }

  renderCountryItems = (data) => {
    const { maxValue } = this.state;

    let _data = sortBy(data, "National Debt").reverse();

    return(
      _data.map((countryData, i) => {
        return (
          <CountryItem
            onSelected={this._handleSlection}
            onSelect={this._handleCountrySelect}
            key={`${i}-country-list-item`}
            data={countryData} 
            debtMax={maxValue} />
        );
      })
    )
  }

  render() {
    // VARIABLES
    const { 
      data, 
      countryDataSelected, 
      dataSelection, 
      infoModal, 
      walkthroughStep,
      isNationalWealthSelected,
      walkthroughInfoIsOpen } = this.props;

    let _tooltip = <Tooltip handleCountrySelect={this._handleCountrySelect} country={countryDataSelected} dataSelection={dataSelection}/>;
    let _info = infoModal.isOpen ? <InfoModal /> : null;
    let _walkthrough = walkthroughInfoIsOpen ? <WalkthroughModal /> : null;
    let $ = _info || _walkthrough || _tooltip;
    let _modal = <Modal modalComponent={ $ } />;

    let _countryItemsInRed
      = data.filter(country => {
          return parseInt(country["debt cleared"], 10) < 100
        })

    let _countryItemsInBlack
      = data.filter(country => {
          return parseInt(country["debt cleared"], 10) > 100
        })

    let _style = {
      opacity: walkthroughStep < 5 ? "0.1" : "1"
    }

    return (
      <div className={`CountryList`}>
        { _modal }
        <Walkthrough />
        <Navigation />
        <div className="list">
          <div className={`list-banner --red`} style={_style}>
            <h2>In the red</h2>
          </div>
          {this.renderCountryItems(_countryItemsInRed)}
          <div className={`list-banner --black`} style={_style}>
            <h2>In the black</h2>
          </div>
          {this.renderCountryItems(_countryItemsInBlack)}
        </div>
      </div>
    );
  }
}