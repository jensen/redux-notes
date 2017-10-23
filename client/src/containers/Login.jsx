import React from 'react';
import { connect } from 'react-redux';

import { Modal } from 'semantic-ui-react';

import { setName, setColor } from 'app/redux/user';
import { remoteCreateUser, remoteAddNotification } from 'app/redux/chat';

import UserCreate from 'app/components/UserCreate.jsx';

const mapStateToProps = ({ user: { name, color }, chat: { users } }) => ({
  name,
  color,
  users
});

const mapDispatchToProps = {
  setName,
  setColor,
  remoteCreateUser,
  remoteAddNotification
};

function Login(props) {
  return (
    <Modal basic open={ true }>
      <Modal.Content>
        <Modal.Description>
          <UserCreate { ...props } />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
