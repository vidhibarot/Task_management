

import { useDispatch } from 'react-redux';
import * as actionTypes from '../actions';

export const useUserDispatch = () => {
    const dispatch = useDispatch();

    const setLoginData = (payload) => {
        dispatch({ type: actionTypes.SET_LOGIN_DATA, payload });
    };

    const setUserData = (payload) => {
        dispatch({ type: actionTypes.SET_USER_DATA, payload });
    };

    return { setLoginData, setUserData };
};

