// @flow
import * as actions from './global.action';
import {networkRequest} from '../../lib/network';
import { setCurrencyRate } from './global.action';
import store from '../store';

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
  }
}