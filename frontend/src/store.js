import { createStore } from 'redux';

const initialUser = localStorage.getItem('userState') ? JSON.parse(localStorage.getItem('userState')) : {
    authToken: null,
    loggedIn: false,
    name: null,
    username: null,
};

const USER_SET_INFO = {type: 'USER_SET_INFO'};

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

        default:
            return state;
    }
}

export const userStore = createStore(userReducer, initialUser);

export default userStore;
