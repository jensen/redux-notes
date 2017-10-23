/* eslint no-console: 0  */

const express = require('express');
const { createStore } = require('redux');

const application = express();
const server = require('http').Server(application);
const io = require('socket.io')(server);

const Sockets = require('./sockets');
const Profiling = require('./profiling');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const chat = require('./chat');

const store = createStore(chat.reducer, {
  users: {},
  messages: {}
});

application.use(express.static('build'));

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} in ${ENV} mode.`);
  Sockets(io, store, chat.actions);
  Profiling(io, store, chat.actions);
});
