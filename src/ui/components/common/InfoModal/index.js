import {connect} from "react-redux";
import store from "../../../../db/store";
import {setInfoModal} from '../../../../db/global/global.action';
import InfoModal from "./InfoModal.jsx";

function mapStoreToProps( store ) {
  return {
    infoModal: store.GlobalReducer.infoModal,
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setInfoModal: ( ) => dispatch(setInfoModal( 'close' )),
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( InfoModal );