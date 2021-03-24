
import { FETCH_FRIENDS_START, FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_FAILURE } from "./actions";

const initialState = {
    friends: [],
    error: "",
    isLoading: false,
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case(FETCH_FRIENDS_START):
            return ({
                ...state, 
                error: "", 
                isLoading: true,
            });
        case(FETCH_FRIENDS_SUCCESS):
            return ({
               ...state,
               friends: action.payload,
               error:  "",
               isLoading: false,
            })
        case(FETCH_FRIENDS_FAILURE):
            return ({
                ...state,
                error: action.payload,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default reducer;