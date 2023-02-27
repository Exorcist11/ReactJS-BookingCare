import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log("START: ", action);
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            console.log("SUCCESS: ", copyState);
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log("FAILED: ", action);
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;