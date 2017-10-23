import React from 'react';

import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.css';
import 'styles/application.scss';

import { Segment } from 'semantic-ui-react';

import { remoteAddMessage } from 'app/redux/chat';

import Login from 'app/containers/Login.jsx';
import Chat from 'app/containers/Chat.jsx';
import Navigation from 'app/containers/Navigation.jsx';
import MessageInput from 'app/components/MessageInput.jsx';

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = {
  remoteAddMessage
};

function Root(props) {
  if(props.user.name === '') return <Login />;

  return (
    <main>
      <header>
        <Navigation />
      </header>
      <section>
        <Chat />
      </section>
      <footer>
        <Segment basic>
          <MessageInput { ...props } />
        </Segment>
      </footer>
    </main>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
