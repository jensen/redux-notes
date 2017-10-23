const storeToChat = state => {
  const users = Object.keys(state.users)
    .map(iter => {
      const user = state.users[iter];

      return {
        id: user.id,
        username: user.username,
        color: user.color
      }
    })
    .sort((a, b) => a.username < b.username ? -1 : a.username > b.username ? 1 : 0);

  const messages = Object.keys(state.messages)
    .map(iter => {
      const message = state.messages[iter];
      const user = state.users[message.user_id];

      return {
        type: message.type,
        id: message.id,
        content: message.content,
        username: user.username,
        date: message.date
      }
    })
    .sort((a, b) => a.date - b.date)

  return {
    users,
    messages
  }
}

module.exports = function Sockets(io, { dispatch, getState, subscribe }, { addUser, removeUser, addMessage }) {
  subscribe(() => {
    io.sockets.emit('chat:sync', storeToChat(getState()));
  });

  io.on('connection', socket => {
    socket.emit('chat:sync', storeToChat(getState()));

    socket.on('chat:createUser', ({ username, color }) => {
      dispatch(addUser(username, color, socket.id));
    });

    socket.on('chat:addMessage', ({ username, content }) => {
      dispatch(addMessage(username, content));
    });

    socket.on('disconnect', reason => {
      dispatch(removeUser(socket.id));
    });
  });
}
