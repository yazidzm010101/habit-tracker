import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes/Router.tsx';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <Provider store={store}>
      <BrowserRouter basename='/habit-tracker'>
        <Router/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
