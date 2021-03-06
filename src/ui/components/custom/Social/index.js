import {connect} from "react-redux";
import store from "../../../../db/store";
import {openWalkThroughInfo} from '../../../../db/global/global.action';
import Social from "./Social.jsx";

function mapStoreToProps( store ) {
  return {
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    openWalkThroughInfo: (isOpen) => dispatch(openWalkThroughInfo(isOpen))
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Social );