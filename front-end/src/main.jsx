import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  AuthContext  from './store/Auth.jsx'
import PostStore from './store/Post'
import  SocketContext  from './store/Socket.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
   <AuthContext>
    <SocketContext>
      <PostStore>
      <App />
      </PostStore>
    </SocketContext>
    </AuthContext>
  
  </React.StrictMode>,
)
