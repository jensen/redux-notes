import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'app/redux/';

import { sync, REMOTE_CHAT_CREATE_USER, REMOTE_CHAT_ADD_MESSAGE } from 'app/redux/chat';
import Root from 'app/containers/Root.jsx';

import io from 'socket.io-client';

const socket = io();

const remoteMiddleware = store => next => action => {
  const { username, color, content } = action;

  if(action.type === REMOTE_CHAT_CREATE_USER) {
    return socket.emit('chat:createUser', {
      username,
      color
    });
  }

  if(action.type === REMOTE_CHAT_ADD_MESSAGE) {
    return socket.emit('chat:addMessage', {
      username,
      content
    });
  }

  return next(action);
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(remoteMiddleware)
));

socket.on('chat:sync', data => store.dispatch(sync(data.users, data.messages)));

const Application = () => (
  <Provider store={ store }>
    <Root />
  </Provider>
);

render(<Application />, document.getElementById('app'));
