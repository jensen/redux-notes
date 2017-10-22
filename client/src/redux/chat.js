import uuid from 'uuid';

const CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE';
const CHAT_ADD_NOTIFICATION = 'CHAT_ADD_NOTIFICATION';
const CHAT_SET_USER_COUNT = 'CHAT_SET_USER_ACCOUNT';
const CHAT_ADD_USER = 'CHAT_ADD_USER';

export function addMessage(username, content) {
  return {
    type: CHAT_ADD_MESSAGE,
    username,
    content
  };
}

export function addNotification(content) {
  return {
    type: CHAT_ADD_NOTIFICATION,
    content
  };
}

export function setUserCount(count) {
  return {
    type: CHAT_SET_USER_COUNT,
    count
  };
}

export function addUser(username) {
  return {
    type: CHAT_ADD_USER,
    username
  };
}

const initialState = {
  messages: [],
  users: []
};

function generateMessage({ username, content }) {
  return {
    type: 'CHAT_MESSAGE',
    id: uuid(),
    username,
    content
  };
}

function generateNotification({ content }) {
  return {
    type: 'SENT_NOTIFICATION',
    id: uuid(),
    content
  };
}

export default (state = initialState, action) => {
  const { type, username, content, count } = action;

  if(type === CHAT_ADD_MESSAGE) {
    return {
      ...state,
      messages: [ ...state.messages, generateMessage(action) ]
    };
  }

  if(type === CHAT_ADD_NOTIFICATION) {
    return {
      ...state,
      messages: [ ...state.messages, generateNotification(action)]
    };
  }

  if(type === CHAT_SET_USER_COUNT) {
    return {
      ...state,
      count
    }
  }

  if(type === CHAT_ADD_USER) {
    return {
      ...state,
      users: [ ...state.users, { username }]
    }
  }


  return state;
};
