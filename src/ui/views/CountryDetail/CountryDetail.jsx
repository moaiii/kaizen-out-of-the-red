// @flow
// NODE MODULES
import * as React from "react";
import Bar from '../../components/custom/Bar';
import Humanize from 'humanize-plus';
import ReactSVG from 'react-svg';
import NationalWealthLogo from '../../../assets/svg/nat-wealth.svg';
import NationalDebtLogo from '../../../assets/svg/nat-debt.svg';
import BusinessLogo from '../../../assets/svg/business.svg';
import BankLogo from '../../../assets/svg/leading-bank.svg';
import CompanyLogo from '../../../assets/svg/top-company.svg';
import FCRLogo from '../../../assets/svg/foreign-currency-reserves.svg';
import FootballLogo from '../../../assets/svg/football.svg';
import ArtLogo from '../../../assets/svg/art.svg';
import ResourceLogo from '../../../assets/svg/resource.svg';
import TourismLogo from '../../../assets/svg/tourism.svg';
import SportCultureLogo from '../../../assets/svg/sportculture.svg';
import InfoLogo from '../../../assets/svg/info.svg';
import WatchingLogo from '../../../assets/svg/watching.svg';

import Modal from '../../components/container/Modal';
import Tooltip from '../../components/custom/Tooltip';
import WalkthroughModal from "../../components/common/WalkthroughModal";

type Props = {};

type State = {

};

// COMPONENT
export default class CountryDetail extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      nameFromUrlParams: "",
      countryData: {},
      dataProps: []
    };
  }

  // LIFECYCLE FUNCTIONS 

  componentDidMount(): void {
    this.setState({
      nameFromUrlParams: decodeURI(new URL(window.location.href).hash.split('name=')[1])
    }, () => {
      this._getCountryDataFromStore();
      this.props.overideWalkthroughStep(5);
    })
  }

  componentWillUnmount(): void {
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
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
    this.props.history.goBack();
  }

  _goBack = () => {
    this.props.history.push( `/` );
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

  render(): React.Element<"div"> {

    // // VARIABLES

    // const { deleteStatus } = this.props;

    const { countryData, modalIsActive, setModalIsActive, dataProps } = this.state;
    const { data, walkthroughInfoIsOpen } = this.props;

    let maxBarValue = Math.max(...[countryData['National Debt'], 
      countryData['National Net Wealth'], 
      countryData['Business (Top Bank and Company)'], 
      countryData['Resource (Gold and FX Reserves)'], 
      countryData['Tourism Receipts']]); 

    // let _nationalDebt = parseInt(Humanize.compactInteger(countryData["National Debt"], 1)) * currencyRate;
    let nationalDebtWidth = countryData["National Debt"] / maxBarValue;
    let nationalWealthWidth = countryData["National Net Wealth"] / maxBarValue;
    let bankWidth = countryData["Total Assets"] / maxBarValue;
    let companyWidth = countryData["VALUE"] / maxBarValue;
    let goldWidth = countryData["FX Reserves Value"] / maxBarValue;
    let foreignWidth = countryData["Resource Net Wealth"] / maxBarValue;
    let tourismWidth = countryData["Tourism Receipts"] / maxBarValue;
    let footballWidth = countryData["Sport ($)"] / maxBarValue;
    let artWidth = (countryData["Sport ($)"] - countryData["Sport & Culture Net Wealth"]) / maxBarValue;

    let _tooltip 
      = <div className="details__tooltip">
          {
            dataProps.map( x => {

              let $ 
                = typeof x[1] === 'number'
                  ? `${this.props.currencySymbol} ${Humanize.compactInteger(Math.ceil((x[1] * this.props.currencyRate)), 1)}`
                  : x[1];

              return(
                <p className={'item'}>
                  <p className={`a`}>{x[0]}</p>
                  <p className={`angle`}> > </p>
                  <p className={`b`}>{$}</p>
                </p>
              )
            })
          }
          <div className="footer">
            <button onClick={() => this.props.setModalIsActive(false)}>
              <h2>Close X</h2>  
            </button>        
          </div>
        </div>

    let $ = this.props.walkthroughInfoIsOpen ? <WalkthroughModal /> : _tooltip;

    let _modal = <Modal modalComponent={ $ } />;

    return (
      <div className={`CountryDetail`}>
        {_modal}
        <div className="banner">
            <p>{ countryData.blurb }</p>
          </div>
        <div className="data-vis">
          <div className="row">
            <div className="label --national-debt">
              <ReactSVG className={`label__icon`} src={NationalDebtLogo} />
              <p>National Debt</p>
            </div>
            <div className="bar-group">
              <Bar attr={`debt`} onClick={() => this.onBarClick('debt')} width={nationalDebtWidth} classMod={'--national-debt'}/>  
            </div>
          </div>


          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={NationalWealthLogo} />
              <p>National Wealth</p>
            </div>
            <Bar attr={`wealth`} onClick={() => this.onBarClick('wealth')} width={nationalWealthWidth} classMod={'--national-wealth'} />
          </div>

          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={BusinessLogo} />
              <p>Business and Finance</p>
            </div>
            <div className="sub-labels">
              <div className="label">
                <ReactSVG className={`label__icon`} src={BankLogo} />
                <p>Leading bank</p>
              </div>
              <div className="label">
                <ReactSVG className={`label__icon`} src={CompanyLogo} />
                <p>Top company</p>
              </div>
            </div>
            <div className="bar-group">
              <Bar attr={`bank`} onClick={() => this.onBarClick('bank')} width={bankWidth} classMod={'--business'} />
              <Bar attr={`company`} onClick={() => this.onBarClick('company')} width={companyWidth} classMod={'--business'} />
            </div>
          </div>
          
          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={ResourceLogo} />
              <p>Resources</p>
            </div>
            <div className="sub-labels">
              <div className="label">
                <ReactSVG className={`label__icon`} src={ResourceLogo} />
                <p>Gold</p>
              </div>
              <div className="label">
                <ReactSVG className={`label__icon`} src={FCRLogo} />
                <p>Foreign currency reserves</p>
              </div>
            </div>
            <div className="bar-group">
              <Bar attr={`gold`} onClick={() => this.onBarClick('gold')} width={goldWidth} classMod={'--resource'} />
              <Bar attr={`fx`} onClick={() => this.onBarClick('fx')} width={foreignWidth} classMod={'--resource'} />
            </div>
          </div>
          
          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={TourismLogo} />
              <p>Tourism</p>
            </div>
            <div className="bar-group">
              <Bar attr={`tourism`} onClick={() => this.onBarClick('tourism')} width={tourismWidth} classMod={'--tourism'} />
            </div>
          </div>

          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={SportCultureLogo} />
              <p>Sport & Culture</p>
            </div>
            <div className="sub-labels">
              <div className="label">
                <ReactSVG className={`label__icon`} src={FootballLogo} />
                <p>Footballer</p>
              </div>
              <div className="label">
                <ReactSVG className={`label__icon`} src={ArtLogo} />
                <p>Art/ Artist</p>
              </div>
            </div>
            <div className="bar-group">
              <Bar attr={`football`} onClick={() => this.onBarClick('football')} width={footballWidth} classMod={'--sport'} />
              <Bar attr={`art`} onClick={() => this.onBarClick('art')} width={artWidth} classMod={'--sport'} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={() => this._goBack()}>
            <h2>{`< Back`}</h2>  
          </button>  
        </div>
      </div>
    );
  }
}