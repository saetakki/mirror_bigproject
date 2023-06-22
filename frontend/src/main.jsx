import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/reset.css'
import axios from 'axios'
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
