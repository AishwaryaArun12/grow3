import React, { useEffect, useState } from 'react'
import loginBg from '../assets/loginBg.png';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';


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
    try {
      const result = await axios.post('/login',{password,email});
     console.log(result,result.data)
      if(result.data.res == 'user not verified'){
      setError('Sorry, Validation not completed, Please complete otp validation.');
      setTimeout(async() => {
        try {
          await axios.get('/sendOtp');
          navigate('/otp')
        } catch (error) {
          setError('Something went wrong, Try again later some time.')
        }
      }, 2000);
     }else if(result.data.res == 'verified'){
      localStorage.setItem('loginUser', true);
      localStorage.setItem('id', result.data.id); 
      navigate('/');
     }
    } catch (error) {
      console.log(error);
      if(error.response?.status == 404){
        setError('** Invalid credentials')
      }else if(error.response?.status == 401){
        setError('Sorry, Access blocked by admin')
      }
    }
    
    
  }
  return (
    <div className='flex'>
     
      <div className="lg:flex  h-fit border sm:w-full border-gray-200 m-2 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
       
                  <img
                    className="h-24 w-auto"
                    src="data:image/png;base64,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"
                    alt="Your Company"
                  />
              
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
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
                  <a href="/forgotemail" className="font-semibold text-blue-700 hover:text-blue-500">
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
                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
            <a href="/signup" className="font-semibold leading-6 text-blue-700 hover:text-blue-500">
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

