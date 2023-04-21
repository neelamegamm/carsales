import {
    GET_CAR_LISTING,
    GET_USER_CAR_LISTING,
    GET_CAR_DETAILS,
    CLEAR_CAR_DETAILS
} from '../types';

const INITIAL_STATE = {
    carListings: [],
    carTotal: 0,
    carListings: [],
    userCarListings: [],
    userCarTotal: 0,
    carDetails:{}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CAR_LISTING:
            var listing = [...state.carListings,...action.payload.listing];

            return {
                ...state,
                carListings: listing,
                carTotal: action.payload.count
            };

        case GET_USER_CAR_LISTING:
            var userCarListings = [...state.userCarListings,...action.payload.listing];

            return {
                ...state,
                userCarListings: userCarListings,
                userCarTotal: action.payload.count,
            };
       
        case GET_CAR_DETAILS:
            return {
                ...state,
                carDetails: action.payload
            };
        case CLEAR_CAR_DETAILS:
            return {
                ...state,
                carDetails: {}
            };
        default:
            return state;
    }
};