import {FETCH_COCKTAIL_SUCCESS} from "../actions/cocktailsAction";

const initialState = {
    cocktails: []
};

const cocktailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COCKTAIL_SUCCESS:
            return {...state, cocktails: action.cocktail};
        default:
            return state
    }
};

export default cocktailReducer