const uuid = require('uuid');

const CHAT_ADD_USER = 'CHAT_ADD_USER';
const CHAT_REMOVE_USER = 'CHAT_REMOVE_USER';
const CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE';
const CHAT_ADD_NOTIFICATION = 'CHAT_ADD_NOTIFICATION';

const actions = {
  addUser(username, color, socket) {
    return ({
      type: CHAT_ADD_USER,
      username,
      color,
      socket
    });
  },
  removeUser(id) {
    return ({
      type: CHAT_REMOVE_USER,
      id
    });
  },
  addMessage(username, content) {
    return ({
      type: CHAT_ADD_MESSAGE,
      username,
      content
    });
  },
  addNotification(content) {
    return ({
      type: CHAT_ADD_NOTIFICATION,
      content
    });
  }
};

const reducer = (state = {}, action) => {
  const { id, username, color, content, socket } = action;

  if(action.type === CHAT_ADD_USER) {
    const id = uuid();
    return {
      ...state,
      users: {
        ...state.users,
        [id]: {
          id,
          username,
          color,
          socket
        }
      }
    }
  }

  if(action.type === CHAT_REMOVE_USER) {
    const users = Object.keys(state.users).reduce((previous, current) => {
      const user = state.users[current];

      if(user.id !== id) {
        previous[current] = { ...user }
      }

      return previous;
    }, {});

    const messages = Object.keys(state.messages).reduce((previous, current) => {
      const message = state.messages[current];

      if(message.user_id !== id || message.type === 'CHAT_NOTIFICATION') {
        previous[current] = { ...message }
      }

      return previous;
    }, {});

    return {
      ...state,
      messages,
      users
    }
  }

  if(action.type === CHAT_ADD_MESSAGE) {
    const id = uuid();
    const user_id = Object.keys(state.users).find(user => {
      return state.users[user].username === username
    });

    return {
      ...state,
      messages: {
        ...state.messages,
        [id]: {
          type: 'CHAT_MESSAGE',
          id,
          username,
          color: state.users[user_id].color,
          content,
          user_id,
          date: Date.now()
        }
      }
    }
  }

  if(action.type === CHAT_ADD_NOTIFICATION) {
    const id = uuid();

    return {
      ...state,
      messages: {
        ...state.messages,
        [id]: {
          type: 'CHAT_NOTIFICATION',
          id,
          content,
          date: Date.now()
        }
      }
    }
  }

  return state;
}

module.exports = {
  actions,
  reducer
};
