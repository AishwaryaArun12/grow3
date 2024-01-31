import React,{useState} from 'react'
import axios from '../axiosConfig';

const AddFeatureForm = ({close}) => {
    const [feature,setFeature] = useState('');
    const [error,setError] = useState();
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const regex = /^\d+$/;
        if(feature.trim()== ''){
          setError("Sorry, Can't add empty feature")
        }else if( regex.test(feature)){
          setError("Can not save only numbers as a feature.")
        }else{
          try {
            const res = await axios.patch('/subscription/add_feature',{feature});
            close()
        } catch (error) {
            setError('Internal server error');
        }
        }
        
    }
  return (
    <div>
           <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
         
          {error && 
            <p className='text-red-700 p-3'>{error}</p>
          }
          <div className="mt-7 ">
            <div className="">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Feature
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                  
                  <textarea
                    type="text"
                    name="feature"
                    id="feature"
                    autoComplete="feature"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={feature}
                    onChange={(e)=>{setFeature(e.target.value)}}
                  ></textarea>
                </div>
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

export default AddFeatureForm
