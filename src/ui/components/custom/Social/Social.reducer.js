// @flow
type State = {
  // +value: boolean 
};

type Action = {
 +type: string
}

let initialState = {};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {

  case "SHOW_MODAL": {
    return state;
  }

  default: {
    return state;
  }
  }
};
