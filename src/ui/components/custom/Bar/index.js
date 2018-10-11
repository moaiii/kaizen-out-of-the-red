import {connect} from "react-redux";
import store from "../../../../db/store";
import Bar from "./Bar.jsx";

function mapStoreToProps( store ) {
  return {
  }
}

function mapDispatchToProps( store ) {
  return {
  }
}
 
export default connect( mapStoreToProps, mapDispatchToProps )( Bar );