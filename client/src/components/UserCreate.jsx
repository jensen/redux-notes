import React, { Component } from 'react';

import { CirclePicker } from 'react-color';

import { Button, Card, Image, Input, Form, Segment } from 'semantic-ui-react';

import Avatar from 'app/lib/avatar';

export default class UserCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      color: props.color
    }
  }

  disabled() {
    const { name } = this.state;
    const { users } = this.props;

    return name === '' || users.find(u => u.username === name) || name.length > 16;
  }

  onChangeName = ({ target }) => {
    this.setState({
      name: target.value
    });
  }

  onChangeColor = color => {
    this.setState({
      color: color.hex
    });
  }

  onSubmitLogin = () => {
    if(this.disabled()) return;

    const { name, color } = this.state;

    this.props.setColor(color);
    this.props.setName(name);
    this.props.remoteCreateUser(name, color);
  }

  render() {
    const { name, color } = this.state;

    return (
      <Card>
        <Image src={ Avatar(name, 290) } />
        <Card.Content>
          <Segment basic>
            <Form onSubmit={ this.onSubmitLogin }>
              <Input fluid onChange={ this.onChangeName } />
            </Form>
          </Segment>
          <Segment basic>
            <CirclePicker color={ color } onChange={ this.onChangeColor } />
          </Segment>
        </Card.Content>
        <Card.Content extra>
          <Button fluid positive disabled={ this.disabled() } onClick={ this.onSubmitLogin }>Login</Button>
        </Card.Content>
      </Card>
    )
  }
}
