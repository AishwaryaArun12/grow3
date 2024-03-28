import { useState,useEffect } from 'react'
import axios from '../axiosConfig';
import { CountryDropdown,RegionDropdown } from 'react-country-region-selector';


export default function Example({user,close,userData}) {
  
  const [country, setCountry] = useState(user.country);
  const [region, setRegion] = useState(user.region)
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState(user.email);
  const [description,setDescription] = useState(user.description);
  const [headline, setHeadline] = useState(user.headline);
  const [name,setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [qualification,setQualification] = useState(user.qualification);
  const [userType, setUserType] = useState(user.userType)
  const [error, setError] = useState();
  
  const handleSubmit =async (e)=>{
    const nameRegex = /^[A-Za-z ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const textRegex = /^[A-Za-z0-9\s.,'-]+$/;
    const ageRegex = /^\d+$/;
    e.preventDefault();
    if(!nameRegex.test(name.trim()) || name.trim() == ""){
      setError('Name should be alphabets and minimum length of 2 ');
    }else if(!emailRegex.test(email.trim()) || email.trim() == ""){
      setError('Email should follows the standard email format')
    }else if(!textRegex.test(country.trim()) || country.trim() == "" ||
    !textRegex.test(region.trim()) || region.trim() == "" || 
    !textRegex.test(location.trim()) || location.trim() == "" || description.trim() == "" ||
     headline.trim() == "" ||
    !textRegex.test(qualification.trim()) || qualification.trim() == "" ){
      setError('Inputs should be valid')
    }else if(!ageRegex.test(age)){
      setError('Age should be greater than 0 and should be numeric.')
    }else{
      try {
        await axios.patch('/editProfile',{name,email,country,region,location,description,headline,age,qualification,userType})
         setError();
         userData();
        close();
      } catch (error) {
        setError('Internal server error, Changes not saved.')
      }
    }
   
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          {error && 
            <p className='text-red-700 p-3'>{error}</p>
          }
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                  required
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Headline
              </label>
              <div className="mt-2">
                <input
                required
                  type="text"
                  name="headline"
                  id="headline"
                  autoComplete="headline"
                  onChange={(e)=>{setHeadline(e.target.value)}}
                  value={headline}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                required
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>{setDescription(e.target.value)}}
                  value={description}
                />
              </div>
             
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Qualification
              </label>
              <div className="mt-2">
                <input
                required
                  type="text"
                  name="qualification"
                  id="qualification"
                  autoComplete="qualification"
                  onChange={(e)=>{setQualification(e.target.value)}}
                  value={qualification}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
                required
                  type="text"
                  name="location"
                  id="location"
                  autoComplete="location"
                  onChange={(e)=>{setLocation(e.target.value)}}
                  value={location}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  value={email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="age"
                  id="age"
                  autoComplete="age"
                  onChange={(e)=>{setAge(e.target.value)}}
                  value={age}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Region/Province
              </label>
              <div className="mt-2">
              <RegionDropdown
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                country={country}
                value={region}
                onChange={(value)=>{setRegion(value)}}
                required
                 />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
              <CountryDropdown
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                id="country"
                value={country}
                onChange={(value)=>{setRegion();setCountry(value)}}
                required
              />
              </div>
            </div>
            <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <div className="mt-2">
            <select required id="userType" onChange={(e)=>{setUserType(e.target.value)}} name="userType"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option value='Investor' selected={userType == 'Investor'} >Investor</option>
              <option value='enterpreneur' selected={userType == 'enterpreneur'}>Enterpreneur</option>
              
            </select>
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
  )
}
