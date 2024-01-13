import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  AuthContext  from './store/Auth.jsx'
import Post from './store/Post'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Post>
   <AuthContext>
    <App />
    </AuthContext>
   </Post>
  </React.StrictMode>,
)
