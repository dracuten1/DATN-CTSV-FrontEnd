import * as actionTypes from './ActionTypes';

const initialState = {
    hiddenStatus: true
};

const progressReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_PROGRESS: {
            return { ...state, hiddenStatus: false };
        }
        case actionTypes.HIDE_PROGRESS:
            return { ...state, hiddenStatus: true };
        default:
            return { ...state }
    }
};


export default progressReducer;