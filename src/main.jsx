import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Version-based cache clear — forces fresh data when app updates
const SN_VERSION = 'studentnest_v3_lang'
if (localStorage.getItem('sn_version') !== SN_VERSION) {
  localStorage.removeItem('studentnest_users')
  localStorage.removeItem('studentnest_session')
  localStorage.removeItem('studentnest_joined')
  localStorage.removeItem('sn_user_posts')
  localStorage.removeItem('sn_liked')
  localStorage.setItem('sn_version', SN_VERSION)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
