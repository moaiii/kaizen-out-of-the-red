import store from '../../db/store';
import { setCurrency, setData } from '../../db/global/global.action';
import data from '../../db/data';

export function run(config?: ?Object): Object {
  console.log('Initalising the Cake App...');

  store.dispatch( setData( data ) ); 
  store.dispatch( setCurrency('pound') ); 
  return {}
}