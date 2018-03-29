import React, { Component } from 'react';
import store, { gotMessagesFromServer, creatingNewMessage, gotNewMessageFromServer } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {


  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    // axios.get('/api/messages')
    //   .then(res => res.data)
    //   .then(messages => store.dispatch(gotMessagesFromServer(messages)));

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = (event) => {

    store.dispatch(creatingNewMessage(event.target.value)) //this sets state.draftmessage = the message, why do we do this on line 34 also?

  }

  handleSubmit = (event) => {

    event.preventDefault();

    axios.post('/api/messages', {
      content: this.state.draftMessage,
      channelId: this.props.channelId
    })
      .then(res => res.data)
      .then(message => {
        store.dispatch(gotNewMessageFromServer(message));
        socket.emit('new-message', message);
      });


  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            value={this.state.draftMessage}//why do we need this if we pass the test directly to handleChange?
            onChange={this.handleChange}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
