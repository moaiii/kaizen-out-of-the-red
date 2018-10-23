import {connect} from "react-redux";
import store from "../../../../db/store";
import Social from "./Social.jsx";

function mapStoreToProps( store ) {
  return {
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Social );