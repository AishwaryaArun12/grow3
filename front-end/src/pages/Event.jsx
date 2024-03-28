import React,{useEffect,useContext, useState} from 'react'
import Nav from '../components/Nav'
import axios,{URL} from '../axiosConfig'
import PostModalbody from '../components/PostModalbody';
import {FaCalendarAlt} from 'react-icons/fa'
import defaultProfile from '../assets/defaultProfile.png'
import { MdPhotoLibrary } from 'react-icons/md'
import Modal from '../components/Modal';
import Premium from '../components/Premium'
import { AuthContext } from '../store/Auth';
import EventModalBody from '../components/EventModalBody';

const Event = () => {
    const {user} = useContext(AuthContext);
    const [events,setEvents] = useState([])
    const [registered,setRegistered] = useState([]);

    const profileIcon = (<div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
    <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${user.profileImg}` : defaultProfile} alt="" />
  </div>)
  
    const buttonContent = (<div className='flex mt-5 w-full'>
    <div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
      <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${user.profileImg}` : defaultProfile} alt="" />
    </div>
    <div className='h-12 rounded-full w-full ml-1 p-2 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
      <p>Start a post...</p>
    </div>
  </div>)
  const imageButton = (<div className='flex pt-4'>
  <MdPhotoLibrary size={27} color="blue" className='opacity-80' />
  <p>Media</p>
  </div>)

   const eventButton = (<div className='flex pt-4'>
   <FaCalendarAlt size={25} color="black" className='opacity-80' />
   <p>Event</p>
   </div>)
   async function getAllEvents(){
    try {
      const result =  await axios.get('/event/getallevents');
    setEvents(result.data.events.filter(event=>!event.attendees.includes(localStorage.getItem('id'))) )
    setRegistered(result.data.events.filter(event=>event.attendees.includes(localStorage.getItem('id'))))
    } catch (error) {
      console.log(error,'dddddddddd')
    }
 }
   useEffect(()=>{
    
    getAllEvents();
   },[])
   const attend = async(id)=>{
      try {
        await axios.patch('/event/add_attendee', {id:localStorage.getItem('id'),eventId : id})
        getAllEvents();
      } catch (error) {
        console.log('error');
      }
   }
   const cancel = async(id)=>{
    try {
      await axios.patch('/event/remove_attendee', {id:localStorage.getItem('id'),eventId : id})
      getAllEvents();
    } catch (error) {
      console.log('error');
    }
 }
  return (
    <div>
        <div className='h-16'>
            <Nav />
        </div>
        <div className='lg:flex sm:block w-full  flex-1'  >
      <div className='bg-gray-100 fixed  w-3/12 mr-3 py-4 h-full  hidden lg:block ' >
              <div className='bg-white w-11/12 m-4 p-3 h-40 border-2 rounded-xl'>
            
                    <Modal profileIcon= {profileIcon} button={buttonContent} title='What do you want to talk about' body={PostModalbody}/>
                    <div className='flex justify-around'>
                      <Modal button={imageButton} profileIcon= {profileIcon} title='What do you want to talk about' body={PostModalbody}/>
                      <Modal button={eventButton} updatePost={setEvents} profileIcon= {profileIcon} title='Create an event' body={EventModalBody}/>
                    </div>
              </div >
              <Premium />
            </div>
            <div className='hidden lg:block w-4/12 mr-2'></div>
            <div className='bg-gray-100 h-auto w-full lg:w-11/12 mx-2 '>
                
                    {registered.length != 0 && <>
                    <div className='p-4 m-2 border rounded-lg bg-white'>
                    <h1 className='text-lg font-semibold'>Your Registered Events</h1>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-100'>
                    {registered.map(event =>
                        <div className='h-96 max-w-full rounded-lg'>
                    <div className="w-full p-2 rounded-lg shadow-xl  bg-gray-300">
                    <img
                        className="object-cover w-full  lg:h-56"
                        src={`${event?.media}`}
                        alt="image"
                    />
                    <div className="pl-2">
                        <p>{event.startTime}</p>
                       <div className='overflow-hidden h-16'>
                       <h4 className="text-xl font-semibold tracking-tight text-blue-900">
                            {event.name}
                        </h4>
                       </div>
                        <div className='flex justify-around'>
                        <a href={`/event/${event._id}`}>
                        <button className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Read more
                        </button>
                        </a>
                        <button onClick={()=>{cancel(event._id)}} className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Cancel
                        </button>
                        </div>
                    </div>
                    </div>
                    </div>
                    )}</div></>}
                    

                
                <div className='p-4 m-2 border rounded-lg bg-white'>
                    <h1 className='text-lg font-semibold'>Suggested Events</h1>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 bg-gray-100'>
                    {events.length != 0 ? 
                    events.map(event=>{
                        if(event?.userId?._id != localStorage.getItem('id')){   
                          return( <div className='h-72 lg:h-96 max-w-full rounded-lg'>
                    <div className="w-full p-2 rounded-lg shadow-xl  bg-gray-300">
                    <div className='lg:h-56 h-28'>
                    <img
                        className="object-cover w-full  lg:h-56"
                        src={`${event?.media}`}
                        alt="image"
                    />
                    </div>
                    <div className="pl-2">
                        <p>{event.startTime}</p>
                       <div className='overflow-hidden h-16'>
                       <h4 className="text-xl font-semibold tracking-tight text-blue-900">
                            {event.name}
                        </h4>
                       </div>
                        <div className='flex justify-around'>
                        <a href={`/event/${event._id}`}>
                        <button className="lg:px-4 px-2 py-2 text-sm lg:w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Read more
                        </button>
                        </a>
                        <button onClick={()=>{attend(event._id)}} className="lg:px-4 px-2 py-2 text-sm lg:w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Attend
                        </button>
                        </div>
                    </div>
                    </div>
                    </div>)
                        }
                      }): <p>No Events</p>}

                </div>
            </div>
            </div>
    </div>
  )
}

export default Event
