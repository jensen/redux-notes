import React, { Component } from 'react';

import { Input, Form } from 'semantic-ui-react';

export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  onSubmitMessage = event => {
    if(this.state.message === '') return;

    this.props.addMessage(this.props.user.name, this.state.message);
    this.setState({
      message: ''
    });
  }

  onChangeMessage = event => {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    const { message } = this.state;

    return (
      <Form onSubmit={ this.onSubmitMessage }>
        <Form.Field>
          <Input
            size='massive'
            fluid
            icon='chevron right' iconPosition='left'
            action={{ color: 'teal', labelPosition: 'right', icon: 'send', content: 'Enter', onClick: this.onSubmitMessage }}
            value={ message }
            onChange={ this.onChangeMessage } />
        </Form.Field>
      </Form>
    )
  }
}
