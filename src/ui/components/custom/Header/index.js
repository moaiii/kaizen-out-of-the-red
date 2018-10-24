import {connect} from "react-redux";
import store from "../../../../db/store";
import {setMobileNavIsOpen} from '../../../../db/global/global.action';
import Header from "./Header.jsx";

function mapStoreToProps( store ) {
  return {
    isMobileNavOpen: store.GlobalReducer.isMobileNavOpen,
    walkthroughStep: store.GlobalReducer.walkthroughStep,
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setMobileNavIsOpen: ( isMobileNavOpen ) => 
      dispatch(setMobileNavIsOpen( isMobileNavOpen )),
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Header );