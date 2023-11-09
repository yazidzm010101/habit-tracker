import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes/Router.tsx';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <div className='pointer-events-none flex items-center justify-center fixed w-[4rem] h-[4rem] top-0 right-0 origin-center rotate-45'>
      <div className='bg-orange-500 font-bold font-sans_condensed text-white px-10 text-center'>Development</div>
    </div>
    <Provider store={store}>
      <BrowserRouter basename='/habit-tracker'>
        <Router/>
      </BrowserRouter>
    </Provider>
    <Toaster containerClassName='md:pl-[300px]'/>
  </React.StrictMode>,
)
