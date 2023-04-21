import {
  LOGIN_MODEL_OPEN,
  SIGNUP_MODEL_OPEN,
  IS_CREATE_MODEL_OPEN,
  IS_DELETE_MODEL_OPEN,
  IS_VIEW_MODEL_OPEN
} from '../types';

export function loginModelOpen(arg) {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN_MODEL_OPEN,
      payload: arg
    });
  }
}

export function signupModalOpen(arg) {
  return (dispatch, getState) => {
    dispatch({
      type: SIGNUP_MODEL_OPEN,
      payload: arg
    });
  }
}

export function createModalOpen(arg) {
  console.log('arg', arg)
  return (dispatch, getState) => {
    dispatch({
      type: IS_CREATE_MODEL_OPEN,
      payload: arg
    });
  }
}
export function viewModalOpen(arg) {
  console.log('arg', arg)
  return (dispatch, getState) => {
    dispatch({
      type: IS_VIEW_MODEL_OPEN,
      payload: arg
    });
  }
}
export function deleteModalOpen(arg) {
  console.log('arg', arg)
  return (dispatch, getState) => {
    dispatch({
      type: IS_DELETE_MODEL_OPEN,
      payload: arg
    });
  }
}