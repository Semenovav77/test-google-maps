import React from 'react';

import './App.scss';
import {PanelContainer} from './containers';
import {GoogleApiWrapper} from './containers';

const App = () => {
    return (
        <div className='container'>
            <PanelContainer/>
            <GoogleApiWrapper/>
        </div>
    );
};

export default App;