import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from 'easy-peasy'

import './index.css'
import App from './App'
import store from './store'


ReactDOM.render(
  <React.StrictMode>
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
