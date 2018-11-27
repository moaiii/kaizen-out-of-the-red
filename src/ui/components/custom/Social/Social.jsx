// @flow
// node_modules
import React, { Component } from 'react';

import InfoLogo from '../../../../assets/svg/info.svg';
import ReactSVG from 'react-svg';
import embedIcon from '../../../../assets/svg/embed.svg';
import facebookIcon from '../../../../assets/svg/facebook.svg';
import twitterIcon from '../../../../assets/svg/twitter.svg';

type Props = {};

type State = {
  animate: string
};

export default class Social extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animate: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({animate: '--animate'}, () => {
      })
    }, 50);
  }

  handleInfoModalOpen = (e) => {
    e.preventDefault();
    this.props.openWalkThroughInfo(true);
  }

  handleSocialClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let network = e.currentTarget.getAttribute('data-network'); 
    let description = "Out of the red! Most countries are in trillions of debt to other nations in what seems like a never ending cycle of IOU's. If these countries needed to actually pay up, what assets could they sell to do so?" 
    let href;

    switch (network) {
      case 'facebook':
        href = 'https://www.facebook.com/sharer/sharer.php?u=' 
        + `${process.env.PUBLIC_URL}`;
        break;
      
      case 'linkedin':
        href = 'https://www.linkedin.com/shareArticle?mini=true&url=' 
        + `${process.env.PUBLIC_URL}` 
        + '&title=' + description 
        + '&summary=%20&source=';
        break;
      
      case 'twitter':
        href = 'https://twitter.com/intent/tweet?text=' 
        + description 
        + '&url=' + `${process.env.PUBLIC_URL}`;
        break;
      
      default: 
        alert('Oops social sharing isnt working at present');
    }

    window.open(
      href,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=253,width=600'
    );
  }

  handleInfoClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // store.dispatch(actions.showModal(true));
  }

  handleHomeClick = () => {
    window.open(process.env.PUBLIC_URL);
  }

  render() {
    const { classMod } = this.props;
    const { animate } = this.state;

    return (
      <div className={`Social__container ${animate} ${classMod}`}>
        <div className="Social__icons">
          
          
          <div className="social__link --info"
            onClick={(e) => this.handleInfoModalOpen(e)}>
            <a href="">
              <ReactSVG src={InfoLogo} />
            </a>
          </div>


          <div className="social__link --info"
            onClick={e => this.handleInfoClick(e)}>
            <a href="">
              <ReactSVG src={embedIcon} />
            </a>
          </div>
          <div className="social__link --twitter"
            onClick={e => this.handleSocialClick(e)}
            data-network="twitter" >
            <a href="">
              <ReactSVG src={twitterIcon} />
            </a>
          </div>
          <div className="social__link --facebook"
            onClick={e => this.handleSocialClick(e)}
            data-network="facebook" >
            <a href="">
              <ReactSVG src={facebookIcon} />
            </a>
          </div>
        </div>
        <div className={`Social__logo`} onClick={this.handleHomeClick}>
          <p className={`brought-to-you`}>
            Brought to you by 
          </p>
          <p className={`c-t-m`}>
            Compare the Market
          </p>
        </div>
      </div>
    );
  }
}