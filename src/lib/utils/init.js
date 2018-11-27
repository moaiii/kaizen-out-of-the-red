// @flow
import { setCurrency, setData } from '../../db/global/global.action';

import data from '../../db/data';
import store from '../../db/store';

export function run(config?: ?Object): Object {
  console.log('Initalising Out of the red...');

  store.dispatch( setData( data ) ); 
  store.dispatch( setCurrency('pound') ); 
  return {}
}