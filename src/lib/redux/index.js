// @flow
// $FlowFixMe
import type {ActionCreator as ReduxActionCreator} from "redux";

/**
 * Author note:
 * util to create basic redux actions (keep it DRY, keep it neat)
 **/

export type ActionCreator<T> = ReduxActionCreator<Action<T>, T>;

export function actionCreator<T>(type: string): ActionCreator<T> {
  return payload => {
    return {
      type,
      payload
    }
  };
}

export type Action<T> = {
  type: string,
  payload: ?T
};

/**
 * Author note:
 * same as above but creates 3 types of action useful for logging the 
 * status of an api request. 
 * 
 * Using these actions we load spinners giving the user feedback 
 * that a request is being made with a backend server 
 **/

export type NetworkActionCreator<S, T> = {
  submit: ActionCreator<S>,
  resolved: ActionCreator<T>,
  rejected: ActionCreator<any>,
}

export function networkActionCreator<S, T>(type: string): NetworkActionCreator<S, T> {
  return {
    submit  : actionCreator(`${type}__SUBMIT`),
    resolved: actionCreator(`${type}__RESOLVED`),
    rejected: actionCreator(`${type}__REJECTED`),
  }
}