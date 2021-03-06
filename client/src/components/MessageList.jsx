/* eslint react/no-find-dom-node: 0 */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import moment from 'moment';

import { Comment } from 'semantic-ui-react';

function Message(props) {
  return (
    <Comment>
      <Comment.Avatar src={ `https://api.adorable.io/avatars/60/${props.username}.png` }/>
      <Comment.Content>
        <Comment.Author style={{ color: props.color, display: 'inline-block' }}>{ props.username }</Comment.Author>
        <Comment.Metadata>{ moment(props.date).fromNow() }</Comment.Metadata>
        <Comment.Text>{ props.content }</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

function Notification(props) {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author style={{ display: 'inline-block' }}>System</Comment.Author>
        <Comment.Metadata>{ moment(props.date).fromNow() }</Comment.Metadata>
        <Comment.Text>{ props.content }</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default class MessageList extends Component {
  componentDidMount() {
    findDOMNode(this.end).scrollIntoView(true);
  }

  componentDidUpdate() {
    findDOMNode(this.end).scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messages = this.props.messages.map(message => (
      message.type === 'CHAT_MESSAGE' ?
        <Message key={ message.id } { ...message } /> :
        <Notification key={ message.id } { ...message } />
    ));

    return (
      <Comment.Group size='huge' style={{ maxWidth: '100%' }} >
        { messages }
        <div ref={ ref => this.end = ref }></div>
      </Comment.Group>
    )
  }
}
