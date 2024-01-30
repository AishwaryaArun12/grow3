import React ,{useContext,useState ,useEffect} from 'react'
import { Link,  Element, animateScroll as scroll,  } from 'react-scroll';
import Nav from '../components/Nav';
import { postContext } from '../store/Post';
import axios,{URL} from '../axiosConfig'
import { useParams } from 'react-router-dom';
import ProfileDetail from '../components/ProfileDetail'
import coverImg from '../assets/cover.jpg'
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from 'flowbite-react';
import Post from '../components/Post';
import { HiPencil,HiLocationMarker,HiAcademicCap } from 'react-icons/hi';
import { IoMailOutline, IoStar } from 'react-icons/io5';
import { FaMoneyCheck, FaBriefcase } from 'react-icons/fa';
import { AuthContext } from '../store/Auth';
import { FaCalendarAlt} from 'react-icons/fa';
import Mutual from '../components/Mutual';
import Connects from '../components/Connects';



const UserProfile = () => {
    const [user,setUser] = useState({});
    const auth = useContext(AuthContext);
    const authUser = auth.user;
    const {posts} = useContext(postContext)
    const [userPosts,setUserPosts] = useState([]);
    const {id} = useParams();
    const [targetDiv, setTargetDiv] = useState('mydiv');
    const [foundInField,setFoundInField] = useState();
    const [events,setEvents] = useState([]);
 
    
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
       axios.get(`/event/user_event/${id}`).then(res => {
        setEvents(res.data.result);
       })
       
        
      },[posts])
    const initialButton = [{name : 'Posts', current : 'true'},
    {name: 'Connects',current: false},
    {name : 'Mutual Connects', current : false},
     {name : 'Events', current : false},
     ]
    const [buttons,setButtons] = useState(initialButton);
    async function userData(){  
        const user = await axios.get(`/getUser/${id}`);
        setUser(user.data.user)
        const fields = ["followers", "requests", "pendings"];
        
       
        setFoundInField(fields.find(field =>
          user.data.user[field]?.some(item => item._id === localStorage.getItem('id'))
        ))     
      }
      useEffect(()=>{
          userData();
      },[])
      const scrollToTop = () => {
        scroll.scrollToTop();
      };

      const connection = async(foundInField,id)=>{
       
        try {
          if(!foundInField){
            await axios.patch('/edit_connection',{userId : id,requestId : user._id});
           
          }else if(foundInField == 'followers'){
            await axios.patch('/edit_connection',{userId : id,unfollowId : user._id})
          }else if(foundInField == 'requests'){
            await axios.patch('/edit_connection',{userId : id,confirmId : user._id})
          }else if(foundInField == 'pendings'){
            await axios.patch('/edit_connection',{userId : id,takeId : user._id})
          }
          userData();
        } catch (error) {
          console.log(error,'error')
        }
      }
      
  return (
    <div className='h-screen'>
        <div className='h-16'>
        <Nav/>
        </div>
        <div className='lg:flex flex-1 ' style={{height : '645px'}} >
            
            
           
            <div  className='lg:fixed bg-gray-100 m-0 p-0 lg:ml-6 lg:p-4 lg:px-4 w-fit lg:w-6/12 h-fit  overflow-y-auto'>
            
           
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
                  <div className='w-44 h-44 overflow-hidden rounded-full border-2 border-white shadow-md relative -mt-32 ml-4'>
                    {/* Profile Photo Image */}
                   
                    <img
                      src={ user.profileImg ? `${URL}/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} 
                      alt='Profile'
                      className='w-full h-full object-cover bg-transparent'
                      
                    />
                   
                  </div>
                  <Button onClick={()=>{connection(foundInField,localStorage.getItem('id'))}} className='z-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 m-1 hover:bg-black focus:ring-0'>{!foundInField ? 'Connect' : foundInField == 'followers' ? 'Connected' : foundInField == 'requests' ? 'Confirm Request' : 'Cancel Request'}</Button>
                  </div>
                  
                </div>
                <div className='overflow-y-auto'>
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
            
          </div>
           
          </div>
          
        </div>
       
      </div>
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
          <div className='lg:w-6/12 lg:ml-12'></div>
            
            <div className= ' bg-gray-100 lg:w-5/12 mt-3 mx-5 mb-0 ' style={{height : '645px'}} >
            <div className='m-4'>
            <dl className="mt-8 grid grid-cols-1 lg:gap-8  gap-1 sm:mt-6 sm:grid-cols-2 lg:grid-cols-6">
              
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
            <div className='m-4'>
            <p className="mt-5 lg:text-lg text-sm leading-8 ">
              {user.description && user.description }
            </p>
            </div>
            <div className='w-full  m-6 lg:grid lg:grid-cols-2'>
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
             {buttons[0].current && <div>
              {userPosts.length != 0 ?  userPosts.map((i,index)=>(<Post post={i} key={index}/>)) : <p className=' text-center m-5'>No Posts Yet..</p>}
              </div>}
             {buttons[1].current && <div>
            {user.followers.length !=0 ? user.followers?.map(i=>{  
                return <Connects i={i}/>}) : <p className=' text-center m-5'>No Connections Yet..</p>}
            </div>}
            {buttons[2].current && <div>
            {user.followers.length !=0 ? user.followers?.map(i=>{  
             return <Mutual  i = {i}/>}) : <p className=' text-center m-5'>No Mutual Connections ..</p>}
             
            </div>}
            {buttons[3].current && events.length != 0 ? events.map((event) => (
          <>
          <div className=' max-w-full mb-4 rounded-lg'>
          <div className='text-end'>
       
        {/* Dropdown menu */}
        
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
          </>
        )) : <h2 className='text-xl font-bold ml-12'>No Events Yet</h2>}
            </div>

        </div>
        
        
    </div>
  )
}

export default UserProfile
