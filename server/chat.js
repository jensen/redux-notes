const uuid = require('uuid');

const CHAT_ADD_USER = 'CHAT_ADD_USER';
const CHAT_REMOVE_USER = 'CHAT_REMOVE_USER';
const CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE';

const actions = {
  addUser(username, color, socket) {
    return ({
      type: CHAT_ADD_USER,
      username,
      color,
      socket
    });
  },
  removeUser(socket) {
    return ({
      type: CHAT_REMOVE_USER,
      socket
    });
  },
  addMessage(username, content) {
    return ({
      type: CHAT_ADD_MESSAGE,
      username,
      content
    })
  }
};

const reducer = (state = {}, action) => {
  const { username, color, content, socket } = action;

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
    const id = Object.keys(state.users).find(user => state.users[user].socket === action.socket);

    const users = Object.keys(state.users).reduce((previous, current) => {
      const user = state.users[current];

      if(user.id !== id) {
        previous[current] = { ...user }
      }

      return previous;
    }, {});

    const messages = Object.keys(state.messages).reduce((previous, current) => {
      const message = state.messages[current];

      if(message.user_id !== id) {
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
          content,
          user_id,
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
