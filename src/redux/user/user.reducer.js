import UserActionTypes from "./user.types";

/**
 * React doesn't know in the first time the state can be empty,
 * so we give a default const and passed it as a default value
 * inside the parameter of the reducer
  */
const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;