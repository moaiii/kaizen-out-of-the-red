// @flow
import * as React from "react";

import ArtLogo from '../../../assets/svg/art.svg';
import BankLogo from '../../../assets/svg/leading-bank.svg';
import Bar from '../../components/custom/Bar';
import BusinessLogo from '../../../assets/svg/business.svg';
import CompanyLogo from '../../../assets/svg/top-company.svg';
import FCRLogo from '../../../assets/svg/foreign-currency-reserves.svg';
import FootballLogo from '../../../assets/svg/football.svg';
import Humanize from 'humanize-plus';
import Modal from '../../components/container/Modal';
import NationalDebtLogo from '../../../assets/svg/nat-debt.svg';
import NationalWealthLogo from '../../../assets/svg/nat-wealth.svg';
import ReactCountryFlag from "react-country-flag";
import ReactSVG from 'react-svg';
import ResourceLogo from '../../../assets/svg/resource.svg';
import SportCultureLogo from '../../../assets/svg/sportculture.svg';
import Tooltip from '../../components/custom/Tooltip';
import {TooltipOther} from './Tooltip';
import TourismLogo from '../../../assets/svg/tourism.svg';
import WalkthroughModal from "../../components/common/WalkthroughModal";

// COMPONENT
export default class CountryDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      nameFromUrlParams: "",
      countryData: {},
      dataProps: []
    };
  }

  componentDidMount() {
    this.setState({
      nameFromUrlParams: decodeURI(new URL(window.location.href).hash.split('name=')[1])
    }, () => {
      this._getCountryDataFromStore();
      this.props.overideWalkthroughStep(4);
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  };

  _getCountryDataFromStore = () => {
    let { nameFromUrlParams } = this.state;

    let _country = this.props.data
      .filter( country => country.Country === nameFromUrlParams)[0]

    if( !_country ) {
      this._navigateBack();

    } else {
      this.setState({ countryData: _country });
    }
  }

  _navigateBack = () => {
    this.props.overideWalkthroughStep(5);
    this.props.history.goBack();
  }

  _goBack = () => {
    this.props.history.push( `/` );
  }

  getHumanValue = (val) => {
    return Humanize
      .compactInteger(val, 1)
      .replace('T', ' Trillion')
      .replace('B', ' Billion')
      .replace('M', ' Million')
  }

  onBarClick = (type) => {
    let dataProps = {};
    const {countryData} = this.state;

    if( type === 'wealth') {
      dataProps['National Net Wealth'] = countryData['National Net Wealth'];
    }
    else if( type === 'debt') {
      dataProps['National Debt'] = countryData['National Debt'];
    }
    else if( type === 'bank') {
      dataProps['LEADING BANK'] = countryData['LEADING BANK'];
      dataProps['LEADING BANK VALUE'] = countryData['LEADING BANK VALUE'];
      
    }
    else if( type === 'company') {
      dataProps['LEADING COMPANY'] = countryData['LEADING COMPANY'];
      dataProps['CATEGORY'] = countryData['CATEGORY'];
      dataProps['LEADING COMPANY VALUE'] = countryData['LEADING COMPANY VALUE'];
      
    }
    else if( type === 'gold') {
      dataProps['GOLD Tonnes'] = countryData['GOLD Tonnes'];
      
    }
    else if( type === 'fx') {
      dataProps['FX Reserves Value'] = countryData['FX Reserves Value'];
      
    }
    else if( type === 'football') {
      dataProps['Sports People'] = countryData['Sports People'];
      dataProps['SPORTS VALUE'] = countryData['SPORTS VALUE'];
      
    }
    else if( type === 'art') {
      dataProps['MOST VALUABLE ARTWORK'] = countryData['MOST VALUABLE ARTWORK'];
      dataProps['Artist'] = countryData['Artist'];
      
    }
    else if( type === 'tourism') {
      dataProps['NOTABLE BUILDINGS'] = countryData['NOTABLE BUILDINGS'];
      dataProps['Location'] = countryData['Location'];
      dataProps['Tourism Receipts'] = countryData['Tourism Receipts'];
      
    }

    this.setState({ dataProps: Object.entries(dataProps) }, () => {
      this.props.setModalIsActive(true)
    });
  }

  render() {
    const { countryData, dataProps } = this.state;
    const { data, walkthroughInfoIsOpen, currencySymbol, setModalIsActive } = this.props;

    const vals = [
      countryData["National Debt"],
      countryData["LEADING BANK VALUE"],
      countryData["LEADING COMPANY VALUE"],
      countryData["GOLD VALUE"],
      countryData["FX Reserves Value"],
      countryData["Tourism Receipts"],
      countryData["SPORTS VALUE"],
      countryData["ARTWORK VALUE"],
    ];

    const _theBiggestNumber = Math.max(...vals);

    /**
     * widths
     */

    let nationalDebtWidth = Math.min(countryData["National Debt"] / _theBiggestNumber);
    let bankWidth = Math.min(countryData["LEADING BANK VALUE"] / _theBiggestNumber);
    let companyWidth = Math.min(countryData["LEADING COMPANY VALUE"] / _theBiggestNumber);
    let goldWidth = Math.min((countryData["GOLD VALUE"]) / _theBiggestNumber);
    let foreignWidth = Math.min(countryData["FX Reserves Value"] / _theBiggestNumber);
    let tourismWidth = Math.min(countryData["Tourism Receipts"] / _theBiggestNumber);
    let footballWidth = Math.min(countryData["SPORTS VALUE"] / _theBiggestNumber);
    let artWidth = Math.min((countryData["ARTWORK VALUE"]) / _theBiggestNumber);


    /**
     * Tooltip
     */

    let _tooltip 
      = <TooltipOther
          dataProps={dataProps} 
          currencySymbol={currencySymbol} 
          currencyRate={this.props.currencyRate}
          setModalIsActive={setModalIsActive} />

    /**
     * Custom components
     */

    let $ = 
      walkthroughInfoIsOpen 
        ? <WalkthroughModal /> 
        : _tooltip;

    let countryFlag = 
      countryData.code
        ? <ReactCountryFlag code={countryData.code} svg/>
        : null;

    let _modal = 
      <Modal modalComponent={ $ } />;


    return (
      <div className={`CountryDetail`}>
        {_modal}
        <div className="banner">
          <div className="inner">
            <div className="countrywithflag">
              {countryFlag}
              <h2>{ countryData.Country }</h2>
            </div>
            <p>{ countryData.blurb }</p>
          </div>
          </div>
        <div className="data-vis">

          {/* 
            NATIONAL DEBT
          */}

          <div className="row --top">
            <div className="label">
              <ReactSVG 
                className={`label__icon`} 
                src={NationalDebtLogo} />
              <p>National Debt</p>
            </div>
            <div className="sub-labels">
              <div className="label-cat --debt">
                <div className="_bar">
                  <Bar 
                    attr={`debt`} 
                    width={nationalDebtWidth * 100} 
                    classMod={'--national-debt'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure ${nationalDebtWidth > 0.75 ? "--center" : null}`}>
                    {currencySymbol} {this.getHumanValue(countryData["National Debt"])}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr/>
          
          {/* 
            BUSINESS AND FINANCE
          */}

          <div className="row">
            <div className="label">
              <ReactSVG 
                className={`label__icon`} 
                src={BusinessLogo} />
              <p>Business and Finance</p>
            </div>
            <div className="sub-labels">
              <div className="label-cat">
                <div className="icon__">
                  <ReactSVG 
                    className={`label__icon`} 
                    src={BankLogo} />
                  <p>Leading bank</p>
                </div>
                <div className="_bar" onClick={() => this.onBarClick('bank')}>
                  <Bar 
                    attr={`bank`} 
                    width={bankWidth * 100} 
                    classMod={'--business'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                    <p className={`figure ${bankWidth > 0.75 ? "--center" : null}`}>
                      {currencySymbol} {this.getHumanValue(countryData["LEADING BANK VALUE"])}
                    </p>
                </div>
              </div>
              <div className="label-cat">
                <div className="icon__">
                  <ReactSVG 
                    className={`label__icon`} 
                    src={CompanyLogo} />
                  <p>Top company</p>
                </div>
                <div className="_bar" onClick={() => this.onBarClick('company')} >
                  <Bar 
                    attr={`company`} 
                    width={companyWidth * 100} 
                    classMod={'--business'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure ${companyWidth > 0.75 ? "--center" : null}`}>
                    {currencySymbol} {this.getHumanValue(countryData["LEADING COMPANY VALUE"])}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 
            RESOURCE
          */}

          <div className="row">
            <div className="label">
              <ReactSVG 
                className={`label__icon`} 
                src={ResourceLogo} />
              <p>Resources</p>
            </div>
            <div className="sub-labels">
              <div className="label-cat">
                <div className="icon__">
                  <ReactSVG 
                    className={`label__icon`} 
                    src={ResourceLogo} />
                  <p>Gold</p>
                </div>
                <div className="_bar" onClick={() => this.onBarClick('gold')} >
                  <Bar 
                    attr={`gold`} 
                    width={goldWidth * 100} 
                    classMod={'--resource'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure ${goldWidth > 0.75 ? "--center" : null}`}>
                    {currencySymbol} {this.getHumanValue(countryData["GOLD VALUE"])}
                  </p>
                </div>
              </div>
              <div className="label-cat">
                <div className="icon__">
                  <ReactSVG 
                    className={`label__icon`} 
                    src={FCRLogo} />
                  <p>Foreign currency reserves</p>
                </div>
                <div className="_bar" onClick={() => this.onBarClick('fx')} >
                  <Bar 
                    attr={`fx`} 
                    width={foreignWidth * 100} 
                    classMod={'--resource'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure ${foreignWidth > 0.75 ? "--center" : null}`}>
                    {currencySymbol} {this.getHumanValue(countryData["FX Reserves Value"])}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 
            SPORT AND CULTURE
          */}

          <div className="row">
            <div className="label">
              <ReactSVG 
                className={`label__icon`} 
                src={SportCultureLogo} />
              <p>Sport & Culture</p>
            </div>
            <div className="sub-labels">
              <div className="label-cat">
                <div className="icon__">
                  <ReactSVG 
                    className={`label__icon`} 
                    src={FootballLogo} />
                  <p>Footballer</p>
                </div>
                <div className="_bar" onClick={() => this.onBarClick('football')} >
                  <Bar 
                    attr={`football`} 
                    width={footballWidth * 100} 
                    classMod={'--sport'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure`}>
                    {currencySymbol} {this.getHumanValue(countryData["SPORTS VALUE"])}
                  </p>
                </div>
              </div>
              <div className="label-cat">
                <div className="icon__">
                  <ReactSVG 
                    className={`label__icon`} 
                    src={ArtLogo} />
                  <p>Art/ Artist</p>
                </div>
                <div className="_bar" onClick={() => this.onBarClick('art')} >
                  <Bar 
                    attr={`art`}
                    width={artWidth * 100} 
                    classMod={'--sport'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure`}>
                    {currencySymbol} {this.getHumanValue(countryData["ARTWORK VALUE"])}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 
          TOURISM
          */}

          <div className="row --tourism">
            <div className="label">
              <ReactSVG 
                className={`label__icon`} 
                src={TourismLogo} />
              <p>Tourism</p>
            </div>
            <div className="sub-labels">
              <div className="label-cat">
                <div className="_bar" onClick={() => this.onBarClick('tourism')} >
                  <Bar 
                    attr={`tourism`} 
                    width={tourismWidth * 100} 
                    classMod={'--tourism'} 
                    onMouseOver={() => null}
                    leaving={() => null}
                    onClick={() => null} />
                  <p className={`figure ${tourismWidth > 0.75 ? "--center" : null}`}>
                    {currencySymbol} {this.getHumanValue(countryData["Tourism Receipts"])}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr/>
        </div>

        {/* 
          BACK BUTTON  
        */}

        <div className="footer">
          <button onClick={() => this._goBack()}>
            <h2>{`< Back`}</h2>  
          </button>  
        </div>
      </div>
    );
  }
}


// In the new design we have removed National wealth as this was the feature that often skewed the data, currently, national wealth is still in the key but sports has been removed, I'm not sure if this has been reflected in the data pulling through? 

// --- OK
// I'm not sure which part of the data you are getting the %s from? As we are now not using national debt, the column AE on the ALL DATA tab should show the percentages for 'Debt Cleared'

// --- OK
// The figures in 'remaining debt' should be also be total debt (C) on ALL DATA minus Total Assets (AD)

// --- OK
// On both sets of bars the data is not respective to the other countries - eg for those 'in the red' if it says 49% of the debt is cleared then 49% of the bar should be filled in with how it's cleared.

// --- OK
// Those that are 'In the Black' should just be filling in the entire bar with the % distribution of how each asset contributes to the 'Total assets' amount in column AD on ALL DATA, so they should all look more like South Korea. 

// --- OK
// Those 'in the black' the 'remaining debt' column should be renamed 'Profit' and should be the remainder of Total Assets (AD) when national debt (C) is removed.