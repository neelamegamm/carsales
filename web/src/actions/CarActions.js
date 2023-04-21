import { postData, getData, deleteData } from '../helpers/ApiHelper';
import handleResponse from '../services/handleService';
import {
    GET_CAR_LISTING,
    GET_USER_CAR_LISTING,
    GET_CAR_DETAILS,
    CLEAR_CAR_DETAILS
} from '../types';
import * as constant from '../constant';

export function getUserCarListing(params) {
    return (dispatch, getState) => {
        const requestOptions = getData();
        if (!params) {
            params = { offset: 0, limit: 8 }
        }
        return fetch(constant.BACKEND_URL + '/api/user/cars?offset=' + params.offset + '&limit=' + params.limit, requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(carListing => {
                if (carListing) {
                    dispatch({
                        type: GET_USER_CAR_LISTING,
                        payload: carListing.data
                    })
                }
                return carListing;
            });
    }
}

export function getAllCarListing(params) {
    return (dispatch, getState) => {
        const requestOptions = getData();
        if (!params) {
            params = { offset: 0, limit: 8 }
        }
        return fetch(constant.BACKEND_URL + '/api/getallcars?offset=' + params.offset + '&limit=' + params.limit, requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(carListing => {
                if (carListing) {
                    dispatch({
                        type: GET_CAR_LISTING,
                        payload: carListing.data
                    })
                }
            });
    }
}

export function deleteCarDetails(carId) {
    return (dispatch, getState) => {
        const requestOptions = deleteData();

        return fetch(constant.BACKEND_URL + '/api/car/' + carId + '/delete', requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(resp => {
                return resp;
            });
    }
}


export function createCars(data) {
    return (dispatch, getState) => {
        const requestOptions = postData(data);

        var url = constant.BACKEND_URL + '/api/car/create';

        if (data.id) {
            url = constant.BACKEND_URL + '/api/car/update'
        }
        return fetch(url, requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(cars => {

                return cars;
            });
    }
}


export function getCarDetails(carId) {
    return (dispatch, getState) => {
        const requestOptions = getData();

        return fetch(constant.BACKEND_URL + '/api/car/' + carId + '/detail', requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(carDetails => {
                if (carDetails) {
                    dispatch({
                        type: GET_CAR_DETAILS,
                        payload: carDetails.data
                    })
                }
                return carDetails;
            });
    }
}

export function clearCarDetails() {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_CAR_DETAILS,
        });
    }
}