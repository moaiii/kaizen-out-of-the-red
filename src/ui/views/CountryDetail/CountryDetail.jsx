// @flow
// NODE MODULES
import * as React from "react";
import Bar from '../../components/custom/Bar';
import ReactSVG from 'react-svg';
import NationalWealthLogo from '../../../assets/svg/nat-wealth.svg';
import BusinessLogo from '../../../assets/svg/business.svg';
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
    return nextProps.data;
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

  render(): React.Element<"div"> {

    // // VARIABLES

    // const { deleteStatus } = this.props;

    const { countryData } = this.state;
    const { data } = this.props;

    let _debtArray = data.map( data => data["National Debt"]);
    let _debtMax = Math.max(..._debtArray);

    // let _nationalDebt = parseInt(Humanize.compactInteger(countryData["National Debt"], 1)) * currencyRate;
    let totalDebtWidth = countryData["National Debt"] / _debtMax;
    let nationalWealthWidth = countryData["National Net Wealth"] / _debtMax;
    let businessWidth = countryData["BUSINESS AND FINANCE TOTAL"] / _debtMax;
    let resourceWidth = countryData["RESOURCE TOTAL"] / _debtMax;
    let tourismWidth = countryData["Tourism Receipts"] / _debtMax;
    let sportCultureWidth = countryData["SPORT & CULTURE TOTAL"] / _debtMax;

    return (
      <div className={`CountryDetail`}>
        <div className="banner">
            <p>
              How {countryData.Country} could clear their national debt
            </p>
          </div>
        <div className="data-vis">
          <div className="national-wealth">
            <div className="control --national-wealth">
              <ReactSVG className={`control__icon`} src={NationalWealthLogo} />
              <p>National Wealth</p>
            </div>
            <Bar width={nationalWealthWidth} classMod={'--national-wealth'}/>  
          </div>
        </div>
      </div>
    );
  }
}


// <div className="control --national-wealth">
//   <ReactSVG className={`control__icon`} src={NationalWealthLogo} />
//   <p>National Wealth</p>
// </div>
// <div className="control" 
//   /** onClick={() => this._handleControlSelect('business')}*/>
//   <ReactSVG className={`control__icon`} src={BusinessLogo} />
//   <p>Business</p>
//   <div className="icon-stack">
//     <ReactSVG src={InfoLogo} />
//   </div>
// </div>
// <div className="control" 
//   /** onClick={() => this._handleControlSelect('resouce')}*/>
//   <ReactSVG className={`control__icon`} src={ResourceLogo} />
//   <p>Resource</p>
//   <div className="icon-stack">
//     <ReactSVG src={InfoLogo} />
//   </div>
// </div>
// <div className="control" 
//   /** onClick={() => this._handleControlSelect('tourism')}*/>
//   <ReactSVG className={`control__icon`} src={TourismLogo} />
//   <p>Tourism</p>
//   <div className="icon-stack">
//     <ReactSVG src={InfoLogo} />
//   </div>
// </div>
// <div className="control" 
//   /** onClick={() => this._handleControlSelect('sport & culture')}*/>
//   <ReactSVG className={`control__icon`} src={SportCultureLogo} />
//   <p>Sport & Culture</p>
//   <div className="icon-stack">
//     <ReactSVG src={InfoLogo} />
//   </div>
// </div>