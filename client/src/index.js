import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'app/redux/';

import Root from 'app/containers/Root.jsx';

const store = createStore(reducer, composeWithDevTools());

const Application = () => (
  <Provider store={ store }>
    <Root />
  </Provider>
);

render(<Application />, document.getElementById('app'));
