// @flow
// NODE MODULES
import * as React from "react";
import Bar from '../../components/custom/Bar';
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

type Props = {};

type State = {

};

// COMPONENT
export default class CountryDetail extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      nameFromUrlParams: "",
      countryData: {}
    };
  }

  // LIFECYCLE FUNCTIONS 

  componentDidMount(): void {
    this.setState({
      nameFromUrlParams: decodeURI(new URL(window.location.href).hash.split('name=')[1])
    }, () => {
      this._getCountryDataFromStore();
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

  render(): React.Element<"div"> {

    // // VARIABLES

    // const { deleteStatus } = this.props;

    const { countryData } = this.state;
    const { data } = this.props;

    let maxBarValue = Math.max(...[countryData['National Debt'], countryData['National Net Wealth'], countryData['Business Net Wealth'], countryData['Tourism Receipts']]); 

    // let _nationalDebt = parseInt(Humanize.compactInteger(countryData["National Debt"], 1)) * currencyRate;
    let nationalDebtWidth = countryData["National Debt"] / maxBarValue;
    let nationalWealthWidth = countryData["National Net Wealth"] / maxBarValue;
    let bankWidth = countryData["Total Assets"] / maxBarValue;
    let companyWidth = countryData["VALUE"] / maxBarValue;
    let goldWidth = countryData["FX Reserves Value"] / maxBarValue;
    let foreignWidth = countryData["Resource Net Wealth"] / maxBarValue;
    let tourismWidth = countryData["Tourism Receipts"] / maxBarValue;
    let footballWidth = countryData["Sport ($)"] / maxBarValue;
    let artWidth = (countryData["Sport ($)"] - countryData["SPORT & CULTURE TOTAL"]) / maxBarValue;

    return (
      <div className={`CountryDetail`}>
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
              <Bar width={nationalDebtWidth} classMod={'--national-debt'}/>  
            </div>
          </div>


          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={NationalWealthLogo} />
              <p>National Wealth</p>
            </div>
            <Bar width={nationalWealthWidth} classMod={'--national-wealth'} />
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
              <Bar width={bankWidth} classMod={'--business'} />
              <Bar width={companyWidth} classMod={'--business'} />
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
              <Bar width={goldWidth} classMod={'--resource'} />
              <Bar width={foreignWidth} classMod={'--resource'} />
            </div>
          </div>
          
          <div className="row">
            <div className="label">
              <ReactSVG className={`label__icon`} src={TourismLogo} />
              <p>Tourism</p>
            </div>
            <div className="bar-group">
              <Bar width={tourismWidth} classMod={'--tourism'} />
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
              <Bar width={footballWidth} classMod={'--sport'} />
              <Bar width={artWidth} classMod={'--sport'} />
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