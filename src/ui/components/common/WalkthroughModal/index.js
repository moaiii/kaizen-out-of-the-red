import {connect} from "react-redux";
import store from "../../../../db/store";
import {openWalkThroughInfo} from '../../../../db/global/global.action';
import WalkthroughModal from "./WalkthroughModal.jsx";

function mapStoreToProps( store ) {
  return {
    walkthroughInfoIsOpen: store.GlobalReducer.walkthroughInfoIsOpen,
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    openWalkThroughInfo: (isOpen) => dispatch(openWalkThroughInfo(isOpen))
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( WalkthroughModal );