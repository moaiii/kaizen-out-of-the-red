import {connect} from "react-redux";
import store from "../../../../db/store";
import {setModalIsActive} from '../../../../db/global/global.action';
import Modal from "./Modal.jsx";

function mapStoreToProps( store ) {
  return {
    modalIsActive: store.GlobalReducer.modalIsActive
  }
}
 
function mapDispatchToProps( dispatch ) {
  return {
    setModalIsActive: ( modalIsActive ) => 
      dispatch(setModalIsActive( modalIsActive )),
  }
}

export default connect( mapStoreToProps, mapDispatchToProps )( Modal );