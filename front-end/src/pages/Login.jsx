import React, { useEffect, useState } from 'react'
import loginBg from '../assets/loginBg.png';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import GROW3 from '../assets/GROW3.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  useEffect(()=>{
    if(localStorage.getItem('loginUser')){
      navigate('/');
    }else if(localStorage.getItem('loginAdmin')){
      navigate('/admin/home')
    }
  },[])

  const submit = async(e)=>{
    e.preventDefault();
    const gmailRegex = /^[^@]+@gmail\.com$/;
    const alphanumericRegex = /^(?=.*[a-zA-Z0-9]).{6,}$/;
    try {
      if(!gmailRegex.test(email)){
        toast.error('Email address is not valid!')
      }else if(!alphanumericRegex.test(password)){
        toast.error('Sorry, Invalid password');
      }else{
        const result = await axios.post('/login',{password,email});
      if(result?.data.res == 'user not verified'){
      setError('Sorry, Validation not completed, Please complete otp validation.');
      setTimeout(async() => {
        try {
          await axios.get('/sendOtp');
          navigate('/otp')
        } catch (error) {
          setError('Something went wrong, Try again later some time.')
        }
      }, 2000);
     }else if(result?.data.res == 'verified'){
      if(result.data.id == 'loginAdmin'){
        localStorage.setItem('loginAdmin', true);
      localStorage.setItem('id', result.data.id); 
      navigate('/admin/home');
      }
      else{
        localStorage.setItem('loginUser', true);
      localStorage.setItem('id', result.data.id); 
      navigate('/');
      }
     }
      }
      
    } catch (error ) {
      console.log(error.message);
      if(error.message == 404){
        setError('** Invalid credentials')
      }else if(error.message == 403){
        setError('Sorry, Access blocked by admin')
      }
    }
    
    
  }
  return (
    <div className='flex'>
     
      <div className="lg:flex  h-fit border sm:w-full border-gray-200 m-2 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
       
        <div className="m-6 lg:m-0 flex  items-center">
                    <img
                      className="h-fit w-16 sm:m-1  rounded-full "
                      src={GROW3}
                      alt="Your Company"
                    />
                  </div>
              
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <ToastContainer position="top-center" theme='colored' />
          {error && <p className='text-xs text-center text-red-600'>{error}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgotemail" className="font-semibold text-blue-950 hover:text-black">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className='w-full rounded-md mt-5 py-1.5 border-2 flex flex-1 justify-center'>
            <div>
              <img className='h-6 mr-7' src="data:image/png;base64,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" alt="" />
          </div>
          <a  href="http://localhost:3000/auth">continue with google</a>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold leading-6 text-blue-950 hover:text-blue-500">
              Signup.....
            </a>
          </p>
        </div>
      </div>
      <div className='hidden  xl:block w-auto lg:flex h-screen min-h-screen flex-1 flex-col justify-center'>
  <img className='h-screen'  src={loginBg} alt="" />
</div>

    </div>
  )
}

