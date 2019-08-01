import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./core/store";


import 'semantic-ui-css/semantic.min.css'
import './index.css';

import App from './core/containers/App/App';
const store = configureStore();


const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

render(<Root />, document.getElementById("root"));
