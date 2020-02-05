
/**
 * React doesn't know in the first time the state can be empty,
 * so we give a default const and passed it as a default value
 * inside the parameter of the reducer
  */
const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;