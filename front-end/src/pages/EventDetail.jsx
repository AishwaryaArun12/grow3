import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom'
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

const EventDetail = () => {
    const {id} = useParams();
    const [event ,setEvent] = useState()
    const {user} = useContext(AuthContext);
    const [events,setEvents] = useState([])

    async function getAllEvents(){
        const result =  await axios.get('/event/getallevents');
        console.log(result.data.events.filter(event=>event._id == id))
        setEvents(result.data.events.filter(event=>event._id != id) )
     }
    async function getEvent(){
        try {
           const result = await axios(`/event/${id}`);
           setEvent(result.data.result[0])
        } catch (error) {
            console.log(error);
        }
    } 
    const profileIcon = (<div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
    <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `${URL}/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
  </div>)
  
    const buttonContent = (<div className='flex mt-5 w-full'>
    <div className='w-14 h-12  overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
      <img className='w-full h-full object-cover bg-transparent' src={ user?.profileImg ? `http://localhost:3000/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
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
    useEffect(()=>{
        getEvent()
        getAllEvents()
    },[])
    const attend = async(id)=>{
        try {
          await axios.patch('/event/add_attendee', {id:localStorage.getItem('id'),eventId : id})
          getEvent();
        } catch (error) {
          console.log('error');
        }
     }
     const cancel = async(id)=>{
      try {
        await axios.patch('/event/remove_attendee', {id:localStorage.getItem('id'),eventId : id})
        getEvent();
      } catch (error) {
        console.log('error');
      }
   }
  return (
    <div>
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
            <div className='bg-gray-100 h-auto w-full lg:w-9/12 mx-2 '>
               
                <div className='p-3 bg-gray-100 '>
                    {event && 
                    
                        <div className=' p-6 max-w-full rounded-lg'>
                    <div className="w-full p-2 rounded-lg shadow-xl bg-gray-300">
                    <img
                        className="object-cover w-full  lg:h-96"
                        src={`${URL}/${event?.media?.replace('uploads\\', '')}`}
                        alt="image"
                    />
                    <div className="pl-2">
                       <div >
                       <h2 className="text-4xl p-3 font-semibold tracking-tight text-blue-900">
                            {event.name}
                        </h2>
                        <div className='flex'>
                            <FaCalendarAlt size={20}/>
                            <p className='mx-3'>{event.startTime}<span className='mx-2 '>-</span></p>
                            <p className='mx-3'>{event.endTime}</p>
                        </div>
                        <h4 className="text-xl p-3 font-semibold tracking-tight text-blue-900">
                          <div className='flex'>
                          <p>Event By -</p>
                         <div className='flex mt-5 w-full'>
                                <div className='w-16 h-14 mt-3 overflow-hidden rounded-full border-2 border-gray-300 shadow-md'>
                                <img className='w-full h-full object-cover bg-transparent' src={ event.userId?.profileImg ? `${URL}/${event.userId.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="" />
                                </div>
                                <div className='h-auto rounded-full  w-full ml-1 p-2 shadow-md border-gray-300 border-2 hover:bg-gray-200'>
                                <p className=' font-mono'>{event.userId.name}</p>
                                <p className=' font-thin text-base'>{event.userId.headline}</p>
                                </div>
                            </div>
                            </div></h4>
                            <div>
                                {event.attendees.length <= 1 ? <p className=' text-blue-950 font-serif text-lg'> {event.attendees.length} Attendee</p> : 
                                <p className=' text-blue-950 font-serif text-lg'> {event.attendees.length} Attendees</p>}
                               <p className='p-2 text-blue-950 font-serif text-lg'> {event.description} Attendees</p>
                            </div>
                       </div>
                        <div className='flex justify-around m-5'>
                        
                        {event?.attendees?.includes(localStorage.getItem('id'))? <button onClick={()=>{cancel(event._id)}} className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Cancel
                        </button> : <button onClick={()=>{attend(event._id)}} className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                           Attend
                        </button>}
                        </div>
                    </div>
                    </div>
                    </div>}
                    <div>
                    
                    </div>
                    
                </div>
                <div className='p-4 m-2 border rounded-lg bg-white'>
                    <h1 className='text-lg font-semibold'>Related Events</h1>
                </div>
                <div className='flex border w-full overflow-x-auto scrollNone h-[400px] rounded-lg'>
                    {events.length !=0 && events.map(event=>
                       
                    <div className="w-full m-2 p-2 rounded-lg shadow-xl  bg-gray-300">
                    <img
                        className="object-cover w-full  lg:h-56"
                        src={`${URL}/${event.media.replace('uploads\\', '')}`}
                        alt="image"
                    />
                    <div className="pl-2">
                        <p>{event.startTime}</p>
                       <div className='overflow-hidden h-14 my-2'>
                       <h4 className="text-xl font-semibold tracking-tight text-blue-900">
                            {event.name}
                        </h4>
                       </div>
                        <div className='flex justify-around'>
                        <a href={`/event/${event._id}`}>
                        <button className="px-4 mr-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Read more
                        </button>
                        </a>
                        <button onClick={()=>{cancel(event._id)}} className="px-4 py-2 text-sm w-28 text-blue-100 bg-gradient-to-br from-black via-blue-900 to-black rounded shadow">
                            Cancel
                        </button>
                        </div>
                    </div>
                    </div>
                    
                    )}
                </div>
            </div>
            
            </div>
    </div>
    </div>
  )
}

export default EventDetail
