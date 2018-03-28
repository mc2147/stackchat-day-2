import { createStore } from 'redux'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const initialState = {
    messages: []
};

export const gotMessagesFromServer = (messages) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: messages
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return Object.assign({}, state, { messages: action.messages }) //why do we need to pass in the old state here? so the non overwritten keys persist on the new state
        default:
            return state;
    }
}

const store = createStore(reducer)
export default store;