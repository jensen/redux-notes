import React from 'react';

import { Image, List } from 'semantic-ui-react';

export default function UserList(props) {
  const users = props.users.map(user => (
    <List.Item key={ user.username }>
      <Image avatar src={ `https://api.adorable.io/avatars/40/${user.username}.png` } />
      <List.Content>
        <List.Header style={{ color: user.color }}>{ user.username }</List.Header>
      </List.Content>
    </List.Item>
  ));

  return (
    <List size='large' verticalAlign='middle'>
      { users }
    </List>
  )
}
