const CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE';
const CHAT_ADD_NOTIFICATION = 'CHAT_ADD_NOTIFICATION';
const CHAT_SET_USER_COUNT = 'CHAT_SET_USER_ACCOUNT';

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

const initialState = {
  count: 0,
  messages: []
};

export default (state = initialState, action) => {
  const { type, username, content, count } = action;

  if(type === CHAT_ADD_MESSAGE) {
    return {
      ...state,
      messages: [ ...state.messages, {
        type: 'SENT_MESSAGE',
        username,
        content
      }]
    };
  }

  if(type === CHAT_ADD_NOTIFICATION) {
    return {
      ...state,
      messages: [ ...state.messages, {
        type: 'SENT_NOTIFICATION',
        content
      }]
    };
  }

  if(type === CHAT_SET_USER_COUNT) {
    return {
      ...state,
      count
    };
  }


  return state;
};
