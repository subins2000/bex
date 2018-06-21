import { createStore } from 'redux';

const initialUser = {
    authToken: null,
    loggedIn: false,
    name: null,
    username: null,
};

const USER_SET_AUTH_TOKEN = {type: 'USER_SET_AUTH_TOKEN'};
const USER_SET_INFO = {type: 'USER_SET_INFO'};

function userReducer(state = initialUser, action) {
    switch(action.type) {
        case 'USER_SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.authToken,
            };

        case 'USER_SET_INFO':
            return {
                ...state,
                loggedIn: true,
                name: action.name,
                username: action.username,
            };

        default:
            return state;
    }
}

export const userStore = createStore(userReducer, initialUser);

export default userStore;
