import { CheckIcon } from '@heroicons/react/20/solid'
import Nav from '../components/Nav'
import { useContext, useEffect, useState } from 'react'
import axios from '../axiosConfig'
import GROW3 from '../assets/Grow3.gif'
import { AuthContext } from '../store/Auth'
import useRazorpay from "react-razorpay";

export default function Example() {
  const [subscription, setSubscription] = useState([]);
  const {user} = useContext(AuthContext);
  const [Razorpay] = useRazorpay();
  const [error,setError] = useState()
 
      useEffect(()=>{
        axios.get('/subscription/get_subscriptions').then(res=>{
          setSubscription(res.data.result);
      })
      },[])

      const subscribe = (id,durationIn,duration)=>{
        try {
          axios.patch('/editProfile',{primium : {endingDate :durationIn.startsWith('Month') ? new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000):
          new Date(Date.now() + duration * 365 * 24 * 60 * 60 * 1000)
        ,subscriptionId : id}});
        } catch (error) {
          console.log('object', error);
        }
      }

      
      const payment = async (fees,id,durationIn,duration) => {
        if(Date.now()< new Date(user?.primium?.endingDate).getTime()){
          setError('Sorry, You have already one plan.')
        }else{
        try {
          const res = await axios.post('/razorpay', { amt: fees });
          const orderId = res.data.orderId;
      
          var options = {
            "key": "rzp_test_WbvbNdBxWlKefq",
            "amount": fees,
            "currency": "INR",
            "name": "GROW3",
            "description": "Purchase Description",
            "image": {GROW3}, // Add quotes around the URL
            "order_id": orderId,
            "handler": function () {
              subscribe(id,durationIn,duration)            },
            "prefill": {
              "name": user?.name,
              "email": user?.email,
              "contact": "9746521181"
            },
            "theme": {
              "color": "#F37254"
            }
          };
      
          var rzp = new Razorpay(options);
          rzp.open();
      
        } catch (error) {
          console.log(error, 'error');
        }
      }
      }
  return (
    
    <>
    <Nav/>
    <div className="bg-gray-200 py-20 sm:py-20">
        
        <div className="mx-auto max-w-7xl px-6 lg:px-0">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Unlock Exclusive Premium Deals: Join Our VIP Community Today!
            </p>
            {error && <p className='mt-6 text-lg leading-8 text-red-600'>{error}</p>}
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 lg:px-9  ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
          {subscription.map(sub=>{
            return (
              <div className="-mt-2 p-4 lg:mt-0 lg:w-full lg:max-w-sm  hover:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-100 py-10 text-center ring-2 ring-inset hover:ring-blue-950 ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{sub.name}</h3>
                  <p className="text-base font-semibold text-gray-600">Explore more on Premium</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">${sub.fees}</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                  </p>
                  <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {sub.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
                  <button
                   onClick={()=>{payment(sub.fees,sub._id,sub.durationIn,sub.duration)}}
                    href="#"
                    className=" disabled:bg-black mt-10 block w-full rounded-md bg-gradient-to-br from-black via-blue-900 to-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get access
                  </button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Invoices and receipts available for easy company reimbursement
                  </p>
                </div>
              </div>
            </div>
            )
          })}
           
          </div>
        </div>
      </div>
    </>
  )
}
