import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import store from "./redux/redux-store";

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(  <Provider store={store}>
    <App/>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div)
});
