import React ,{useContext,useState ,useEffect} from 'react'
import SideBar from '../components/SideBar';
import { Flowbite } from 'flowbite-react';
import { Link,  Element, animateScroll as scroll,  } from 'react-scroll';
import { postContext } from '../store/Post';
import axios,{URL} from '../axiosConfig'
import { useParams } from 'react-router-dom';
import ProfileDetail from '../components/ProfileDetail'
import coverImg from '../assets/cover.jpg'
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from 'flowbite-react';
import Post from '../components/Post';
import { FaCalendarAlt} from 'react-icons/fa';


const AdminUserProfile = () => {
    const [user,setUser] = useState({});
    const {posts} = useContext(postContext)
    const [userPosts,setUserPosts] = useState([]);
    const {id} = useParams();
    const [targetDiv, setTargetDiv] = useState('mydiv');
    const [foundInField,setFoundInField] = useState();
    const [events,setEvents] = useState();

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
    useEffect(()=>{
       axios.get('/post/getallposts/0/0').then(res=>{
        setUserPosts(()=> res.data.posts.filter(i=>i.userId._id == id))
       })
       axios.get(`/event/user_event/${id}`).then(res=>{
         setEvents(res.data.result);
       })
        
      },[posts])
    const initialButton = [{name : 'Posts', current : true},
     {name : 'Events', current : false},
     ]
    const [buttons,setButtons] = useState(initialButton);
    async function userData(){  
        const user = await axios.get(`/getUser/${id}`);
        setUser(user.data.user)
        setFoundInField(["followers", "requests", "pendings"].find(field =>
          user.data.user[field]?.includes(localStorage.getItem('id'))))     
      }
      useEffect(()=>{
          userData();
      },[])
      const scrollToTop = () => {
        scroll.scrollToTop();
      };

  return (
    <Flowbite>
        <div className='sm:block lg:flex h-screen dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
            <div><SideBar/></div>
            <div className='lg:flex flex-1 h-screen'>
            <div  className='lg:fixed bg-gray-100 m-0 p-0 lg:ml-6 mt-5 lg:p-4 lg:px-4 w-fit lg:w-5/12 h-fit  overflow-y-auto'>
            
           
            <div>
              <div>
                {/* Cover Photo */}
                <div className='relative h-56 w-full bg-blue-500'>
                
                <img  src={ user.coverPhoto ? `http://localhost:3000/${user.coverPhoto.replace('uploads\\', '')}` : coverImg} 
                alt="" 
                
                className='h-full w-full' 
                />
              
               
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    {/* Your cover photo content */}
                  </div>
                  
                </div>

                {/* Profile Photo */}
                <div className='flex '>
                <div className='w-44 h-44 overflow-hidden rounded-full border-2 border-white shadow-md relative -mt-32 ml-4'>
                  {/* Profile Photo Image */}
                 
                  <img
                    src={ user.profileImg ? `http://localhost:3000/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} 
                    alt='Profile'
                    className='w-full h-full object-cover bg-transparent'
                    
                  />
                 
                </div>
                {/* <Button onClick={connection} className='z-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 m-1 hover:bg-black focus:ring-0'>{!foundInField ? 'Connect' : foundInField == 'followers' ? 'Connected' : foundInField == 'requests' ? 'Confirm Request' : 'Cancel Request'}</Button> */}
                </div>
                
              </div>
              <div>
                  <ProfileDetail  user={user} userData={userData}/>
              </div>
             
            </div>
            
          
            
         <a onClick={scrollToTop}>
          <Button className='hidden sm:block focus:ring-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 fixed right-96 bottom-12 rounded-full w-12 h-12 '>
            <svg className="h-5 w-5  animate-bounce" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2l8 16H2L10 2z" />
            </svg>
          </Button>
          </a>
          
        </div>
        <div className='lg:w-6/12 lg:ml-16'></div>
          
          <div className= ' bg-gray-100 lg:w-6/12  mx-5 mb-0 ' style={{height : '645px'}} >
          <div className='w-full  m-10 lg:grid lg:grid-cols-2'>
           {buttons.map((i,j)=>{
            return (
              <Button key={j} onClick={()=>{setButtons((prev) => prev.map((obj,index)=>({...obj,current : index ==j})));}}
               className={`${i.current ? ' shadow-black shadow-xl bg-gradient-to-br from-blue-900 via-black to-blue-900' : 'bg-gradient-to-br from-black via-blue-900 to-black'} w-8/12  m-4 hover:bg-blue-900  transition-all duration-300 rounded-md cursor-pointer focus:ring-0`} >
              <p >{i.name}</p>
              <svg className={`${i.current? ' rotate-90':''} -mr-1 ml-2 h-4 w-4`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
           {buttons[0].current && (userPosts.length == 0 ? <p>No Posts Yet!</p> : userPosts.map((i,index)=>(<Post post={i} key={index}/>)))}
           {buttons[1].current && (events.length == 0 ? <p>No Events Yet!</p> : events?.map((event,index)=>(<>
          <div className=' max-w-full mb-4 rounded-lg'>
          <div className='text-end'>
       
       </div>
                    <div className="w-full p-2 rounded-lg shadow-xl bg-gray-300">
                    <img
                        className="object-cover w-full  lg:h-96"
                        src={`${URL}/${event?.media?.replace('uploads\\', '')}`}
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
                         <div className='flex mt-5 w-full'>
                                <div className='w-16 h-14 mt-3 overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
                                <img className='w-full h-full object-cover bg-transparent' src={ event.userId?.profileImg ? `${URL}/${event.userId.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
                                </div>
                                <div className='h-auto rounded-full  w-full ml-1 p-2 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
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
          </>)))}
          
          </div>

            </div>
        </div>
    </Flowbite>
  )
}

export default AdminUserProfile
