import React from 'react';

import './App.scss';

import {PanelContainer} from './containers';
import {GoogleApiWrapper} from './containers';

const App = () => {
    return (
        <div className='container'>
            <div>
                <PanelContainer/>
            </div>
            <div>
                <GoogleApiWrapper/>
            </div>
        </div>
    );
};

export default App;