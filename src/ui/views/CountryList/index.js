import {connect} from "react-redux";
import store from "../../../db/store";
import {setModalIsActive} from '../../../db/global/global.action';
import CountryList from "./CountryList.jsx";

function mapStoreToProps( store ) {
  return {
    data: store.GlobalReducer.data,
    modalIsActive: store.GlobalReducer.modalIsActive,
    dataSelection: store.GlobalReducer.barSelected.dataLabel,
    countryDataSelected: store.GlobalReducer.data
      .filter( dp => dp.Country === store.GlobalReducer.barSelected.countryName)[0]
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setModalIsActive: ( modalIsActive ) => 
      dispatch(setModalIsActive( modalIsActive )),
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( CountryList );