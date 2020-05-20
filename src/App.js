import React from 'react';

import './App.css';

import {Panel} from './components';
import {connect} from "react-redux";
import {initializedAppTC} from "./redux/mainReducer";
import GoogleApiWrapper from "./components/Map/Map";

const App = () => {
    return (
        <>
            <Panel/>
            <GoogleApiWrapper/>
        </>
    );
};

export default connect(null, {initializedAppTC})(App);