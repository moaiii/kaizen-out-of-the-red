import {connect} from "react-redux";
import store from "../../../../db/store";
import { setNationalWealthSelection } from '../../../../db/global/global.action';
import Navigation from "./Navigation.jsx";

function mapStoreToProps( store ) {
  return {
    isNationalWealthSelected: store.GlobalReducer.isNationalWealthSelected,
    walkthroughStep: store.GlobalReducer.walkthroughStep
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setNationalWealthSelection: 
      (isNationalWealthSelected) => dispatch(setNationalWealthSelection(isNationalWealthSelected))
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Navigation );