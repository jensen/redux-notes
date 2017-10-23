const storeToChat = state => {
  const users = Object.keys(state.users)
    .map(iter => {
      const { id, username, color } = state.users[iter];

      return {
        id,
        username,
        color
      }
    })
    .sort((a, b) => a.username < b.username ? -1 : a.username > b.username ? 1 : 0);

  const messages = Object.keys(state.messages)
    .map(iter => {
      const { type, id, color, content, date, user_id} = state.messages[iter];

      if(type === 'CHAT_MESSAGE') {
        return {
          type,
          id,
          content,
          color,
          username: state.users[user_id].username,
          date
        }
      }

      if(type === 'CHAT_NOTIFICATION') {
        return {
          type,
          id,
          content,
          date
        }
      }

    })
    .sort((a, b) => a.date - b.date);

  return {
    users,
    messages
  }
}

module.exports = function Sockets(io, { dispatch, getState, subscribe }, { addUser, removeUser, addMessage, addNotification }) {
  subscribe(() => {
    io.sockets.emit('chat:sync', storeToChat(getState()));
  });

  io.on('connection', socket => {
    socket.emit('chat:sync', storeToChat(getState()));

    socket.on('chat:createUser', ({ username, color }) => {
      dispatch(addUser(username, color, socket.id));
      dispatch(addNotification(`${username} has connected.`))
    });

    socket.on('chat:addMessage', ({ username, content }) => {
      dispatch(addMessage(username, content));
    });

    socket.on('chat:addNotification', ({ content }) => {
      dispatch(addNotification(content));
    });

    socket.on('disconnect', reason => {
      const state = getState();
      const user = Object.keys(state.users).reduce((previous, current) => {
        const user = state.users[current];

        if(user.socket === socket.id) {
          return user;
        }

        return previous;
      }, {});

      if(user.username) {
        dispatch(addNotification(`${user.username} has disconnected, taking all of their messages with them.`));
      }

      dispatch(removeUser(user.id));
    });
  });
}
