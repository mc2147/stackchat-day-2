import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addChannel} from '../store';
import {postChannel} from '../store';

function NewChannelEntry (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input 
        value={props.newChannelEntry} 
        onChange={props.handleChange}
        className="form-control" type="text" 
        name="channelName" placeholder="Enter channel name" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

/** Write your `connect` component below! **/
function mapStateToProps(state) {
  return {
    newChannelEntry: state.newChannelEntry,    
  };
}
function mapDispatchToProps(dispatch, ownProps) {//???
  console.log("ownProps", ownProps);
  return {
    handleChange: function(event) {
      // console.log(event.target.value);
      dispatch(addChannel(event.target.value));
    },
    handleSubmit: function(event) {
      event.preventDefault();
      console.log("submit", event.target.channelName.value);
      // dispatch(addChannel(""));
      // event.target.channelName = "";
      // state.newChannelEntry = "";
      dispatch(postChannel(event.target.channelName.value, ownProps.history));
    }
  };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);

export default Container;