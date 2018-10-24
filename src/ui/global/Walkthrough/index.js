import {connect} from "react-redux";
import store from "../../../db/store";
import {setWalkthroughStep} from '../../../db/global/global.action';
import Walkthrough from "./Walkthrough.jsx";

function mapStoreToProps( store ) {
  return {
    walkthroughStep: store.GlobalReducer.walkthroughStep
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setWalkthroughStep: ( ) => 
      dispatch(setWalkthroughStep( ))
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Walkthrough );