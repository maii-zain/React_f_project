import { combineReducers } from 'redux';
//The combineReducers function is a utility provided by Redux that combines multiple reducers into a single reducer function.
//It takes an object as an argument, where keys represent different slices of the state, and values are the corresponding reducer functions.
import favoritesReducer from './favorites/favoritesReducer';
//The rootReducer is created by calling combineReducers and passing an object with the favorites key mapped to the favoritesReducer. 
//This sets up the overall state structure for the Redux store.
// من الاخر باستيت ستركتشر بتاع الاستور
const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
