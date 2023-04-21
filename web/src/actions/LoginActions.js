import { postData, getData } from '../helpers/ApiHelper';
import handleResponse from '../services/handleService';
import {
    LOGIN_SUCCESS,
    CHECK_ISAUTH,
    UPDATE_USER_DETAILS
} from '../types';
import * as constant from '../constant';

export function login(email, password) {
    return (dispatch, getState) => {
        const requestOptions = postData({ email, password });

        return fetch(constant.BACKEND_URL + '/api/login', requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(user => {
                if (user) {
                    var userDetails = user.data;
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: userDetails
                    })

                    userDetails.authdata = window.btoa(email + ':' + password);
                    localStorage.setItem('user', JSON.stringify(userDetails));
                }
                return user;
            });
    }
}


export function isAuth() {
    var is_auth = (localStorage.getItem('user') || localStorage.getItem('userAuthToken')) ? true : false;

    return (dispatch, getState) => {
        dispatch({
            type: CHECK_ISAUTH,
            payload: is_auth
        });
    }
}

export function logout() {
    return (dispatch, getState) => {
        // remove all
        localStorage.clear();
        isAuth();
    }
}

export function signup(data) {
    return (dispatch, getState) => {
        const requestOptions = postData(data);

        return fetch(constant.BACKEND_URL + '/api/register', requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(user => {
                console.log('user', user)
                if (user) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: user.data
                    })
                    var userDetails = user.data;
                    userDetails.authdata = window.btoa(data.email + ':' + data.password);
                    localStorage.setItem('user', JSON.stringify(userDetails));
                }
                return user;
            });
    }
}

export function isExistEmail(data) {
    return (dispatch, getState) => {
        const requestOptions = postData(data);

        return fetch(constant.BACKEND_URL + '/api/checkemail', requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(user => {
                return user;
            });
    }
}

export function getUserDetails() {
    return (dispatch, getState) => {
        const requestOptions = getData();

        return fetch(constant.BACKEND_URL + '/api/userdetail', requestOptions)
            .then((response) => handleResponse(response, dispatch))
            .then(user => {
                dispatch({
                    type: UPDATE_USER_DETAILS,
                    payload: user.data
                })
                return user;
            });
    }
}