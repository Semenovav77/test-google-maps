import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './mainReducer'

const rootReducer = combineReducers( {
    mainPage: mainReducer
});

type RouteReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RouteReducerType>;


/**
 * This function accepts the app state, and saves it to localStorage
 * @param state
 */
const saveState = (state: AppStateType) => {
    try {
        //Convert the state to a JSON string
        const serialisedState = JSON.stringify(state);

        //Save the serialised state to localStorage against the key 'app_state'
        window.localStorage.setItem('app_state', serialisedState);
    } catch (err) {
        //Log errors here, or ignore
    }
};

/**
 * This is where you create the app store
 */

/**
 * Add a change listener to the store, and invoke our saveState function defined above.
 */


const loadState =() => {
    try {
        //Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.localStorage.getItem('app_state');

        //Passing undefined to createStore will result in our app getting the default state
        //If no data is saved, return undefined
        if (!serialisedState) return undefined;

        //De-serialise the saved state, and return it.
        return JSON.parse(serialisedState);
    } catch (err) {
        //Return undefined if localStorage is not available,
        //or data could not be de-serialised,
        //or there was some other error
        return undefined;
    }
};

/**
 * This is where you create the app store
 */
const oldState = loadState();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, oldState, composeEnhancers(applyMiddleware(thunkMiddleware)));

store.subscribe(() => {
    saveState(store.getState());
});

// @ts-ignore
window.__store__ = store;

export default store;
