
let initialState = {
  currencySelection: '',
  currencyRate: null,
  currencySymbol: null,
  data: {},
  countrySelected: null,
  isNationalWealthSelected: true,
  modalIsActive: false,
  barSelected: {
    countryName: '',
    dataLabel: ''
  },
  isMobileNavOpen: false,
  walkthroughStep: 0,
  infoModal: {
    modalType: '',
    modalText: '',
    isOpen: false
  },
  walkthroughInfoIsOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "[GLOBAL] OPEN_WALKTHROUGH_INFO": {
      return { 
        ...state, 
        walkthroughInfoIsOpen: action.payload
      };
    }
    case "[GLOBAL] OV_WALKTHROUGH_STEP": {
      return { 
        ...state, 
        walkthroughStep: 5
      };
    }
    case "[GLOBAL] SET_INFO_MODAL": {
      return { 
        ...state, 
        infoModal: action.payload
      };
    }
    case "[GLOBAL] SET_WALKTHROUGH_STEP": {
      return { 
        ...state, 
        walkthroughStep: state.walkthroughStep + 1
      };
    }
    case "[GLOBAL] SET_MOBILE_NAV_IS_OPEN": {
      return { 
        ...state, 
        isMobileNavOpen: action.payload
      };
    }
    case "[GLOBAL] SET_MODAL_IS_ACTIVE": {
      return { 
        ...state, 
        modalIsActive: action.payload
      };
    }
    case "[GLOBAL] SET_BAR_SELECTION": {
      return { 
        ...state, 
        barSelected: {
          countryName: action.payload.countryName,
          dataLabel: action.payload.attr
        }
      };
    }
    case "[GLOBAL] SET_CURRENCY": {
      return { 
        ...state, 
        currencySelection: action.payload
      };
    }
    case "[GLOBAL] SET_CURRENCY_RATE": {
      return { 
        ...state, 
        currencyRate: action.payload.rate,
        currencySymbol: action.payload.symbol,
      };
    }
    case "[GLOBAL] SET_DATA": {
      return { 
        ...state, 
        data: action.payload
      };
    }
    case "[GLOBAL] SET_NATIONAL_NET_WEALTH_SELECTION": {
      return { 
        ...state, 
        isNationalWealthSelected: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
