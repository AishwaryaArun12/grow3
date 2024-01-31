import axios,{URL} from '../axiosConfig'
import  { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import { useSearchParams } from 'react-router-dom';
import PostModalbody from '../components/PostModalbody';
import {FaCalendarAlt} from 'react-icons/fa'
import defaultProfile from '../assets/defaultProfile.png'
import { MdPhotoLibrary } from 'react-icons/md'
import Modal from '../components/Modal';
import Premium from '../components/Premium'
import Posts from '../components/Posts';
import { AuthContext } from '../store/Auth';
import { postContext } from '../store/Post';
import EventModalBody from '../components/EventModalBody';

const Home = () => {
  
  const {user,setUser} = useContext(AuthContext)
  const {getAllPosts}= useContext(postContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
   

    async function googleAuth(){
        try {
          const res =  await axios.post('/auth/setToken',{id});
          setUser(res.data.user);
        } catch (error) {
            navigate('/login')
        }
    }
    useEffect(()=>{
        if(!localStorage.getItem('loginUser')){
            if(id){
                googleAuth().then(()=>{
                  getAllPosts();
                })
            }else{
                navigate('/login')
            }
        }else{
          axios.get('/getUser').then(res=>{setUser(res.data.user); getAllPosts()}).catch(err=>{
           
            if(err.response.status == 401){
             // window.location.href = '/login'
            }
          })
        }
       
    },[]);
    const profileIcon = (<div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
    <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${URL}/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
  </div>)
  
    const buttonContent = (<div className='flex mt-5 w-full'>
    <div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
      <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${URL}/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
    </div>
    <div className='h-12 rounded-full w-full ml-1 p-2 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
      <p>Start a post...</p>
    </div>
  </div>)
  const imageButton = (<div className='flex pt-4'>
  <MdPhotoLibrary size={27} color="blue" className='opacity-80' />
  <p>Media</p>
  </div>)
   
  return (
    <div className='h-screen w-full'>
      <div className=' h-16'>
      <Nav />
      </div>
      <div className='lg:flex sm:block w-full  flex-1'  style={{height : '730px'}}>
      <div className='bg-gray-100 fixed  w-4/12 mr-3 py-4 h-full  hidden lg:block ' >
              <div className='bg-white w-11/12 m-4 p-3 h-40 border-2 rounded-xl'>
            
                    <Modal profileIcon= {profileIcon} button={buttonContent} title='What do you want to talk about' body={PostModalbody}/>
                    <div className='flex justify-around'>
                      <Modal button={imageButton} profileIcon= {profileIcon} title='What do you want to talk about' body={PostModalbody}/>
                      <Modal button={(<div className='flex pt-4'>
                      <FaCalendarAlt size={25} color="black" className='opacity-80' />
                      <p>Event</p>
                      </div>)} profileIcon= {profileIcon} title='Create an event' body={EventModalBody}/>
                      
                    </div>
              </div >
              <Premium />
            </div>
            <div className='hidden lg:block w-5/12 mr-2'></div>
            <div className='bg-gray-100 w-full lg:w-7/12 mr-14 '>
                <Posts/>
            </div>
            <div className='bg-gray-100 w-auto mr-3 '>

            </div>
      </div>
    </div>
  )
}

export default Home
