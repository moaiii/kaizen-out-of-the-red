import {connect} from "react-redux";
import store from "../../../db/store";
import CountryList from "./CountryList.jsx";

function mapStoreToProps( store ) {
  return {
    data: store.GlobalReducer.data
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    // getAllCakes: ( ) => dispatch(getAllCakes.submit())
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( CountryList );