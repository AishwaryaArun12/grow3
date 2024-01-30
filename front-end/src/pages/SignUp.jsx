import React,{useState,useEffect} from 'react'
 import loginBg from '../assets/loginBg.png';
 import {useForm} from 'react-hook-form'
 import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import GROW3 from '../assets/GROW3.gif'


export default function SignUp() {

  const navigate = useNavigate();
  const {register,handleSubmit} = useForm();
  const [error1,setError1] = useState();
  const [error2,setError2] = useState();
  const [error3,setError3] = useState();
  const [error4, setError4] = useState();

  useEffect(()=>{
    if(localStorage.getItem('loginUser')){
      navigate('/');
    }else if(localStorage.getItem('loginAdmin')){
      navigate('/admin/home')
    }})

  const submit =async (data)=>{
    setError1();
    setError2();
    setError3()
    setError4(false);
    const gmailRegex = /^[^@]+@gmail\.com$/;
    const alphanumericRegex = /^(?=.*[a-zA-Z0-9]).{6,}$/;
    if(data.name.trim()== ''){
      setError1('Name should not be empty!')
    }else if(!gmailRegex.test(data.email)){
      setError2('Please provide a valid email address!');
    }else if(!alphanumericRegex.test(data.password)){
      setError3('Password should be alphanumeric and atleast 6 length! ')
    }else if(data.password != data.conformPassword){
      setError3('Password and Confirm password is not matching!');
    }else {
      try {
        const res = await axios.post('/newUser',data);
        
      if(res.status == 201){
        localStorage.setItem('id', res.data.id)
        try {
          await axios.get('/sendOtp');
        } catch (error) {
          console.log(error);
          setError4('Please provide valid email');
        }
        navigate('/otp')
      }
      } catch (error) {
        console.log(error.response);
        if(error.response.status == 409 && error.response.data.data == 'User already exists but not verified' ){
          navigate('/otp');
        }else if(error.response.status == 409){
          setError4('User already exists');
        }else{
          setError4('Sorry, Something went wrong.')
        }
      }
    }
  }

  return (
    <div className='flex'>
      
      <div className="lg:flex  h-fit min-h-screen  border sm:w-full border-gray-200  flex-1 flex-col justify-center md:px-8 md:py-12 lg:px-0 lg:py-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
       
        <img
                      className="h-fit w-16 sm:m-1  rounded-full "
                      src={GROW3}
                      alt="Your Company"
                    />
              
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>
        {error4 && <p className='text-xs text-center text-red-600'>{error4}</p>}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(submit)} className="space-y-6 h-fit m-3 lg:border-none lg:p-0 border p-2 lg:m-0" action="#" method="POST">
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                {...register('name')}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error1 && <p className='text-xs mt-1 text-red-600'>{error1}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error2 && <p className='text-xs mt-1 text-red-600'>{error2}</p>}
            </div>

            <div className='flex justify-between'>
             <div className='w-full'>
             <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
               
              </div>
              <div className="mt-2 me-2">
                <input
                {...register('password')}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
             </div>
             <div className='w-full'>
             <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Confirm  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  {...register('conformPassword')}
                  id="confirmPassword"
                  name="conformPassword"
                  type="confirmPassword"
                  autoComplete="confirm-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
             </div>
            </div>
            {error3 && <p className='text-xs mt-1 text-red-600'>{error3}</p>}
            <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Who are you!</legend>
              <div className="mt-6  flex justify-evenly">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                    {...register('userType')}
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
                    {...register('userType')}
                      id="enterpreneur"
                      name="userType"
                      type="radio"
                      value={'enterpreneur'}
                      
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
                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 lg:hidden md:block text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-blue-700 hover:text-blue-500">
              Please Login...
            </a>
          </p>
        </div>
      </div>
      
      <div className='hidden  xl:block w-auto lg:flex h-fit min-h-screen flex-1 flex-col justify-center items-center'>
      <p className="m-2 text-center text-sm text-gray-500">
            Already you have account?{' '}
            <a href="/login" className="hover:animate-pulse font-semibold leading-6 text-blue-950 hover:text-black">
              Please Login...
            </a>
          </p>
  <img className='sticky h-screen' src={loginBg} alt="" />
</div>

    </div>
  )
}

