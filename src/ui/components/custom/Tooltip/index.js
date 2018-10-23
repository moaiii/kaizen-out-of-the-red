import {connect} from "react-redux";
import store from "../../../../db/store";
import {setModalIsActive} from '../../../../db/global/global.action';
import Tooltip from "./Tooltip.jsx";

function mapStoreToProps( store ) {
  return {
    currencySymbol: store.GlobalReducer.currencySymbol,
    currencyRate: store.GlobalReducer.currencyRate

  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setModalIsActive: ( modalIsActive ) => 
      dispatch(setModalIsActive( modalIsActive )),
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Tooltip );