import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'app/redux/';

import {
  sync,
  REMOTE_CHAT_CREATE_USER,
  REMOTE_CHAT_ADD_MESSAGE,
  REMOTE_CHAT_ADD_NOTIFICATION
} from 'app/redux/chat';

import {
  setName
} from 'app/redux/user';

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

  if(action.type === REMOTE_CHAT_ADD_NOTIFICATION) {
    return socket.emit('chat:addNotification', {
      content
    });
  }

  return next(action);
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(remoteMiddleware)
));

socket.on('chat:sync', data => store.dispatch(sync(data.users, data.messages)));
socket.on('chat:kicked', () => store.dispatch(setName('')));

const Application = () => (
  <Provider store={ store }>
    <Root />
  </Provider>
);

render(<Application />, document.getElementById('app'));
