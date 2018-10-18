import {connect} from "react-redux";
import store from "../../../db/store";
import CountryDetail from "./CountryDetail.jsx";

function mapStoreToProps( store ) {
  return {
    data: store.GlobalReducer.data
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( CountryDetail );