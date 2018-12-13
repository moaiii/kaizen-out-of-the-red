import {overideWalkthroughStep, setModalIsActive} from '../../../db/global/global.action';

import CountryDetail from "./CountryDetail.jsx";
import {connect} from "react-redux";
import store from "../../../db/store";

function mapStoreToProps( store ) {
  return {
    walkthroughInfoIsOpen: store.GlobalReducer.walkthroughInfoIsOpen,
    data: store.GlobalReducer.data,
    modalIsActive: store.GlobalReducer.modalIsActive,
    currencyRate: store.GlobalReducer.currencyRate,
    currencySymbol: store.GlobalReducer.currencySymbol
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setModalIsActive: ( modalIsActive ) => 
      dispatch(setModalIsActive( modalIsActive )),
    
    overideWalkthroughStep: () => dispatch(overideWalkthroughStep(3))
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( CountryDetail );