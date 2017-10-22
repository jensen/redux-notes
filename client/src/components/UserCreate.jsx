import React, { Component } from 'react';

import { CirclePicker } from 'react-color';

import { Button, Card, Icon, Image, Input, Form, Segment } from 'semantic-ui-react';

import Avatar from 'app/lib/avatar';

export default class UserCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      color: props.color
    }
  }

  onChangeName = ({ target }) => {
    this.setState({
      name: target.value
    });
  }

  onChangeColor = (color, event) => {
    this.setState({
      color: color.hex
    });
  }

  onSubmitLogin = event => {
    this.props.setColor(this.state.color);
    this.props.setName(this.state.name);
    this.props.addUser(this.state.name);
  }

  render() {
    const { name, color } = this.state;
    const { users } = this.props;

    const disabled = name === '' || users.find(u => u.username === name) || name.length > 16;

    return (
      <Card>
        <Image src={ Avatar(this.state.name, 290) } />
        <Card.Content>
          <Segment basic>
            <Form onSubmit={ this.onSubmitLogin }>
              <Input fluid onChange={ this.onChangeName } />
            </Form>
          </Segment>
          <Segment basic>
            <CirclePicker color={ this.state.color } onChange={ this.onChangeColor } />
          </Segment>
        </Card.Content>
        <Card.Content extra>
          <Button fluid positive disabled={ disabled } onClick={ this.onSubmitLogin }>Login</Button>
        </Card.Content>
      </Card>
    )
  }
}
