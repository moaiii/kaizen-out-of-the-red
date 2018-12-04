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

  // CLASS FUNCTIONS

  _handleCountrySelect = ( name ) => { //console.log(id)
    this.props.history.push( `/country?name=${ encodeURI(name) }` );
  }

  _handleSlection = () => {
    // open modal 
    this.props.setModalIsActive(true);
  }

  renderCountryItems = (data) => {
    const { maxValue } = this.state;
    return(
      data.map((countryData, i) => {
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

  render(): React.Element<"div"> {
    // VARIABLES
    const { data, countryDataSelected, dataSelection, 
      infoModal, walkthroughInfoIsOpen } = this.props;

    let _tooltip = <Tooltip handleCountrySelect={this._handleCountrySelect} country={countryDataSelected} dataSelection={dataSelection}/>;
    let _info = infoModal.isOpen ? <InfoModal /> : null;
    let _walkthrough = walkthroughInfoIsOpen ? <WalkthroughModal /> : null;
    let $ = _info || _walkthrough || _tooltip;
    let _modal = <Modal modalComponent={ $ } />;

    let _countryItemsInRed
      = data.filter(country => {
          return country["National Net Wealth"] < country["National Debt"]
        })

    let _countryItemsInBlack
      = data.filter(country => {
          return country["National Net Wealth"] > country["National Debt"]
        })

    return (
      <div className={`CountryList`}>
        { _modal }
        <Walkthrough />
        <Navigation />
        <div className="list">
          <div className={`list-banner --red`}>
            <h2>In the red</h2>
          </div>
          {this.renderCountryItems(_countryItemsInRed)}
          <div className={`list-banner --black`}>
            <h2>In the black</h2>
          </div>
          {this.renderCountryItems(_countryItemsInBlack)}
        </div>
      </div>
    );
  }
}