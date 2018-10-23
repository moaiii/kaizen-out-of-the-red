// @flow
type SocialActions = { 
  type: string, 
  payload: Object 
};

type Action =
  | SocialActions;

export const showModal = (value: boolean): SocialActions => {
  return { 
    type: "SHOW_MODAL",
    payload: { payload: value }
  };
}
