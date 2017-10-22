import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from 'app/redux/';

import Root from 'app/containers/Root.jsx';

const store = createStore(reducer);

const Application = () => (
  <Provider store={ store }>
    <Root />
  </Provider>
);

render(<Application />, document.getElementById('app'));
