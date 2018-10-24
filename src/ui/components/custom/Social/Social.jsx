// @flow
// node_modules
import React, { Component } from 'react';
import {connect} from 'react-redux';

// sub-components
// import {FaFacebook, FaTwitter, FaInfo} from 'react-icons/lib/fa';

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

  handleSocialClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let network = e.currentTarget.getAttribute('data-network'); 
    let description = "The best UK city to be a landlord" 
    let href;

    switch (network) {
      case 'facebook':
        href = 'https://www.facebook.com/sharer/sharer.php?u=' + 
        // $FlowFixMe - cant detect process.env
        `${process.env.PUBLIC_URL}`;
        break;
      
      case 'linkedin':
        href = 'https://www.linkedin.com/shareArticle?mini=true&url=' +
        // $FlowFixMe - cant detect process.env
        `${process.env.PUBLIC_URL}` +
        '&title=' + description +
        '&summary=%20&source=';
        break;
      
      case 'twitter':
        href = 'https://twitter.com/intent/tweet?text=' +
        description +
        // $FlowFixMe - cant detect process.env
        '&url=' + `${process.env.PUBLIC_URL}`;
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
            onClick={e => this.handleInfoClick(e)}>
            <a href="">
              {/* <FaInfo /> */}
            </a>
          </div>
          <div className="social__link --twitter"
            onClick={e => this.handleSocialClick(e)}
            data-network="twitter" >
            <a href="">
              {/* <FaTwitter /> */}
            </a>
          </div>
          <div className="social__link --facebook"
            onClick={e => this.handleSocialClick(e)}
            data-network="facebook" >
            <a href="">
              {/* <FaFacebook /> */}
            </a>
          </div>
        </div>
        <div className={`Social__logo`} onClick={this.handleHomeClick}>
          <p className={`brought-to-you`}>
            Brought to you by 
          </p>
          <p className={`c-t-m`}>
            Compare the market
          </p>
        </div>
      </div>
    );
  }
}