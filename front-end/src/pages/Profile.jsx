import { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import defaultProfile from '../assets/defaultProfile.png'
import coverImg from '../assets/cover.jpg';
import axios ,{URL} from '../axiosConfig';
import ProfileDetail from '../components/ProfileDetail'
import { MdPhotoLibrary } from 'react-icons/md'
import { FaCalendarAlt} from 'react-icons/fa';
import Modal from '../components/Modal';
import PostModalbody from '../components/PostModalbody'
import Premium from '../components/Premium'
import { Button } from 'flowbite-react';
import {firebaseContext, postContext } from '../store/Post';
import Post from '../components/Post';
import { Link,  Element, animateScroll as scroll,  } from 'react-scroll';
import FriendNotification from '../components/FriendNotification';
import EventModalBody from '../components/EventModalBody';
import Confirm from '../components/Confirm';
import { ref,uploadBytes,getDownloadURL,deleteObject } from "firebase/storage";
import { AuthContext } from '../store/Auth';


const Profile = () => {
    const {user,setUser} = useContext(AuthContext);
    const {posts} = useContext(postContext)
    const [userPosts,setUserPosts] = useState([]);
    const [targetDiv, setTargetDiv] = useState('mydiv');
    const [events,setEvents] = useState([]);
    const [dropdown,setDropdown] = useState(false);
    const [ registered,setRegistered] = useState([]);
    const {db,storage} = useContext(firebaseContext)

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
      {name : 'Registered Events', current : false}
  ]
    const [buttons,setButtons] = useState(initialButton);
   
    useEffect(()=>{
      axios.get('/post/getallposts/0/0').then(res=>{
        
        setUserPosts(()=> res.data.posts.filter(i=>i.userId._id == user?._id))
      })
      
    },[posts])
    async function getEvents(){
      const event = await axios.get(`/event/user_event/${localStorage.getItem('id')}`)
      setEvents(event.data.result);
    }

    async function getRegistered(){
      const event = await axios.get('/event/getallevents')
      setRegistered(event.data.events.filter(event=>event.attendees.includes(localStorage.getItem('id'))))
    } 

    async function userData(){  
      const user = await axios.get('/getUser');
      setUser(user.data.user)     
    }
    useEffect(()=>{
        getEvents();
        getRegistered();
    },[])
     
      async function uploadCover(file){

        const imageRef = ref(storage, file.name);
        const pathImagesRef = ref(storage, `images/${file.name}`);
        
        uploadBytes(pathImagesRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!',snapshot);
          getDownloadURL(ref(storage, pathImagesRef))
      .then(async(url) => {
        const file = url;
       const res = await axios.post('/uploadcover',{file})
          userData();
          console.log(res)
      })
        });
          
        }
    
      async function uploadImg(file){
        const imageRef = ref(storage, file.name);
        const pathImagesRef = ref(storage, `images/${file.name}`);
        
        uploadBytes(pathImagesRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!',snapshot);
          getDownloadURL(ref(storage, pathImagesRef))
      .then(async(url) => {
        const file = url;
        const res = await axios.post('/uploadimg',{file});
        console.log(res,url);
          userData();
      })
        });

       }

    const profileIcon = (<div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
    <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${user?.profileImg}` : defaultProfile} alt="" />
  </div>)
  
    const buttonContent = (<div className='flex mt-5 '>
    <div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
      <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${user?.profileImg}` : defaultProfile} alt="" />
    </div>
    <div className='h-12 rounded-full w-full ml-1 p-2 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
      <p>Start a post...</p>
    </div>
  </div>)
  const imageButton = (<div className='flex pt-4'>
  <MdPhotoLibrary size={27} color="blue" className='opacity-80' />
  <p>Media</p>
  </div>)

  const remove =async (event)=>{
    try {
      
      const res = await axios.delete(`/event/delete/${event._id}/${event.media}`);
      
      getEvents();
    } catch (error) {
      console.log(error)
    }
  }

  const attend = async(id)=>{
    try {
      await axios.patch('/event/add_attendee', {id:localStorage.getItem('id'),eventId : id})
      getRegistered();
    } catch (error) {
      console.log('error');
    }
 }
 const cancel = async(id)=>{
  try {
    await axios.patch('/event/remove_attendee', {id:localStorage.getItem('id'),eventId : id})
    getRegistered();
  } catch (error) {
    console.log('error');
  }
}

const parseDate = (dateString) => {
  if(dateString ){
    const [day,month,YearTimePeriod] = dateString?.split('-');
  const [year,timePeriod] = YearTimePeriod?.split(',');
  let [hours, minutes] = timePeriod?.split(':');
  const isPM = minutes?.includes('PM');
  minutes = minutes?.slice(0,3)
  return new Date(parseInt(year),parseInt(month)-1,parseInt(day),isPM ? parseInt(hours) + 12 : parseInt(hours),parseInt(minutes),0,0);
  }
};
   
  return (
    <div className='h-auto'>
        <div className='h-16 w-full '>
        <Nav/>
        </div>
        <div className='block lg:flex flex-1 w-full'  style={{height : '640px'}} >
            <div className= 'lg:fixed block h-full bg-gray-100  lg:w-4/12  mb-0 '  >
              <div className='bg-white w-11/12 my-4 lg:m-4 p-3 h-40 border-2 rounded-xl'>
            
                    <Modal profileIcon= {profileIcon} button={buttonContent} title='What do you want to talk about' body={PostModalbody}/>
                    <div className='flex justify-around'>
                      <Modal button={imageButton} profileIcon= {profileIcon} title='What do you want to talk about' body={PostModalbody}/>
                      <Modal button={(<div className='flex pt-4'>
                      <FaCalendarAlt size={25} color="black" className='opacity-80' />
                      <p>Event</p>
                      </div>)} profileIcon= {profileIcon} title='Create an event' body={EventModalBody}/>
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
           
            <div  className='bg-gray-100 m-0 p-0 lg:mx-20 lg:p-4 lg:px-4 w-full lg:w-7/12   '>
            
           
             {buttons[0].current && <div>
                <div>
                  {/* Cover Photo */}
                  <div className='relative h-56 w-full bg-blue-500'>
                  <label htmlFor="cover">
                  <img  src={ user?.coverPhoto ? `${user?.coverPhoto}` : coverImg} 
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
                      src={ user?.profileImg ? `${user?.profileImg}` : defaultProfile} 
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
                    <ProfileDetail userData={userData} user={user} posts={posts} events={events} param={true}/>
                </div>
                <div className='w-full'>
                  <FriendNotification user={user} userData={userData}/>
                </div>
               
              </div>}
              <Element name='mydiv' id='mydiv'></Element>
             {buttons[1].current && <div >
          <h2 className='p-3 rounded-2xl bg-gray-50 m-2 text-lg font-bold'>My Posts</h2>
          
          <div className='m-1 lg:px-2 h-full ' >
        {userPosts.length != 0 ? userPosts.map((post) => (
          <>
          <Post key={post.id}  post={post} />
          <hr/>
          </>
        )) : <h2 className='text-xl font-bold ml-12 mt-32'>No Posts Yet</h2>}
       
        </div>
        
        
        </div>}
        {buttons[2].current && <div>
          <h2 className='m-2 p-3 rounded-2xl bg-gray-50 text-lg font-bold'>My Events</h2>
          
          <div className='m-1 lg:px-2 h-full ' >
        {events.length != 0 ? events.map((event) => (
          <>
          <div className=' max-w-full mb-4 rounded-lg'>
          <div className='text-end'>
        {parseDate(event.startTime).getTime() > Date.now() && <button
          id="dropdownComment1Button"
          onClick={()=>{setDropdown(!dropdown)}}
          className="my-3 inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:bg-white rounded-lg bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>}
        {/* Dropdown menu */}
        <div
          id="dropdownComment1"
          className={`${dropdown ? 'absolute' : 'hidden'} text-start right-24 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <Modal 
                button={(<p onClick={()=>{setDropdown(!dropdown)}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</p>)} 
                body={EventModalBody} updatePost={getEvents} post={event}/>
            </li>
            <li>
              <div>
              <Modal confirmation='Are you sure you want to remove this Event ?'  body={Confirm} updatePost={()=>{remove(event)}}
              button={(<p onClick={()=>{setDropdown(!dropdown)}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</p>)}/>
              </div>
            </li>
           
          </ul>
        </div>
       </div>
                    <div className="w-full p-2 rounded-lg shadow-xl bg-gray-300">
                    <img
                        className="object-cover w-full  lg:h-96"
                        src={`${event?.media}`}
                        alt="image"
                    />
                    <div className="pl-2">
                       <div >
                       <h2 className="text-4xl p-3 font-semibold tracking-tight text-blue-900">
                            {event.name}
                        </h2>
                        <div className='flex'>
                            <FaCalendarAlt size={20}/>
                            <p className='mx-3'>{event.startTime}<span className='mx-2 '>-</span></p>
                            <p className='mx-3'>{event.endTime}</p>
                        </div>
                        <h4 className="text-xl p-3 font-semibold tracking-tight text-blue-900">
                          <div className='flex'>
                          <p>Event By -</p>
                         <div className='flex mt-1 w-full'>
                                <div className='w-16 h-14 mt-6 overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
                                <img className='w-full h-full object-cover bg-transparent' src={ event.userId?.profileImg ? `${event.userId.profileImg}` : defaultProfile} alt="" />
                                </div>
                                <div className='h-auto rounded-full  w-full ml-1 p-4 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
                                <p className=' font-mono'>{event.userId.name}</p>
                                <p className=' font-thin text-base'>{event.userId.headline}</p>
                                </div>
                            </div>
                            </div></h4>
                            <div>
                            {event.attendees.length <= 1 ? <p className=' text-blue-950 font-serif text-lg'> {event.attendees.length} Attendee </p> : 
                                <p className='p-2 text-blue-950 font-serif text-lg'> {event.attendees.length} Attendees</p>}
                               <p className='p-2 text-blue-950 font-serif text-lg'> {event.description}</p>
                            </div>
                       </div>
                        
                    </div>
                    </div>
                    </div>
          <hr className='bg-black'/>
          </>
        )) : <h2 className='text-xl font-bold ml-12'>No Events Yet</h2>}
          </div></div>}
          {buttons[3].current && <div>
          <h2 className='m-2 p-3 rounded-2xl bg-gray-50 text-lg font-bold'>My Registered Events</h2>
          
          <div className='m-1 lg:px-2 h-full ' >
        {registered.length != 0 ? registered.map((event) => (
          <>
          <div className=' p-6 max-w-full rounded-lg'>
                    <div className="w-full p-2 rounded-lg shadow-xl bg-gray-300">
                    <img
                        className="object-cover w-full  lg:h-96"
                        src={`${event?.media}`}
                        alt="image"
                    />
                    <div className="pl-2">
                       <div >
                       <h2 className="text-4xl p-3 font-semibold tracking-tight text-blue-900">
                            {event.name}
                        </h2>
                        <div className='flex'>
                            <FaCalendarAlt size={20}/>
                            <p className='mx-3'>{event.startTime}<span className='mx-2 '>-</span></p>
                            <p className='mx-3'>{event.endTime}</p>
                        </div>
                        <h4 className="text-xl p-3 font-semibold tracking-tight text-blue-900">
                          <div className='flex'>
                          <p>Event By -</p>
                         <div className='flex mt-1 w-full'>
                                <div className='w-16 h-14 mt-6 overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
                                <img className='w-full h-full object-cover bg-transparent' src={ event.userId?.profileImg ? `${event.userId.profileImg}` : defaultProfile} alt="" />
                                </div>
                                <div className='h-auto rounded-full  w-full ml-3  p-4 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
                                <p className=' font-mono'>{event.userId.name}</p>
                                <p className=' font-thin text-base'>{event.userId.headline}</p>
                                </div>
                            </div>
                            </div></h4>
                            <div>
                            {event.attendees.length <= 1 ? <p className=' text-blue-950 font-serif text-lg'> {event.attendees.length} Attendee</p> : 
                                <p className=' text-blue-950 font-serif text-lg'> {event.attendees.length} Attendees</p>}
                               <p className='p-2 text-blue-950 font-serif text-lg'> {event.description}</p>
                            </div>
                       </div>
                        <div className='flex justify-around m-5'>
                        
                        {event?.attendees?.includes(localStorage.getItem('id'))? <button onClick={()=>{cancel(event._id)}} className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Cancel
                        </button> : <button onClick={()=>{attend(event._id)}} className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                           Attend
                        </button>}
                        </div>
                    </div>
                    </div>
                    </div>
          <hr className='bg-black'/>
          </>
        )) : <h2 className='text-xl mt-40 font-bold ml-20'>No Events Yet</h2>}
          </div></div>}
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
