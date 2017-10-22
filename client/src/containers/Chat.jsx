import React from 'react';

import { connect } from 'react-redux';

import { Grid, Segment } from 'semantic-ui-react';

import { addMessage } from 'app/redux/chat';

import UserList from 'app/components/UserList.jsx';
import MessageList from 'app/components/MessageList.jsx';

const mapStateToProps = ({ chat }) => ({
  messages: chat.messages,
  users: chat.users
});

function Chat(props) {
  return (
    <Segment basic className='chat'>
      <section className='users'>
        <Segment basic className='userlist'>
          <UserList { ...props } />
        </Segment>
      </section>
      <section className='messages'>
        <Segment basic>
          <MessageList { ...props } />
        </Segment>
      </section>
    </Segment>
  )
}

export default connect(mapStateToProps)(Chat);
