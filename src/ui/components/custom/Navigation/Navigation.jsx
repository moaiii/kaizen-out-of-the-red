// @flow
// NODE MODULES
import * as React from "react";
import ReactSVG from 'react-svg';

// COMPONENTS
import Currency from '../Currency';

// ASSETS
import NationalWealthLogo from '../../../../assets/svg/nat-wealth.svg';
import BusinessLogo from '../../../../assets/svg/business.svg';
import ResourceLogo from '../../../../assets/svg/resource.svg';
import TourismLogo from '../../../../assets/svg/tourism.svg';
import SportCultureLogo from '../../../../assets/svg/sportculture.svg';
import InfoLogo from '../../../../assets/svg/info.svg';
import WatchingLogo from '../../../../assets/svg/watching.svg';


type State = {
  animateClass: string,
  setNationalWealthSelection: boolean
};

// COMPONENT
export default class Navigation extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  // CLASS FUNCTIONS
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  _setNationalWealthSelection = ( ) => {
    this.props.setNationalWealthSelection( !this.props.isNationalWealthSelected )
  }

  render(): React.Element<"div"> {
    // DEBUG
    if( process.env.REACT_APP_RENDER_DEBUG === "true" ) {
      console.log("rendering", this) };

    // VARIABLES
    const { isNationalWealthSelected } = this.props;
    const { animateClass } = this.state;

    // DYNAMIC STYLES AND CLASSES
    // ...

    // PRIVATE COMPONENTS
    // ...

    // FINAL RENDERED JSX
    return (
      <div className={`Navigation ${ animateClass }`}>
        <div className="banner">
          <p>
            Most countries are in trillions of debt to other nations in what seems like a never ending cycle of IOU's. If these countries needed to actually pay up, what assets could they sell to do so?
          </p>
        </div>
        <div className="bottom">
          <Currency />
          <div className="controls">
            <div className="control --national-wealth" 
              onClick={() => this._setNationalWealthSelection()}>
              <ReactSVG className={`control__icon`} src={NationalWealthLogo} />
              <p>National Wealth</p>
              <div className="icon-stack">
                {
                  isNationalWealthSelected
                    ? <ReactSVG src={WatchingLogo} />
                    : null
                }
                <ReactSVG src={InfoLogo} />
              </div>
            </div>
            <div className="control" 
              /** onClick={() => this._handleControlSelect('business')}*/>
              <ReactSVG className={`control__icon`} src={BusinessLogo} />
              <p>Business</p>
              <div className="icon-stack">
                <ReactSVG src={InfoLogo} />
              </div>
            </div>
            <div className="control" 
              /** onClick={() => this._handleControlSelect('resouce')}*/>
              <ReactSVG className={`control__icon`} src={ResourceLogo} />
              <p>Resource</p>
              <div className="icon-stack">
                <ReactSVG src={InfoLogo} />
              </div>
            </div>
            <div className="control" 
              /** onClick={() => this._handleControlSelect('tourism')}*/>
              <ReactSVG className={`control__icon`} src={TourismLogo} />
              <p>Tourism</p>
              <div className="icon-stack">
                <ReactSVG src={InfoLogo} />
              </div>
            </div>
            <div className="control" 
              /** onClick={() => this._handleControlSelect('sport & culture')}*/>
              <ReactSVG className={`control__icon`} src={SportCultureLogo} />
              <p>Sport & Culture</p>
              <div className="icon-stack">
                <ReactSVG src={InfoLogo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}