// @flow
import { setCurrencyRate, setMobileNavIsOpen, setModalIsActive } from './global.action';

export default {
  '[GLOBAL] SET_CURRENCY': async (store: Object, next: Function, action: Action<string>) => { // $FlowFixMe
    
    let rate;
    let symbol;

    if( action.payload === 'euro' ) {
      rate = 0.87;
      symbol = '€';
    };
    
    if( action.payload === 'pound' ) {
      rate = 0.77;
      symbol = '£';
    };
    
    if( action.payload === 'dollar' ) {
      rate = 1;
      symbol = '$';
    };

    store.dispatch( setCurrencyRate( {rate, symbol} ));
    store.dispatch( setMobileNavIsOpen( false ));
  }, 

  '[GLOBAL] SET_INFO_MODAL': (store: Object, next: Function, action: Action<string>)  => {

    if( action.payload === 'close' ) {
      action.payload = {
        isOpen: false,
        modalType: '',
        modalText: ''
      }

      store.dispatch(setModalIsActive(false));
    
    } else {

      let _typeChoice = action.payload;
  
      let text = {
        'national wealth': 'The total value of a nation’s assets',
        'business': 'The combined value of assets held by the leading bank and the market value of the top valued company',
        'resource': 'The value of gold and foreign currency held',
        'tourism': 'Tourism receipts are the income attributed from tourists in each year',
        'sport and culture': 'The value of the 5 most expensive national football players and the highest value artwork to be sold from the country',
      }
  
      let _textChoice = text[action.payload];
  
      action.payload = {
        isOpen: !store.getState().GlobalReducer.infoModal.isOpen,
        modalType: _typeChoice,
        modalText: _textChoice
      }
  
      store.dispatch(setModalIsActive(true));
    }

  },

  '[GLOBAL] OPEN_WALKTHROUGH_INFO': (store: Object, next: Function, action: Action<string>)  => {
    store.dispatch(setModalIsActive(action.payload));
  }
}