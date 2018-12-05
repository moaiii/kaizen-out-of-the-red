// @flow
// NODE MODULES
import * as React from "react";

import BusinessLogo from '../../../assets/svg/business.svg';
// COMPONENTS
import Currency from '../../components/custom/Currency';
import InfoLogo from '../../../assets/svg/info.svg';
// ASSETS
import NationalWealthLogo from '../../../assets/svg/nat-wealth.svg';
import ReactSVG from 'react-svg';
import ResourceLogo from '../../../assets/svg/resource.svg';
import SportCultureLogo from '../../../assets/svg/sportculture.svg';
import TourismLogo from '../../../assets/svg/tourism.svg';
import WatchingLogo from '../../../assets/svg/watching.svg';

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

  _bringUpInfoModal = ( type ) => {
    this.props.setInfoModal(type);
  }

  render(): React.Element<"div"> {

    // VARIABLES
    const { isNationalWealthSelected, walkthroughStep } = this.props;
    const { animateClass } = this.state;

    // DYNAMIC STYLES AND CLASSES
    // ...

    // PRIVATE COMPONENTS
    // ...

    let styleBanner = { 
      opacity: walkthroughStep < 5 ? '0.1' : 1,
      // backgroundColor: walkthroughStep < 5 ? 'white' : '#101754' 
    }
    let styleBottom = { opacity: walkthroughStep < 5 && walkthroughStep !== 1 & walkthroughStep !== 4 ? '0.1' : 1 }
    // let iconBottom = { transform: walkthroughStep < 5 && walkthroughStep !== 1 ? 'scale(1)' : 'scale(2)' }

    let xClass = { 
      opacity: (walkthroughStep === 4 || walkthroughStep === 1 || walkthroughStep === 5 || walkthroughStep === 6)  ? '1' : '0.1' 
    }
    let yClass = { 
      opacity: walkthroughStep === 4 ? '0.1' : '1' 
    }

    let debtBoxStyle = { opacity: walkthroughStep < 5 ? '0.1' : 1 }

    let _viewMod = isNationalWealthSelected ? '--isActive' : '';

    // FINAL RENDERED JSX
    return (
      <div className={`Navigation ${ animateClass }`}>
        <div className="banner" style={styleBanner}>
          <p>
            Most countries are in trillions of debt to other nations in what seems like a never ending cycle of IOU's. If these countries needed to actually pay up, what assets could they sell to do so?
          </p>
        </div>
        <div className="bottom" style={styleBottom}>
          <div className="inner">
            <div className="column-titles">
              <div className="column-country">
                <p>Country Name</p>
              </div>
              <div className="column-debt">
                <div className="block">
                  <p>National Debt</p>
                </div>
              </div>
            </div>
            <div className="bttm-lhs">
              <div className="controls">
                <div className="control --national-wealth" 
                  style={xClass}>
                  <ReactSVG 
                    className={`control__icon`} 
                    src={NationalWealthLogo} />
                  <p>National Wealth</p>
                  <div className="icon-stack">
                    <ReactSVG 
                      onClick={() => this._setNationalWealthSelection()} 
                      src={WatchingLogo} 
                      className={`watch-logo ${_viewMod}`}/>
                    <ReactSVG 
                      onClick={() => this._bringUpInfoModal('national wealth')} 
                      src={InfoLogo} />
                  </div>
                </div>
                <div className="control" 
                  style={yClass}
                  /** onClick={() => this._handleControlSelect('business')}*/>
                  <ReactSVG className={`control__icon`} src={BusinessLogo} />
                  <p>Business</p>
                  <div 
                    className="icon-stack" 
                    onClick={() => this._bringUpInfoModal('business')}>
                    <ReactSVG /*style={iconBottom}*/ src={InfoLogo} />
                  </div>
                </div>
                <div className="control" 
                  style={yClass}
                  /** onClick={() => this._handleControlSelect('resouce')}*/>
                  <ReactSVG className={`control__icon`} src={ResourceLogo} />
                  <p>Resource</p>
                  <div 
                    className="icon-stack" 
                    onClick={() => this._bringUpInfoModal('resource')}>
                    <ReactSVG /*style={iconBottom}*/ src={InfoLogo} />
                  </div>
                </div>
                <div className="control" 
                style={yClass}
                  /** onClick={() => this._handleControlSelect('tourism')}*/>
                  <ReactSVG className={`control__icon`} src={TourismLogo} />
                  <p>Tourism</p>
                  <div 
                    className="icon-stack" 
                    onClick={() => this._bringUpInfoModal('tourism')}>
                    <ReactSVG /*style={iconBottom}*/ src={InfoLogo} />
                  </div>
                </div>
              </div>
              <Currency />
            </div>
            {/* <div className="debt-card --nav" style={debtBoxStyle}> */}
              {/* <div className="twotone">
                <div className="top">
                  <p>National debt</p>
                </div>
                <div className="paid-off">
                  <p>How much could be cleared</p>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
} 

// <div 
// className="control" 
// style={yClass}
// /** onClick={() => this._handleControlSelect('sport & culture')}*/>
// <ReactSVG className={`control__icon`} src={SportCultureLogo} />
// <p>Sport & Culture</p>
// <div 
//   className="icon-stack" 
//   onClick={() => this._bringUpInfoModal('sport and culture')}>
//   <ReactSVG /*style={iconBottom}*/ src={InfoLogo} />
// </div>
// </div>