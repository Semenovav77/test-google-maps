import React, {useEffect} from 'react';

import './App.css';

import {Panel} from './components';
import {MapRender} from './components';
import {connect} from "react-redux";
import {initializedAppTC} from "./redux/mainReducer";
import GoogleApiWrapper from "./components/Map/Map2";

const App = () => {
    useEffect(() => {
        const dotsLS = JSON.parse(localStorage.getItem('dots'));
        /*(dotsLS) && initializedAppTC(dotsLS)*/
        debugger
    }, []);
    return (
        <>
            <Panel/>
         {/*   <MapRender/>*/}
            <GoogleApiWrapper/>
        </>
    );
};

export default connect(null, {initializedAppTC})(App);