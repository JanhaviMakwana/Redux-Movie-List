import * as actionTypes from '../action/actionTypes';

const initialState = {
    userId: null,
    token: null,
    error: null,
    loading: false,
    email: null,
    movies: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                email: action.email,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                email: null,
                movies: null,
                error: null
            }
        case actionTypes.GENRE_SELECT:
            return {
                ...state,
                movies: action.movies
            }
        default:
            return state;
    }
}

export default reducer;