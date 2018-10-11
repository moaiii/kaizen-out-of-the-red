// @flow
import type {Cake} from '../../lib/types/cake';
import type {Action} from '../../lib/redux';

type State = {
  +cakes: {
    +value: Array<Cake>,
    +pending: boolean,
    +complete: boolean,
    +error: boolean
  }
};

let initialState = {
  cakes: {
    value: [],
    pending: false,
    complete: false,
    error: false
  }
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "[GLOBAL] GET_ALL_CAKES__SUBMIT": {
      return { 
        ...state, 
        cakes: Object.assign({}, state.cakes, {
          pending: true,
          complete: false,
          error: false
        })
      };
    }
    case "[GLOBAL] GET_ALL_CAKES__RESOLVED": {
      return { 
        ...state, 
        cakes: Object.assign({}, state.cakes, {
          value: action.payload,
          pending: false,
          complete: true,
          error: false
        })
      };
    }
    case "[GLOBAL] GET_ALL_CAKES__REJECTED": {
      return { 
        ...state, 
        cakes: Object.assign({}, state.cakes, {
          pending: false,
          complete: false,
          error: true
        })
      };
    }

    default: {
      return state;
    }
  }
};
