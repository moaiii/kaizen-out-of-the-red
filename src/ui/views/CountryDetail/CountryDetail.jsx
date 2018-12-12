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
import TourismLogo from '../../../assets/svg/tourism.svg';
import WalkthroughModal from "../../components/common/WalkthroughModal";
import Tooltip from './Tooltip';


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
      this.props.overideWalkthroughStep(5);
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
      dataProps['Total Assets'] = countryData['Total Assets'];
      
    }
    else if( type === 'company') {
      dataProps['LEADING COMPANY'] = countryData['LEADING COMPANY'];
      dataProps['CATEGORY'] = countryData['CATEGORY'];
      dataProps['VALUE'] = countryData['VALUE'];
      
    }
    else if( type === 'gold') {
      dataProps['GOLD Tonnes'] = countryData['GOLD Tonnes'];
      
    }
    else if( type === 'fx') {
      dataProps['FX Reserves Value'] = countryData['FX Reserves Value'];
      
    }
    else if( type === 'football') {
      dataProps['Sports People'] = countryData['Sports People'];
      dataProps['Sport ($)'] = countryData['Sport ($)'];
      
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


    /**
     * widths
     */

    let nationalDebtWidth = 1;
    // let nationalWealthWidth = Math.min(countryData["National Net Wealth"] / countryData["National Debt"], 1);
    let bankWidth = Math.min(countryData["Total Assets"] / countryData["National Debt"], 1);
    let companyWidth = Math.min(countryData["VALUE"] / countryData["National Debt"], 1);
    let goldWidth = Math.min(countryData["FX Reserves Value"] / countryData["National Debt"], 1);
    let foreignWidth = Math.min(countryData["Resource Net Wealth"] / countryData["National Debt"], 1);
    let tourismWidth = Math.min(countryData["Tourism Receipts"] / countryData["National Debt"], 1);
    let footballWidth = Math.min(countryData["Sport ($)"] / countryData["National Debt"], 1);
    let artWidth = Math.min((countryData["Sport & Culture (Top Footballer and Piece of Art)"] - countryData["Sport ($)"]) / countryData["National Debt"], 1);


    /**
     * Tooltip
     */

    let _tooltip 
      = <Tooltip 
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
              <div className="label-cat">
                <div className="_bar" onClick={() => this.onBarClick('debt')} >
                  <Bar 
                    attr={`debt`} 
                    width={nationalDebtWidth} 
                    classMod={'--national-debt'} />
                  <p className={`figure`}>
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
                    width={bankWidth} 
                    classMod={'--business'} />
                    <p className={`figure`}>
                      {currencySymbol} {this.getHumanValue(countryData["Total Assets"])}
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
                    width={companyWidth} 
                    classMod={'--business'} />
                  <p className={`figure`}>
                    {currencySymbol} {this.getHumanValue(countryData["VALUE"])}
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
                    width={goldWidth} 
                    classMod={'--resource'} />
                  <p className={`figure`}>
                    {currencySymbol} {this.getHumanValue(countryData["Resource (Gold and FX Reserves)"] - countryData["FX Reserves Value"])}
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
                    width={foreignWidth} 
                    classMod={'--resource'} />
                  <p className={`figure`}>
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
                    width={footballWidth} 
                    classMod={'--sport'} />
                  <p className={`figure`}>
                    {currencySymbol} {this.getHumanValue(countryData["Sport ($)"])}
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
                    width={artWidth} 
                    classMod={'--sport'} />
                  <p className={`figure`}>
                    {currencySymbol} {this.getHumanValue(countryData["Sport & Culture (Top Footballer and Piece of Art)"] - countryData["Sport ($)"])}
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
                    width={tourismWidth} 
                    classMod={'--tourism'} />
                  <p className={`figure`}>
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