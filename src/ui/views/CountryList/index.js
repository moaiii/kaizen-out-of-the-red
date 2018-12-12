import {setModalIsActive, setWalkthroughStep} from '../../../db/global/global.action';

import CountryList from "./CountryList.jsx";
import {connect} from "react-redux";
import store from "../../../db/store";

function mapStoreToProps( store ) {
  return {
    data: store.GlobalReducer.data,
    isNationalWealthSelected: store.GlobalReducer.isNationalWealthSelected,
    walkthroughInfoIsOpen: store.GlobalReducer.walkthroughInfoIsOpen,
    walkthroughStep: store.GlobalReducer.walkthroughStep,
    infoModal: store.GlobalReducer.infoModal,
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

    setWalkthroughStep: ( ) => 
      dispatch(setWalkthroughStep( ))
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( CountryList );