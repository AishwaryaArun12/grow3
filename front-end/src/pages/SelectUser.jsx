import React, { useState, useEffect } from 'react'
import loginBg from '../assets/loginBg.png'
import axios from '../axiosConfig'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GROW3 from '../assets/Grow3.gif'

const SelectUser = () => {
    const [userType, setUserType] = useState('Investor')
    const [error,setError] = useState();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        if(localStorage.getItem('loginUser')){
          navigate('/');
        }else if(localStorage.getItem('loginAdmin')){
          navigate('/admin/home')
        }else{
          const id = searchParams.get('id')
          localStorage.setItem('id', id )
        }
      },[])
    const submit =async (e)=>{
        e.preventDefault();
       try {
        const user = await axios.post('/selectuser',{userType,id:searchParams.get('id')})
       localStorage.setItem('id',user.data.id);
       localStorage.setItem('loginUser',true);
       navigate('/');
    } catch (error) {
      console.log(error)
        setError('Sorry, your google authentication not completed.')
       }
    }
  return (
    <div>
      <div className='flex'>
     
     <div className="lg:flex  h-fit border sm:w-full border-gray-200 m-2 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
      
                 <img
                   className="h-20 mr-3 w-auto rounded-full"
                   src={GROW3}
                   alt="Your Company"
                 />
             
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Select who are you!
         </h2>
       </div>
        {error && <p className='text-xs text-center text-red-600'>{error}</p>}
       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form className="space-y-6" onSubmit={submit}>
         <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Who are you!</legend>
              <div className="mt-6  flex justify-evenly">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      onChange={(e)=>{setUserType(e.target.value)}}
                      id="investor"
                      name="userType"
                      type="radio"
                      checked
                      value={'Investor'}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Investor
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                    
                      id="enterpreneur"
                      name="userType"
                      type="radio"
                      value={'enterpreneur'}
                      onChange={(e)=>{setUserType(e.target.value)}}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Enterpreneur
                    </label>
                  </div>
                </div>
               
              </div>
            </fieldset>
            </div>
           
           <div>
             <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign in
             </button>
           </div>
         </form>
        
       </div>
     </div>
     <div className='hidden  xl:block w-auto lg:flex h-screen min-h-screen flex-1 flex-col justify-center'>
 <img className='h-fit'  src={loginBg} alt="" />
</div>

   </div>
    </div>
  )
}

export default SelectUser
