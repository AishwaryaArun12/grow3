import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
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


const App = () => {
  const {setUser} = useContext(AuthContext)
  const {getAllPosts} = useContext(postContext)
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
      </Routes>
      <Routes>
        <Route exact path='/selectuser' element={<SelectUser />}/>
      </Routes>
       <Routes>
        <Route exact path='/signup' element={<SignUp />}/>
      </Routes>
      <Routes>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
      <Routes>
        <Route exact path='/otp' element={<Otp />}/>
      </Routes>
      <Routes>
        <Route exact path='/admin/home' element={<HomeAdmin />}/>
      </Routes>
      <Routes>
        <Route exact path='/forgotemail' element={<Forgot_Email />}/>
      </Routes>
      <Routes>
        <Route exact path='/changepassword' element={<ChangePassword />}/>
      </Routes>
      <Routes>
        <Route exact path='/profile' element={<Profile />}/>
      </Routes>
      <Routes>
        <Route exact path='/premium' element={<Pricing />}/>
      </Routes>
      <Routes>
        <Route exact path='/user/:id' element={<UserProfile />}/>
      </Routes>
      <Routes>
        <Route exact path='/admin/users' element={<AdminUsers />}/>
      </Routes>
      <Routes>
        <Route exact path='/admin/user/:id' element={<AdminUserProfile />}/>
      </Routes>
      <Routes>
        <Route exact path='/admin/subscription' element={<Subscription />}/>
      </Routes>
      <Routes>
        <Route exact path='/admin/reports' element={<AdminReport />}/>
      </Routes>
      <Routes>
        <Route exact path='/chat' element={<Chat />}/>
      </Routes>
       </Router>
      
    </div>
  )
}

export default App
