import { SET_USER } from "../actions";


const initalState = {
    user: {},
};

const profile = (state = initalState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default profile;