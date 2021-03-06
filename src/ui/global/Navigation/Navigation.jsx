// @flow
import * as React from "react";

import BusinessLogo from '../../../assets/svg/business.svg';
import Currency from '../../components/custom/Currency';
import InfoLogo from '../../../assets/svg/info.svg';
import ReactSVG from 'react-svg';
import ResourceLogo from '../../../assets/svg/resource.svg';
import SportCultureLogo from '../../../assets/svg/sportculture.svg';
import TourismLogo from '../../../assets/svg/tourism.svg';

export default class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  _setNationalWealthSelection = ( ) => {
    this.props.setNationalWealthSelection( !this.props.isNationalWealthSelected )
  }

  _bringUpInfoModal = ( type ) => {
    this.props.setInfoModal(type);
  }

  render() {


    /** 
     * VARIABLES
     **/

    const { isNationalWealthSelected, walkthroughStep } = this.props;
    const { animateClass } = this.state;


    /**
     * CUSTOM STYLES 
     */

    let styleBanner = { 
      opacity: walkthroughStep < 4 ? '0.1' : 1,
      // backgroundColor: walkthroughStep < 5 ? 'white' : '#101754' 
    }
    let styleBottom = { opacity: walkthroughStep < 4 && walkthroughStep !== 1 & walkthroughStep !== 3 
        ? '0.1' : 1 
    }

    let xClass = { 
      opacity: (walkthroughStep === 3 || walkthroughStep === 1 || walkthroughStep === 4 || walkthroughStep === 5)  
        ? '1' : '0.1' 
    }

    let yClass = { 
      opacity: walkthroughStep === 3
        ? '0.1' : '1' 
    }

    let debtBoxStyle = { opacity: walkthroughStep < 4 ? '0.1' : 1 }

    let _viewMod = isNationalWealthSelected ? '--isActive' : '';

    let _x = {
      'opacity': walkthroughStep !== 2 && walkthroughStep !== 4 && walkthroughStep !== 5 && walkthroughStep !== 6
        ? '0.1' : '1'
    };
    

    return (
      <div className={`Navigation ${ animateClass }`}>
        <div className="banner" style={styleBanner}>
          <p>
            Most countries are in trillions of debt to other nations in what seems like a never ending cycle of IOU's. If these countries needed to actually pay up, what assets could they sell to do so?
          </p>
        </div>
        <div className="bottom">
          <div className="inner">
            <div className="column-titles">
              <div className="column-country" style={styleBanner}>
                <p>Country Name</p>
              </div>
              <div className="column-debt" style={_x}>
                <div className="block">
                  <p>National Debt</p>
                </div>
              </div>
              <Currency />
            </div>
            <div className="bttm-lhs" style={styleBottom}>
              <div className="controls">
                <div className="control" 
                  style={yClass}>
                  <ReactSVG className={`control__icon`} src={BusinessLogo} />
                  <p>Business</p>
                  <div 
                    className="icon-stack" 
                    onClick={() => this._bringUpInfoModal('business')}>
                    <ReactSVG src={InfoLogo} />
                  </div>
                </div>
                <div className="control" 
                  style={yClass}>
                  <ReactSVG className={`control__icon`} src={ResourceLogo} />
                  <p>Resource</p>
                  <div 
                    className="icon-stack" 
                    onClick={() => this._bringUpInfoModal('resource')}>
                    <ReactSVG src={InfoLogo} />
                  </div>
                </div>
                <div className="control" 
                  style={yClass}>
                  <ReactSVG className={`control__icon`} src={TourismLogo} />
                  <p>Tourism</p>
                  <div 
                    className="icon-stack" 
                    onClick={() => this._bringUpInfoModal('tourism')}>
                    <ReactSVG src={InfoLogo} />
                  </div>
                </div>
                <div className="control" 
                  style={yClass}>
                  <ReactSVG className={`control__icon`} src={SportCultureLogo} />
                  <p>Sport & Culture</p>
                  <div className="icon-stack" onClick={() => this._bringUpInfoModal('sport and culture')}>
                    <ReactSVG src={InfoLogo} />
                  </div>
                </div>
              </div>
              <Currency />
            </div>
          </div>
        </div>
      </div>
    );
  }
}