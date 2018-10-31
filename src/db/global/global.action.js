import {actionCreator} from "../../lib/redux";

export const setCurrency
  = actionCreator("[GLOBAL] SET_CURRENCY");

export const setCurrencyRate
  = actionCreator("[GLOBAL] SET_CURRENCY_RATE");

export const setData
  = actionCreator("[GLOBAL] SET_DATA");

export const setNationalWealthSelection
  = actionCreator("[GLOBAL] SET_NATIONAL_NET_WEALTH_SELECTION");

export const setModalIsActive
  = actionCreator("[GLOBAL] SET_MODAL_IS_ACTIVE");

export const setBarClicked
  = actionCreator("[GLOBAL] SET_BAR_SELECTION");

export const setMobileNavIsOpen
  = actionCreator("[GLOBAL] SET_MOBILE_NAV_IS_OPEN");

export const setWalkthroughStep
  = actionCreator("[GLOBAL] SET_WALKTHROUGH_STEP");

export const setInfoModal
  = actionCreator("[GLOBAL] SET_INFO_MODAL");

export const overideWalkthroughStep
  = actionCreator("[GLOBAL] OV_WALKTHROUGH_STEP");

export const openWalkThroughInfo
  = actionCreator("[GLOBAL] OPEN_WALKTHROUGH_INFO");