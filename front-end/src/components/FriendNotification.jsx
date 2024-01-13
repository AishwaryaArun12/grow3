import React, { useContext, useState } from 'react'
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from 'flowbite-react';
import { AuthContext } from '../store/Auth';
import  axios,{URL} from '../axiosConfig'

const FriendNotification = ({user,userData}) => {
    const auth = useContext(AuthContext)
    const authUser = auth.user;
    const mainBar = [{name:'Pending Requests', active : true},{name: 'Connections',active : false},{name: 'Send Requests' , active : false}];
    const [main,setMain] = useState(mainBar);
  return (
    <div className='w-full'>
        <div className='flex justify-between w-full flex-nowrap'>
            {main.map((i,j)=>(<div className={`lg:px-10 px-2 py-4 border ${i.active && 'border-b-blue-800'} ` } 
            onClick={(()=>{
                setMain((prev) => prev.map((obj,index)=>({...obj,active : index ==j})))
            })}>
                <h3 className=' font-serif font-semibold lg:text-base sm:text-sm'>{i.name}</h3>
            </div>))}
        </div>
      <div>
        {main[0].active && <div>
            {user.pendings?.length !=0 ? user.pendings?.map(i=>{
               const mutual = authUser.followers.reduce((count, follower) => {
                
                if (i.followers.some((followerId) => followerId._id === follower._id)) {
                    return count + 1; // Increment count if mutual follower found
                } else {
                    return count; // No change in count if not a mutual follower
                }
            }, 0);
            const confirm =async ()=>{
                try {
                    await axios.patch('/edit_connection',{userId:authUser._id,confirmId : i._id})
                    userData();
                } catch (error) {
                    console.log(error)
                }
            }
                return(
                <div className='flex my-3'>
                    <div className="flex items-center  bg-slate-100 w-full">
          
          <img src={i?.profileImg ? `${URL}/${i.profileImg.replace('uploads\\', '')}`: defaultProfile} alt="User Avatar" className="w-12 h-12 rounded-full mx-3" />
          <div className='ml-3'>
            <p className="text-gray-800 font-semibold">{i?.name}</p>
            <p className="text-gray-500 text-sm">{mutual} Mutual Friends</p>
          </div>
          <div className='mx-auto '><Button className='bg-gray-700' onClick={confirm}>Accept</Button></div>
        </div>
                </div>
            )}) : <p className=' text-center m-5'>No Pending Requests..</p>}
            </div>}
            {main[1].active && <div>
            {user.followers.length !=0 ? user.followers?.map(i=>{
                 const mutual = authUser.followers.reduce((count, follower) => {
                
                    if (i.followers.some((followerId) => followerId._id === follower._id)) {
                        return count + 1; // Increment count if mutual follower found
                    } else {
                        return count; // No change in count if not a mutual follower
                    }
                }, 0);
                const unconnect =async ()=>{
                    try {
                        await axios.patch('/edit_connection',{userId:authUser._id,unfollowId : i._id})
                        userData();
                    } catch (error) {
                        console.log(error)
                    }
                }
                return (
                <div className='flex my-3'>
                    <div className="flex items-center  bg-slate-100 w-full">
          
          <img src={i?.profileImg ? `${URL}/${i.profileImg.replace('uploads\\', '')}`: defaultProfile} alt="User Avatar" className="w-12 h-12 rounded-full mx-3" />
          <a href={`/user/${i._id}`} className='ml-3 w-3/5'>
            <p className="text-gray-800 font-semibold">{i?.name}</p>
            <p className="text-gray-800 font-semibold">{i?.headline}</p>
            <p className="text-gray-500 text-sm">{mutual} Mutual Friends</p>
          </a>
          <div className='ml-3 '><Button onClick={unconnect} className='bg-gray-700'>Unconnect</Button></div>
        </div>
                </div>
            )}) : <p className=' text-center m-5'>No Connections Yet..</p>}
            </div>}
            {main[2].active && <div>
            {user.requests.length !=0 ? user.requests?.map(i=>{
                 const mutual = authUser.followers.reduce((count, follower) => {
                
                    if (i.followers.some((followerId) => followerId._id === follower._id)) {
                        return count + 1; // Increment count if mutual follower found
                    } else {
                        return count; // No change in count if not a mutual follower
                    }
                }, 0);
                const takeRequest =async ()=>{
                    try {
                        await axios.patch('/edit_connection',{userId:authUser._id,takeId : i._id})
                        userData();
                    } catch (error) {
                        console.log(error)
                    }
                }
                return (
                <div className='flex my-3'>
                    <div className="flex items-center  bg-slate-100 w-full">
          
          <img src={i?.profileImg ? `${URL}/${i.profileImg.replace('uploads\\', '')}`: defaultProfile} alt="User Avatar" className="w-12 h-12 rounded-full mx-3" />
          <a href={`/user/${i._id}`} className='ml-3 w-3/5'>
            <p className="text-gray-800 font-semibold">{i?.name}</p>
            <p className="text-gray-800 font-semibold">{i?.headline}</p>
            <p className="text-gray-500 text-sm">{mutual} Mutual Friends</p>
          </a>
          <div className='ml-3 '><Button onClick={takeRequest} className='bg-gray-700'>Cancel Requests </Button></div>
        </div>
                </div>
            )}) : <p className=' text-center m-5'>No Request send Yet..</p>}
            </div>}
      </div>
    </div>
  )
}

export default FriendNotification
