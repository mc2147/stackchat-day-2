// Whoa?!? What is this?
// Thanks to the style-loader, sass-loader and css-loader, webpack allows us import scss,
// compiles it into css, and then auto-magically injects a <style> tag onto the DOM!
// Wowzers! Check out the webpack.config.js to see how to add them!
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components';

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('app')
);

import store, { gotMessagesFromServer } from './store';

const unsubscribe = store.subscribe(function () {
  console.log('----------------');
  console.log('State changed!!', store.getState());
});

store.dispatch(gotMessagesFromServer([{ author: 'Milton', content: 'Hey @channel' }]));
store.dispatch(gotMessagesFromServer([{ author: 'Marcy', content: 'Anybody @here want ice cream?' }]));

unsubscribe();

store.dispatch(gotMessagesFromServer([{ author: 'Astro', content: 'To infinity and beyond!' }]));