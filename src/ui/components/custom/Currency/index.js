import {connect} from "react-redux";
import store from "../../../../db/store";
import { setCurrency } from '../../../../db/global/global.action';
import Currency from "./Currency.jsx";

function mapStoreToProps( store ) {
  return {
    currencySelection: store.GlobalReducer.currencySelection,
    walkthroughStep: store.GlobalReducer.walkthroughStep,
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setCurrency: ( currency ) => 
      dispatch(setCurrency( currency )),
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( Currency );