import React, { useEffect, useState } from 'react'
 import loginBg from '../assets/loginBg.png';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';


export default function Otp() {
    
    const [time ,setTime] = useState(0);
    const [error,setError] = useState();
    const [otp,setOtp] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('loginUser')){
          navigate('/');
        }else if(localStorage.getItem('loginAdmin')){
          navigate('/admin/home')
        }})
    
        useEffect(() => {
            
            const fetchUser = async () => {
              try {
                const response = await axios.get('/getUser/?otp=true');
            console.log(response,'kkkkkkkkkkkkkkkk')
                const otpExpire = new Date(response?.data?.user?.otpExpire);
                
                updateTimer(otpExpire);
               interval= setInterval(() => updateTimer(otpExpire), 1000);
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
            };
        
            fetchUser();
          }, []);
          let interval; 
          const updateTimer = (otpExpire) => {
            const currentTime = new Date(Date.now())
            const time = Math.max(otpExpire.getTime() - currentTime.getTime(), 0);
            console.log(time,'lllllll')
            if(time == 0){
                clearInterval(interval);
            }else{
                setTime(Math.floor(time/1000));
            }
          };
          const sendOtp =async ()=>{
            
            const otpExpire = new Date(Date.now() + 60*1000)
            try {
                
               const res = await axios.get('/sendOtp');
                
               interval =  setInterval(() => updateTimer(otpExpire), 1000);
                
            } catch (error) {
                console.log(error,'error');
                setError('Something went wrong. Try again later sometime.')
            }
          }
          const submit = async(e)=>{
            e.preventDefault();
            try {
                const result = await axios.post('/checkOtp',{otp});
            if(result.status == 200){               
                if(localStorage.getItem('forgotPassword')){
                    navigate('/changepassword');
                }else{
                    navigate('/login')
                }
                
            }
            } catch (error) {
                if(error.response.status == 403){
                    setError('OTP expired or not matching..')
                }else{
                    setError('Sorry, something went wrong.')
                }
            }
          }
  return (
    <div className='flex'>
     
      <div className="lg:flex  h-full border sm:w-full border-gray-200 m-2 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
       
                  <img
                    className="h-24 w-auto"
                    src="data:image/png;base64,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"
                    alt="Your Company"
                  />
              
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify Your email
          </h2>
          
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className='pb-5 text-xs text-red-600'>{error}</p>}
          <form className="space-y-6" onSubmit={submit}>
           

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  OTP
                </label>
                <div className="text-sm">
                  <p className="font-semibold text-blue-700 hover:text-blue-500">
                    Expire within {time} seconds
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  autoComplete="otp"
                  required
                  onChange={(e)=>{setOtp(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Still didn't get email?{' '}
            <button onClick={sendOtp} className="font-semibold leading-6 text-blue-700 hover:text-blue-500 hover:underline">
              Send OTP again
            </button>
          </p>
        </div>
      </div>
      <div className='hidden  xl:block w-auto lg:flex h-screen min-h-screen flex-1 flex-col justify-center'>
  <img className='h-fit'  src={loginBg} alt="" />
</div>

    </div>
  )
}

