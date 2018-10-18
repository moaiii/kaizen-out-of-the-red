import {connect} from "react-redux";
import store from "../../../../db/store";
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
    // setCountryItem: ( CountryItem ) => 
      // dispatch(setCountryItem( CountryItem )),
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( CountryItem );