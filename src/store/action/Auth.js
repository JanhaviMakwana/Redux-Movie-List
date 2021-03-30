import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (email, token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNeLPNH6Y5vLGcmy8Ly2HxgebJTMwZfRI';
        if (!isSignUp) {
            // console.log("Signin");
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNeLPNH6Y5vLGcmy8Ly2HxgebJTMwZfRI';
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                //  console.log(response);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.email, response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log(err.response.data.error);
                dispatch(authFail(err.response));
            });
    }
}

export const selectGenre = (movies) => {
    return {
        type: actionTypes.GENRE_SELECT,
        movies: movies
    }
}
