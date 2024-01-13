import { HiPencil,HiLocationMarker,HiAcademicCap } from 'react-icons/hi';
import { IoMailOutline, IoStar } from 'react-icons/io5';
import { FaMoneyCheck, FaBriefcase } from 'react-icons/fa';
import Modal from './Modal'
import EditProfile from './EditProfile';
import defaultProfile from '../assets/defaultProfile.png'
import { postContext } from '../store/Post';
import { useContext,useEffect,useState } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';

  
  export default function Example({user,userData,param}) {
    const {posts,setPosts} = useContext(postContext)
    const [userPosts,setUserPosts] = useState([]);
    const id = localStorage.getItem('id')
    
    const [events,setEvents] = useState([]);
    
    useEffect(()=>{
      console.log(posts)
      setUserPosts((prev)=> posts.filter(i=>i.userId._id == userData._id))
    },[posts])
    const button = (<HiPencil size={24}  className='ml-auto mt-1'/>)
    const profileIcon = (<div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
    <img className='w-full h-full object-cover bg-transparent' src={ user.profileImg ? `http://localhost:3000/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
  </div>)
    return (
      <div className="relative overflow-y-hidden bg-gradient-to-r from-gray-100 to-gray-300 py-8 lg:py-5 ">
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
            {param && (
  <Modal button={button} user={user} userData={userData} title='Edit Your Profile' profileIcon={profileIcon} body={EditProfile} />
)}

            
            </div>
            {user.headline && <div>
              <h4 className=' p-3'>
                {user.headline}
              </h4>
            </div>}
            <div className='lg:flex '>
              <div className='flex mr-16 lg:mr-28  w-fit'>
                <HiAcademicCap size={20} className='mt-4' />
                <h3 className='mt-3 ml-3'>{user.qualification}</h3>
              </div>
              {user.userType == 'Investor' ? <div key='events' className="flex mt-2 mr-8">
                  
                  <dd className="text-2xl mx-3  font-bold leading-9 tracking-tight "><FaMoneyCheck size={32} /></dd>
                  <dt className="text-base leading-7 ">Investor</dt>
                </div> : <div key='events' className="flex flex-col-reverse">
                  <dt className="text-base leading-7 ">Enterpreneur</dt>
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
                  <dd className="text-2xl font-bold leading-9 tracking-tight ">{events?.length}</dd>
                </div>
              
            </dl>
          </div>
            <p className="mt-5 lg:text-lg text-sm leading-8 ">
              {user.description ? user.description : 'Share something about yourself, Your ideas'}
            </p>
          </div>
          
        </div>
       
      </div>
    )
  }
  