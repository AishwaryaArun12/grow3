import { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import defaultProfile from '../assets/defaultProfile.png'
import coverImg from '../assets/cover.jpg';
import axios from '../axiosConfig';
import ProfileDetail from '../components/ProfileDetail'
import { MdPhotoLibrary } from 'react-icons/md'
import { FaCalendarAlt} from 'react-icons/fa';
import Modal from '../components/Modal';
import PostModalbody from '../components/PostModalbody'
import Premium from '../components/Premium'
import { Button } from 'flowbite-react';
import { postContext } from '../store/Post';
import Post from '../components/Post';
import { Link,  Element, animateScroll as scroll,  } from 'react-scroll';
import FriendNotification from '../components/FriendNotification';


const Profile = () => {
    const [user,setUser] = useState({});
    const {posts} = useContext(postContext)
    const [userPosts,setUserPosts] = useState([]);
    const [targetDiv, setTargetDiv] = useState('mydiv');

    useEffect(() => {
      // Check the window width and set the targetDiv accordingly
      const handleResize = () => {
        if (window.innerWidth < 700) {
          setTargetDiv('button');
        } else {
          setTargetDiv('mydiv');
        }
      };
  
      // Initial check on component mount
      handleResize();
  
      // Listen for window resize events
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

      const scrollToTop = () => {
        scroll.scrollToTop();
      };

    const initialButton = [{name: 'Personal Details',current: true},
    {name : 'Posts', current : false},
     {name : 'Events', current : false},
     {name : 'Notifications', current : false}]
    const [buttons,setButtons] = useState(initialButton);
   
    useEffect(()=>{
      axios.get('/post/getallposts/0/0').then(res=>{
        
        setUserPosts(()=> res.data.posts.filter(i=>i.userId._id == user._id))
      })
      
    },[posts])

    async function userData(){  
      const user = await axios.get('/getUser');
      setUser(user.data.user)     
    }
    useEffect(()=>{
        userData();
    },[])
     
      async function uploadCover(file){
        const formData = new FormData();
          formData.append('profileImage', file);
           try {
            await axios.post('/uploadcover',formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }});
              userData();
           } catch (error) {
              console.log(error);
           }
        }
    
      async function uploadImg(file){
        const formData = new FormData();
        formData.append('profileImage', file);

          try {
            await axios.post('/uploadimg',formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }});
  
              userData();
          } catch (error) {
            console.log(error)
          }
       }

    const profileIcon = (<div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
    <img className='w-full h-full object-cover bg-transparent' src={ user.profileImg ? `http://localhost:3000/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
  </div>)
  
    const buttonContent = (<div className='flex mt-5 '>
    <div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
      <img className='w-full h-full object-cover bg-transparent' src={ user.profileImg ? `http://localhost:3000/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
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
    <div className='h-auto'>
        <div className='h-16 w-full '>
        <Nav/>
        </div>
        <div className='block lg:flex flex-1 w-full'  style={{height : '645px'}} >
            <div className= 'lg:fixed block bg-gray-100  lg:w-4/12  mb-0 '  >
              <div className='bg-white w-11/12 my-4 lg:m-4 p-3 h-40 border-2 rounded-xl'>
            
                    <Modal profileIcon= {profileIcon} button={buttonContent} title='What do you want to talk about' body={PostModalbody}/>
                    <div className='flex justify-around'>
                      <Modal button={imageButton} profileIcon= {profileIcon} title='What do you want to talk about' body={PostModalbody}/>
                      <div className='flex pt-4'>
                      <FaCalendarAlt size={25} color="black" className='opacity-80' />
                      <p>Event</p>
                      </div>
                    </div>
              </div >
              <Element name='button'></Element>
              <Premium />
              
              <div className='lg:w-full  lg:mt-2  m-6 lg:grid lg:grid-cols-2'>
             {buttons.map((i,j)=>{
              return (
                <Button key={j} onClick={()=>{setButtons((prev) => prev.map((obj,index)=>({...obj,current : index ==j})));}}
                 className={`${i.current ? ' shadow-black shadow-xl bg-gradient-to-br from-blue-900 via-black to-blue-900' : 'bg-gradient-to-br from-black via-blue-900 to-black'} w-9/12 m-6   lg:m-2 hover:bg-blue-900  transition-all duration-300 rounded-md cursor-pointer focus:ring-0`} >
                <p >{i.name}</p>
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                </Button>
              )
             })}
              </div>
            </div>
            <div className='lg:w-4/12 hidden lg:block w-12/12'>

            </div>
           
            <div  className='bg-gray-100 m-0 p-0 lg:mx-20 lg:p-4 lg:px-4 w-full lg:w-7/12 h-fit  '>
            
           
             {buttons[0].current && <div>
                <div>
                  {/* Cover Photo */}
                  <div className='relative h-56 w-full bg-blue-500'>
                  <label htmlFor="cover">
                  <img  src={ user.coverPhoto ? `http://localhost:3000/${user.coverPhoto.replace('uploads\\', '')}` : coverImg} 
                  alt="" 
                  
                  className='h-full w-full' 
                  />
                  <input
                  name='profileImage'
                  id='cover'
                    type="file"
                    className='sr-only'
                    onChange={(e)=>{uploadCover(e.target.files[0])}}
                  />
                  </label>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                      {/* Your cover photo content */}
                    </div>
                    
                  </div>

                  {/* Profile Photo */}
                  <div className='w-32 h-32 overflow-hidden rounded-full border-2 border-white shadow-md relative -mt-20 ml-4'>
                    {/* Profile Photo Image */}
                    <label htmlFor="img">
                    <img
                      src={ user.profileImg ? `http://localhost:3000/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} 
                      alt='Profile'
                      className='w-full h-full object-cover bg-transparent'
                      
                    />
                    <input
                    name='img'
                    id='img'
                    type="file"
                    className='sr-only'
                    onChange={(e)=>{uploadImg(e.target.files[0])}}
                  />
                    </label>
                  </div>
                  
                </div>
                <div className=''>
                    <ProfileDetail userData={userData} user={user} posts={[]} events={[]} param={true}/>
                </div>
                <div className='w-full'>
                  <FriendNotification user={user} userData={userData}/>
                </div>
               
              </div>}
              <Element name='mydiv' id='mydiv'></Element>
             {buttons[1].current && <div >
          <h2 className='m-2 p-1 text-lg font-bold'>My Posts</h2>
          
          <div className='m-1 lg:px-2 h-full ' >
        {userPosts.length != 0 ? userPosts.map((post) => (
          <>
          <Post key={post.id}  post={post} />
          <hr/>
          </>
        )) : <h2 className='text-xl font-bold ml-12'>No Posts Yet</h2>}
       
        </div>
        
        
        </div>}
        {/* <Link to={targetDiv}   activeClass="active" 
          spy={true} 
          smooth={true} 
          offset={50} 
          duration={500} 
          onClick={() => console.log('Link Clicked')}> */}
            <a onClick={scrollToTop}>
            <Button className='focus:ring-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 fixed right-36 bottom-12 rounded-full w-12 h-12 '>
              <svg className="h-5 w-5  animate-bounce" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2l8 16H2L10 2z" />
              </svg>
            </Button>
            </a>
            {/* </Link> */}
          </div>

        </div>
        
    </div>
  )
}

export default Profile
