import React, { useContext, useEffect, useCallback } from 'react'
import {BrowserRouter as Router,Routes, Route, useNavigate} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Otp from './pages/otp'
import SelectUser from './pages/SelectUser'
import Home from './pages/Home'
import HomeAdmin from './pages/HomeAdmin'
import Forgot_Email from './pages/Forgot_Email'
import ChangePassword from './pages/ChangePassword'
import Profile from './pages/Profile'
import Pricing from './pages/Pricing'
import { postContext } from './store/Post'
import { AuthContext } from './store/Auth'
import axios from './axiosConfig'
import UserProfile from './pages/UserProfile'
import AdminUsers from './pages/AdminUsers'
import AdminUserProfile from './pages/AdminUserProfile'
import Subscription from './pages/Subscription'
import AdminReport from './pages/AdminReport'
import Chat from './pages/Chat'
import VideoRoom from './pages/VideoRoom'
import { useSocket } from './store/Socket'
import peer from './service/peer'
import { SocketContext } from './store/Socket'
import Event from './pages/Event'
import EventDetail from './pages/EventDetail'
import Partners from './pages/Partners'
import NotFound from './pages/NotFound'

const App = () => {
  const {user,setUser} = useContext(AuthContext)
  const {remoteSocketId,setRemoteSocketId} = useContext(SocketContext)
  
  const socket = useSocket();

  

  useEffect(()=>{
    axios.get('/getUser').then(res=>{setUser(res?.data.user); }).catch(err=>{
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      if(err.response?.status == 401){
        window.location.href = '/login'
      }
    })
    
  },[])




  return (
    <div>
     
       <Router>
       <Routes>
        <Route exact path='/' element={<Home />}/>
      
        <Route exact path='/selectuser' element={<SelectUser />}/>
      
        <Route exact path='/signup' element={<SignUp />}/>
   
        <Route exact path='/login' element={<Login />}/>
     
        <Route exact path='/otp' element={<Otp />}/>
     
        <Route exact path='/admin/home' element={<HomeAdmin />}/>
     
      
        <Route exact path='/forgotemail' element={<Forgot_Email />}/>
      
     
        <Route exact path='/changepassword' element={<ChangePassword />}/>
      
      
        <Route exact path='/profile' element={<Profile />}/>
      
      
        <Route exact path='/premium' element={<Pricing />}/>
      
        <Route exact path='/user/:id' element={<UserProfile />}/>
      
      
        <Route exact path='/admin/users' element={<AdminUsers />}/>
      
      
        <Route exact path='/admin/user/:id' element={<AdminUserProfile />}/>
     
      
        <Route exact path='/admin/subscription' element={<Subscription />}/>
      
      
        <Route exact path='/admin/reports' element={<AdminReport />}/>
      
      
        <Route exact path='/chat' element={<Chat />}/>
      
      
        <Route exact path='/video/room/:room' element={<VideoRoom />}/>
      
      
        <Route exact path='/event' element={<Event />}/>
      
      
        <Route exact path='/event/:id' element={<EventDetail />}/>
      
      
        <Route exact path='/partners' element={<Partners />}/>
     
      
        <Route path="*" element={<NotFound />}/>
     </Routes>
       </Router>
      
    </div>
  )
}

export default App
