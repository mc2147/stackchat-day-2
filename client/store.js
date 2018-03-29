import { createStore } from 'redux'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const CREATING_NEW_MESSAGE = 'CREATING_NEW_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';



const initialState = {
    messages: [],
    draftMessage: ''
};

export const gotMessagesFromServer = (messages) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: messages
    }
};

export const creatingNewMessage = (draft) => {
    return {
        type: CREATING_NEW_MESSAGE,
        draftMessage: draft
    }
};

export const gotNewMessageFromServer = (message) => {
    return {
        type: GOT_NEW_MESSAGE_FROM_SERVER,
        message: message
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return Object.assign({}, state, { messages: action.messages }) //why do we need to pass in the old state here? so the non overwritten keys persist on the new state
        case CREATING_NEW_MESSAGE:
            return Object.assign({}, state, { draftMessage: action.draftMessage })
        case GOT_NEW_MESSAGE_FROM_SERVER:
            return Object.assign({}, state, { messages: state.messages.concat(action.message) })
            //return  { ...state, messages:[ ...prevState.messages, action.message ] } //this should be the same as above
        default:
            return state;
    }
}

const store = createStore(reducer)
export default store;