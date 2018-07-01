import { createStore } from 'redux';

const initialUser = localStorage.getItem('userState') ? JSON.parse(localStorage.getItem('userState')) : {
    authToken: null,
    books: {},
    loggedIn: false,
    name: null,
    username: null,
};

export const USER_SET_INFO = {type: 'USER_SET_INFO'};
export const USER_SET_BOOKS = {type: 'USER_SET_BOOKS'};
export const USER_LOG_OUT = {type: 'USER_LOG_OUT'};

function userReducer(state = initialUser, action) {
    switch(action.type) {
        case 'USER_SET_INFO':
            return {
                ...state,
                authToken: action.authToken,
                loggedIn: true,
                name: action.name,
                username: action.username,
            };

        case 'USER_SET_BOOKS':
            return {
                ...state,
                books: action.books,
            };

        case 'USER_LOG_OUT':
            localStorage.removeItem('userState');

            return {
                ...state,
                authToken: null,
                books: {},
                loggedIn: false,
                name: null,
                username: null,
            };

        default:
            return state;
    }
}

export const userStore = createStore(userReducer, initialUser);

export function isLoggedIn() {
    return userStore.getState()['loggedIn'];
}

export default userStore;
