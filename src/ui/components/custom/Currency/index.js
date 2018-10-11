import {connect} from "react-redux";
import store from "../../../db/store";
import { setCurrency } from '../../../global/global.actions';
import Currency from "./Currency.jsx";

/**
 * Author note:
 * 
 * Connection the redux store ( model ) to the view ui.
 * Moving this logic here keeps our .jsx file as clean as possible
 */

function mapStoreToProps( store ) {
  return {
    currencySelection: store.GlobalReducer.currencySelection,
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setCurrency: ( currency ) => 
      dispatch(setCurrency( currency )),
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( Currency );