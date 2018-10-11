// @flow 
// NODE MODULES

import * as React from "react";
import ReactSVG from 'react-svg';
import Tooltip from './sub-components/tooltip';
import Segment from './sub-components/segment';

type Props = {
  country: {
    "name": string,
    "debt": number,
    "paid off": number, 
    "data": {
      "national wealth": number,
      "business": number,
      "resource": number,
      "tourism": number,
      "sport & culture": number,
    }
  }
};

type State = {
  animateClass: string
};

const COUNTRY_METADATA = {
  "UK": {
    "iconPath": "./assets/flags/uk.svg",
    // "color": "#8EC1FD"
  }
};

// COMPONENT
export default class Bar extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: "",
      flag: null
    };
  }

  componentDidMount(): void {
    this._getFlag();

    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  _getFlag = () => {
    let { country } = this.props;
    import( `${COUNTRY_METADATA[country.name].iconPath}` )
      .then( flag => this.setState({ flag: flag }) );
  }

  render(): React.Element<"div"> {
    let { animateClass, flag } = this.state;
    let { country } = this.props;

    return (
      <div className={ `Bar ${ animateClass }` } >
        <div className="Bar__inner-container">
          <div className="tab">
            <div className="flag">
              <ReactSVG path={flag} />
            </div>
            <div className="details">
              <p className="country-name">{ country.name }</p>
              <p className="debt-amount">{ country.debt }</p>
            </div>
          </div>
          <div className="bar-data__container">
            <Segment data={country.data["national wealth"]}/>
            <Segment data={country.data["resource"]}/>
            <Segment data={country.data["tourism"]}/>
            <Segment data={country.data["sport & culture"]}/>
            <Segment data={country.data["national wealth"]}/>
          </div>
          <div className="paid-off-container">
            <p>{ country["paid off"] }%</p>
          </div>
        </div>
      </div>
    );
  }
}