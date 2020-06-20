import * as actionTypes from './ActionTypes';

export const showProgres = () => {

    return {
        type: actionTypes.SHOW_PROGRESS
    };
};

export const hideProgress = () => {

    return {
        type: actionTypes.HIDE_PROGRESS
    };
};
