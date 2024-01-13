import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import {useForm} from 'react-hook-form'

const SubscriptionForm = ({close,updatePost,user}) => {
    const [features,setFeatures] = useState([])
    const [error,setError] = useState();
    const {register,handleSubmit} = useForm({
        defaultValues : {
            name : user?.name,
            fees : user?.fees,
            duration : user?.duration,
            durationIn : user?.durationIn,
            features : user?.features
        }
    });
    useEffect(()=>{
        axios.get('/subscription/get_features').then(res=>{
            setFeatures(res.data.features)
        })
    },[])
    const submit =async (data)=>{
        if(user){
            try {
                data.id = user._id;
                await axios.patch('/subscription/edit',data);
                updatePost();
                close();
            } catch (error) {
                setError('Internal server error..')
            }
        }else{
            try {
                const res = await axios.post('/subscription/create',data);
                updatePost();
                close();
            } catch (error) {
                setError('Internal server error..')
            }
        }
        
    }
  return (
    <div>
         <form onSubmit={handleSubmit(submit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
         
          {error && 
            <p className='text-red-700 p-3'>{error}</p>
          }
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-8">
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Subscription Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register('name')}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Fees
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="number"
                    name="fees"
                    id="name"
                    min={1}
                    autoComplete="fees"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register('fees')}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Duration
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="number"
                    min={1}
                    id="name"
                    autoComplete="duration"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register('duration')}
                  />
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Duration In
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <select
                    type="text"
                    id="durationIn"
                    autoComplete="durationIn"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register('durationIn')} required
                  >
                    <option selected>...</option>
                    <option value={'Months'}>Months</option>
                    <option value={'Year'}>Year</option>

                  </select>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-12">
            <label htmlFor="features" className="block text-sm font-medium leading-6 text-gray-900">
                Features
            </label>
            <div className="mt-2 grid-cols-2  grid">
                {features.map((feature, index) => (
                <div key={index} className="m-2 flex items-center">
                    <input
                    type="checkbox"
                    id={`feature-${index}`}
                    value={feature}
                    className="mr-2"
                    {...register('features')}
                    />
                    <label htmlFor={`feature-${index}`} className="text-gray-900">{feature}</label>
                </div>
                ))}
            </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={close} className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
      
    </div>
  )
}

export default SubscriptionForm
