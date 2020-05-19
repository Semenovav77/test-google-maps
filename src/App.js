import React, {useReducer, useEffect} from 'react';
import {withScriptjs} from "react-google-maps";

import './App.css';

import {Map} from './components';
import {ContextAPP, initializedApp, initialState, reducer} from "./reducer/reducer";
import {Panel} from './components';
import {updateDirections, toogleInitialize} from './reducer/reducer';

const App = () => {

    const MapLoader = withScriptjs(Map);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const dots = JSON.parse(localStorage.getItem('dots'));
        (dots) && dispatch(initializedApp(dots))
    }, []);

    useEffect(() => {
        dispatch(updateDirections());
        localStorage.setItem('dots', JSON.stringify(state.dots))
    }, [state.dots]);

    window.__store__ = state;

    return (
        <>
            <ContextAPP.Provider value={{state, dispatch}}>
                <Panel dots={state.dots} dispatch={dispatch}/>
                <MapLoader
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtYEQcK_penjrSlD3ZRIwfsMbGhvPEOY8"
                    loadingElement={<div style={{height: `100%`}}
                    />}
                />
            </ContextAPP.Provider>
        </>
    );
};

export default App;
