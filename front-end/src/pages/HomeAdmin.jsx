import axios from '../axiosConfig'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { FaUserFriends,FaPager } from 'react-icons/fa'
import CustomerChart from '../components/CustomerChart'

import { Flowbite } from 'flowbite-react';
import EventChart from '../components/EventChart';

const HomeAdmin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {id} = useParams();
    const [users,setUsers] = useState();
    const [events,setEvents] = useState();
    const [posts,setPosts] = useState();
    const [ premiumUsers,setPremiumUsers] = useState();
    const [ usersData, setUsersData] = useState([]);
    const [premiumData,setPremiumData] = useState([]);
   
      useEffect(() => {
        const handlePopstate = () => {
          const currentPath = window.location.pathname;
    
          if (
            currentPath ===
            '/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=email%20profile&client_id=201831658510-n0cr16kupf6bv0cua9s08ht8ldv9j2rv.apps.googleusercontent.com&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow'
          ) {
            // If the current path is the one you want to prevent, navigate to a fallback route
            window.history.pushState({}, '', '/'); // Replace '/' with the desired fallback route
          }
        };
    
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
      }, []);
    
    async function googleAuth(){
        
        try {
           const res1 = await axios.get('/event/getallevents');
           const res2 = await axios.get('/get_all_users');
           const res3 = await axios.get('/post/getallposts/50/0')
           setUsers(res2.data.users)
           setEvents(res1.data.events)
           setPosts(res3.data.posts);
           
           setPremiumData([
            {label : 'Premium Members',y: (res2.data.users.filter(user=>Date.now() < new Date(user?.primium?.endingDate).getTime()).length*100/res2.data.users.length).toFixed(2)},
            {label : 'Non-Premium Members',y : (res2.data.users.filter(user=> Date.now() > new Date(user?.primium?.endingDate ).getTime()|| !user.primium).length*100/res2.data.users.length).toFixed(2)}
           ])
           setUsersData([
            {label : 'Investors',y:(res2.data.users.filter(user=>user.userType == 'Investor').length*100/res2.data.users.length).toFixed(2)},
            {label : 'Enterpreneurs',y:(res2.data.users.filter(user=>user.userType == 'enterpreneur').length*100/res2.data.users.length).toFixed(2)}           
          ])
          
           setPremiumUsers(res2.data.users.filter(user=>user.premium?.endingDate > Date.now()))
        } catch (error) {
           console.log(error);
        }
    }
    useEffect(()=>{
      
        if(localStorage.getItem('loginAdmin')){
           
                googleAuth();
        }else{
          navigate('/login')
      }
    },[])

   
  return (
   <>
   <Flowbite>
  <div className='sm:block lg:flex dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
    <div>
    <SideBar/>
   
    </div>
    <div>
    <main class="container w-full  mx-auto lg:px-8 py-4">
        <div class="flex flex-col lg:space-y-8 lg:ml-6">     
            <div class="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:px-4 xl:p-0 gap-6 xl:gap-8">
                
                <div class="bg-white w-full dark:shadow-white shadow-blue-900 shadow-2 p-6 rounded-xl border  border-gray-300">
                    <div class="flex justify-around items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-600 tracking-wide">Total Users</p>
                            <h3 class="mt-1 text-3xl text-blue-800 font-bold">{users?.length}</h3>
                            
                        </div>
                        <div class="bg-blue-900 p-4 lg:w-16 lg:h-12 md:p-1 xl:p-2 rounded-md">
                            <FaUserFriends alt="icon"  class="text-white dark-text-black w-auto h-12 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl dark:shadow-white shadow-blue-900 shadow-2 border border-gray-300">
                    <div class="flex justify-around items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-600 tracking-wide">Posts</p>
                            <h3 class="mt-1 text-3xl text-blue-800 font-bold">{posts?.length}</h3>
                            
                        </div>
                        <div class="bg-blue-900 p-4 lg:w-16 lg:h-12 md:p-1 xl:p-2 rounded-md">
                            <FaPager alt="icon"  class="text-white dark-text-black w-auto h-12 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl border dark:shadow-white shadow-blue-900 shadow-2 border-gray-300">
                    <div class="flex justify-around items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-600 tracking-wide">Events</p>
                            <h3 class="mt-1 text-3xl text-blue-800 font-bold">{events?.length}</h3>
                            
                        </div>
                        <div class="bg-blue-900 p-4 lg:w-16 lg:h-12 md:p-1 xl:p-2 rounded-md">
                            <FaPager alt="icon"  class="text-white dark-text-black w-auto h-12 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:shadow-white shadow-blue-900 shadow-2 p-6 rounded-xl border border-gray-300">
                    <div class="flex justify-around items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-600 tracking-wide">Premium Users </p>
                            <h3 class="mt-1 text-3xl text-blue-800 font-bold">{premiumUsers?.length}</h3>
                            
                        </div>
                        <div class="bg-blue-900 p-4 lg:w-16 lg:h-12 md:p-1 xl:p-2 rounded-md">
                            <FaUserFriends alt="icon"  class="text-white dark-text-black  w-auto h-12 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                
                <div class="lg:col-span-5 col-span-8 m-10 ms-4 w-full bg-white p-6 rounded-xl border border-gray-300 flex flex-col space-y-6">
                    
                    <CustomerChart/>
                </div>
                <div class="lg:col-span-3 col-span-5 bg-white p-2 rounded-xl border border-gray-400 flex flex-col space-y-6">
                    <EventChart text='Type of Users Overview' data={usersData}/>
                </div>
                <div class="lg:col-span-2 col-span-5 bg-white p-2 rounded-xl border border-gray-400 flex flex-col space-y-6">
                    <EventChart text='Premium Users Overview' data={premiumData}/>
                </div>
            </div>
            
        </div>
    </main>
    </div>
  </div>
   </Flowbite>
   </>
  )
}

export default HomeAdmin
