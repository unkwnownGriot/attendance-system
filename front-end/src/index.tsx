import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
       <AuthContextProvider>
            <App/>
         </AuthContextProvider> 
    </BrowserRouter>,
  document.getElementById('root')
);
