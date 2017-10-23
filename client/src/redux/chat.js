const CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE';
const CHAT_ADD_NOTIFICATION = 'CHAT_ADD_NOTIFICATION';
const CHAT_ADD_USER = 'CHAT_ADD_USER';
const CHAT_SYNC = 'CHAT_SYNC';

export const REMOTE_CHAT_CREATE_USER = 'REMOTE_CHAT_CREATE_USER';
export const REMOTE_CHAT_ADD_MESSAGE = 'REMOTE_CHAT_ADD_MESSAGE';

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

export function addUser(user) {
  return {
    type: CHAT_ADD_USER,
    user
  };
}

export function sync(users, messages) {
  return {
    type: CHAT_SYNC,
    users,
    messages
  };
}

export function remoteCreateUser(username, color) {
  return {
    type: REMOTE_CHAT_CREATE_USER,
    username,
    color
  };
}

export function remoteAddMessage(username, content) {
  return {
    type: REMOTE_CHAT_ADD_MESSAGE,
    username,
    content
  }
}

const initialState = {
  messages: [],
  users: []
};

function generateMessage({ username, content }) {
  return {
    type: 'CHAT_MESSAGE',
    username,
    content
  };
}

function generateNotification({ content }) {
  return {
    type: 'SENT_NOTIFICATION',
    content
  };
}

export default (state = initialState, action) => {
  const { type, user } = action;

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

  if(type === CHAT_ADD_USER) {
    return {
      ...state,
      users: [ ...state.users, user]
    }
  }

  if(type === CHAT_SYNC) {
    return {
      ...state,
      messages: action.messages,
      users: action.users
    };
  }

  return state;
};
