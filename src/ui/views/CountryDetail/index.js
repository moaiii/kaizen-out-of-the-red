import {connect} from "react-redux";
import store from "../../../db/store";
import {setModalIsActive} from '../../../db/global/global.action';
import CountryDetail from "./CountryDetail.jsx";

function mapStoreToProps( store ) {
  return {
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
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( CountryDetail );