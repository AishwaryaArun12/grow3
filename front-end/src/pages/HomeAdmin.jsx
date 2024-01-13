import axios from '../axiosConfig'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import SideBar from '../components/SideBar';


import { Flowbite } from 'flowbite-react';

const HomeAdmin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
   
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
            await axios.post('/auth/setToken',{id})
        } catch (error) {
           console.log(error);
        }
    }
    useEffect(()=>{
        if(!localStorage.getItem('loginAdmin')){
            if(id){
                googleAuth();
            }else{
                navigate('/login')
            }
        }
    },[])

   
  return (
   <>
   <Flowbite>
  <div className='sm:block lg:flex h-screen dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
    <div>
    <SideBar/>
   
    </div>
    <div>
    
    </div>
  </div>
   </Flowbite>
   </>
  )
}

export default HomeAdmin
