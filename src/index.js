import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import 'tw-elements';
const history = createMemoryHistory();


ReactDOM.render(
  <Router history={ history }>
  <App />
</Router>,
  document.getElementById('root'),
);
