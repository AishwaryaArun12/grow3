import React,{useEffect,useContext, useState} from 'react'
import Nav from '../components/Nav'
import axios,{URL} from '../axiosConfig'
import PostModalbody from '../components/PostModalbody';
import {FaCalendarAlt} from 'react-icons/fa'
import defaultProfile from '../assets/defaultProfile.png'
import { MdPhotoLibrary } from 'react-icons/md'
import Modal from '../components/Modal';
import Premium from '../components/Premium'
import { AuthContext } from '../store/Auth';
import EventModalBody from '../components/EventModalBody';
import { Button } from 'flowbite-react';
import { HiLocationMarker,HiAcademicCap } from 'react-icons/hi';
import { IoMailOutline, IoStar } from 'react-icons/io5';
import { FaMoneyCheck, FaBriefcase } from 'react-icons/fa';
import coverImg from '../assets/cover.jpg'
import { useSpring, animated } from 'react-spring';
import ConnectButton from '../components/ConnectButton';

const Partners = () => {
  const [index, setIndex] = useState(0);
    const {user} = useContext(AuthContext);
    const [data,setData] = useState([]);
    const [events,setEvents] = useState([]);
    const [userPosts,setUserPosts] = useState([]);
   
    const [allUsers,setAllUsers] = useState([]);
    
    async function getAllUsers(){
      try {
        const res = await axios.get('/get_all_users')
        const arr = res.data.users.filter(i=>i?.userType != user?.userType && i?._id != localStorage.getItem('id'))
        setData(arr);
        
        setAllUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    const props = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      reset: true,
    });

   

   
    useEffect(()=>{
      axios.get('/event/getallevents').then(result =>{
        setEvents(result.data.events);
      }).catch(err=>console.log(err))
      getAllUsers();
    },[])

    const initialButton = [{name: 'Find Your Partners',current: true},
    {name : 'People who like to connect', current : false},
  ]
    const [buttons,setButtons] = useState(initialButton);
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

   const eventButton = (<div className='flex pt-4'>
   <FaCalendarAlt size={25} color="black" className='opacity-80' />
   <p>Event</p>
   </div>)
  return (
    <div>
        <div className='h-16'>
            <Nav />
        </div>
        <div className='lg:flex block sm:block w-full  flex-1'  >
      <div className='bg-gray-100 lg:fixed  lg:w-3/12 mr-3 py-4 h-full  block ' >
      {buttons.map((i,j)=>{
              return (
                <Button key={j} onClick={()=>{
                  if(j==0){
                    setData(allUsers.filter(i=>i?.userType != user?.userType));
                  }else{
                    setData(allUsers.filter(i=>user.requests.some((followerId) => followerId._id === i._id)));
                  }
                  setIndex(0)
                  setButtons((prev) => prev.map((obj,index)=>({...obj,current : index ==j})));
                }}
                 className={`${i.current ? 'shadow-black shadow-lg  bg-white text-black p-3 w-full' : 'p-3 w-20 my-4 text-black bg-gray-200'} w-11/12 m-6   lg:m-4 enabled:hover:bg-blue-950 enabled:hover:text-gray-200 transition-all duration-300 rounded-md cursor-pointer focus:ring-0`} >
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
              <div className='bg-white w-11/12 m-4 p-3 h-40 border-2 rounded-xl'>
            
                    <Modal profileIcon= {profileIcon} button={buttonContent} title='What do you want to talk about' body={PostModalbody}/>
                    <div className='flex justify-around'>
                      <Modal button={imageButton} profileIcon= {profileIcon} title='What do you want to talk about' body={PostModalbody}/>
                      <Modal button={eventButton}  profileIcon= {profileIcon} title='Create an event' body={EventModalBody}/>
                    </div>
              </div >
              <Premium />
            </div>
            <div className='hidden lg:block w-4/12 mr-2'></div>
            <div className='bg-gray-100 w-full lg:w-11/12 mx-2 '>
            <div id="animation-carousel" className="relative w-full h-[569px]" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative rounded-lg md:h-full">
    {data.map((user, i) => {

const fields = ["followers", "requests", "pendings"];
        
       
  const foundInField = fields.find(field =>
  user[field]?.some(item => item === localStorage.getItem('id')))
     const event = events.filter(i=>i.userId == user._id);
      return (
      <animated.div key={i} style={{ ...props, display: i === index ? 'block' : 'none' }}>
        <div className="px-12 absolute block w-full h-full -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2">
           
            <div>
              <div>
                {/* Cover Photo */}
                <div className='relative h-56 w-full bg-blue-500'>
                
                <img  src={ user.coverPhoto ? `${URL}/${user.coverPhoto.replace('uploads\\', '')}` : coverImg} 
                alt="" 
                
                className='h-full w-full' 
                />
              
               
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    {/* Your cover photo content */}
                  </div>
                  
                </div>

                {/* Profile Photo */}
                <div className='flex justify-around'>
                <div className='w-48 h-48 overflow-hidden rounded-full border-2 border-white shadow-md relative -mt-32 ml-4'>
                  {/* Profile Photo Image */}
                 
                  <img
                    src={ user.profileImg ? `${URL}/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} 
                    alt='Profile'
                    className='w-full h-full object-cover bg-transparent'
                    
                  />
                 

                </div>
                <ConnectButton foundInField={foundInField} id={user._id}/>
                </div>
                
              </div>
              <div className='overflow-y-auto h-64 lg:h-[280px] scrollNone bg-gradient-to-r from-gray-100 to-gray-300'>
              <div className="relative h-80  py-8 lg:py-5 ">
      <img
        src="https://images.unsplash.co/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
     
      <div className=" max-w-7xl px-6 lg:px-4 ">
        <div className=" max-w-4xl lg:mx-0">
          <div className="flex justify-start items-stretch w-fit">
          <h3 className="lg:text-3xl font-bold bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent tracking-tight  text-2xl">{user.name}</h3>
          {user.age && <h2 className="mr-auto mt-3 ml-7 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent  sm:text-xl">{user.age}<span> years</span></h2>}
        

          
          </div>
          {user.headline && <div>
            <h4 className=' p-3'>
              {user.headline}
            </h4>
          </div>}
          <div className='lg:flex '>
            <div className='flex mr-16 lg:mr-28  w-fit'>
              <HiAcademicCap size={20} className='mt-4' />
              <h3 className='m-3'>{user.qualification}</h3>
            </div>
            {user.userType == 'Investor' ? <div key='events' className="flex mt-2 mr-8">
                
                <dd className="text-2xl mx-3  font-bold leading-9 tracking-tight "><FaMoneyCheck size={32} /></dd>
                <dt className="text-base mt-2 leading-7 ">Investor</dt>
              </div> : <div key='events' className="flex flex-col-reverse">
                <dt className="text-base mt-2 leading-7 ">Enterpreneur</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight "><FaBriefcase size={32} /></dd>
              </div>}
          </div>
          <div className=" mt-5 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 text-base font-semibold leading-7 sm:grid-cols-2  lg:gap-x-2">
          <div className='flex'>
              <HiLocationMarker size={20} className='mt-1' />
              <pre><h3 className='ml-2'>{user.location} {user.region} {user.country}</h3></pre>
              
          </div>
          <div className='flex'>
             <IoMailOutline size={20} className='mt-1' />
              <h3 className='ml-2'>{user.email}</h3>
              
          </div>
          <div className='flex'>
             <IoStar size={20} color={user.premium ? 'gold' : 'black'} className='mt-1' />
              <h3 className='ml-2'>{user.premium ? 'Premium member' : 'Not subscribed'}</h3>
              
          </div>
         
            {user.premium && <div className='flex'>
             <IoStar size={20} color= 'gold' className='mt-1' />
              <h3 className='ml-3'>{user.premium?.subscriptionId.name}</h3>
          </div>}
          </div>
          
        </div>
         
        </div>
        
      </div>
      <div className='m-4'>
          <dl className="mt-8 grid grid-cols-2 lg:gap-8  gap-1 sm:mt-6 sm:grid-cols-2 lg:grid-cols-6">
            
            <div key='followers' className="flex flex-col-reverse">
              <dt className="lg:text-base text-sm leading-7 ">Connects</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight ">{user.followers?.length}</dd>
            </div>
            <div key='events' className="flex flex-col-reverse">
              <dt className="text-base leading-7 ">Requests</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight ">{user.requests?.length}</dd>
            </div>
            <div key='viewers' className="flex flex-col-reverse">
              <dt className="text-base leading-7 ">Pendings</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight ">{user.pendings?.length}</dd>
            </div>
            <div key='viewers' className="flex flex-col-reverse">
              <dt className="text-base leading-7 ">Viewers</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight ">{user.viewers?.length}</dd>
            </div>
            <div key='posts' className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-900">Posts</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight ">{userPosts?.length}</dd>
            </div>
            <div key='events' className="flex flex-col-reverse">
              <dt className="text-base leading-7 ">Events</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight ">{event?.length}</dd>
            </div>
          
        </dl>
          </div>
          <div className='m-4'>
              
             <p className="mt-5 lg:text-lg text-sm leading-8 ">{user.description} </p>
          
          </div>
     
    </div>
              </div>
             
            </div>
    
        </div>
      </animated.div>
    )}) }
  </div>
      {/* Slider controls */}{ data.length !=0 &&<>
      <button type="button" className=" ml-0 absolute top-0 start-0 z-30 flex items-center justify-center h-full px-0 cursor-pointer group focus:outline-none" onClick={() => setIndex((index - 1 + data.length) % data.length)} data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 dark:group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none" onClick={() => setIndex((index + 1) % data.length)} data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white group-focus:ring-gray-800/70 dark:group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button></>}
    </div>
                
            </div>
            
            </div>
    </div>
  )
}

export default Partners
