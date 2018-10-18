import {connect} from "react-redux";
import store from "../../../../db/store";
import Social from "./Social.jsx";

function mapStoreToProps( store ) {
  return {
    // cakes: store.GlobalReducer.cakes
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    // getAllCakes: ( ) => dispatch(getAllCakes.submit())
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Social );