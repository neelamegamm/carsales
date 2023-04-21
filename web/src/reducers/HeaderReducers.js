import {
    LOGIN_MODEL_OPEN,
    SIGNUP_MODEL_OPEN,
    IS_CREATE_MODEL_OPEN,
    IS_DELETE_MODEL_OPEN,
    IS_VIEW_MODEL_OPEN
} from '../types';

const INITIAL_STATE = {
    isLoginModelOpen: false,
    isSignupModalOpen: false,
    isCreateModalOpen: false,
    isViewModalOpen: false,
    isDeleteModalOpen: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_MODEL_OPEN:
            return {
                ...state,
                isLoginModelOpen: action.payload
            };
        case SIGNUP_MODEL_OPEN:
            return {
                ...state,
                isSignupModalOpen: action.payload
            };
        case IS_CREATE_MODEL_OPEN:
            return {
                ...state,
                isCreateModalOpen: action.payload
            };
        case IS_DELETE_MODEL_OPEN:
            return {
                ...state,
                isDeleteModalOpen: action.payload
            };
        case IS_VIEW_MODEL_OPEN:
            return {
                ...state,
                isViewModalOpen: action.payload
            };

        default:
            return state;
    }
};