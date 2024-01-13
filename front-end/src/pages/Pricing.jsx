import { CheckIcon } from '@heroicons/react/20/solid'
import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import axios from '../axiosConfig'

export default function Example() {
  const [subscription, setSubscription] = useState([]);
    
      useEffect(()=>{
        axios.get('/subscription/get_subscriptions').then(res=>{
          setSubscription(res.data.result);
      })
      },[])
     
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
                  <a
                    href="#"
                    className="mt-10 block w-full rounded-md bg-gradient-to-br from-black via-blue-900 to-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get access
                  </a>
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
