const pmx = require('pmx');
const probe = pmx.probe();

function messagesPerMinute(messages, milliseconds) {
  const seconds = milliseconds/1000;
  const minutes = seconds/60;

  return messages/minutes;
}

module.exports = function Profiling(io, { dispatch, getState }, { removeUser, addNotification }) {
  probe.metric({
    name: 'Realtime user',
    value: () => {
      return Object.keys(getState().users).length
    }
  });

  probe.metric({
    name: 'Realtime messages',
    value: () => {
      return Object.keys(getState().messages).length
    }
  });

  probe.metric({
    name: 'Realtime mpm',
    value: () => {
      const current = getState().messages;
      const messages = Object.keys(current).map(id => current[id]).sort((a, b) => a.date - b.date);

      return messages.length > 2 ? messagesPerMinute(messages.length, Date.now() - messages[0].date): 0;
    }
  });

  pmx.action('admin:watching', (reply) => {
    dispatch(addNotification('Admin is watching.'));
    reply({ success: true });
  });

  pmx.action('admin:kick', (param, reply) => {
    const current = getState().users;
    const user = Object.keys(current).find(user => current[user].username === param);

    io.to(current[user].socket).emit('chat:kicked');

    dispatch(addNotification(`${current[user].username} was kicked.`));
    dispatch(removeUser(user))

    reply({ success: true });
  });
};
