import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  AuthContext  from './store/Auth.jsx'
import PostStore,{firebaseContext} from './store/Post'
import  SocketContext  from './store/Socket.jsx'
import { auth,db,storage } from './firebase/Config.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <firebaseContext.Provider value={{auth,db,storage}}>
   <AuthContext>
    <SocketContext>
      <PostStore>
      <App />
      </PostStore>
    </SocketContext>
    </AuthContext>
    </firebaseContext.Provider>
  </React.StrictMode>,
)
