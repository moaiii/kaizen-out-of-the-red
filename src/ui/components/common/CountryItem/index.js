import {connect} from "react-redux";
import store from "../../../../db/store";
import {setBarClicked} from '../../../../db/global/global.action';
import CountryItem from "./CountryItem.jsx";

function mapStoreToProps( store ) {
  return {
    currencySymbol: store.GlobalReducer.currencySymbol,
    currencyRate: store.GlobalReducer.currencyRate,
    isNationalWealthSelected: store.GlobalReducer.isNationalWealthSelected
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setBarClicked: ( attr ) => dispatch(setBarClicked( attr )),
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( CountryItem );