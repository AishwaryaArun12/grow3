import React, { useState ,useRef, useEffect, useContext} from 'react'
import axios from '../axiosConfig';
import EmojiPicker from 'emoji-picker-react';
import { useSocket } from '../store/Socket';
import { AuthContext } from '../store/Auth';

const NewMsg = ({conversation,sender,set}) => {
    const [ emoji ,setEmoji] = useState(false);
    const [value,setValue] =useState('')
    const conversationId = conversation._id;
    const [arrivalMessage,setArrivalMessage] = useState()
    const {user} = useContext(AuthContext)

    
    const socket = useRef(useSocket())

    useEffect(()=>{
      
        if(arrivalMessage && conversation.members.some(member => member._id === arrivalMessage.sender)){
            set();
        }
    },[arrivalMessage,conversation])
  

    useEffect(()=>{
        if(user){
            socket.current.emit("addUser" , user?._id);
        }
        socket.current.on("getUsers" ,users=>{
            console.log(users,'mmmmmmmmmmmmm');
        })
        socket.current.on("get:message" ,(data)=>{
            console.log(data,'ddddddddddddddddddhhhhhhhhhhhhhhhhhhhhhhh');
            set();
            setArrivalMessage({
                sender: data.senderId,
                text : data.text,
                createdAt : Date.now()
            })
        })
    },[user])
    const receiverId = conversation?.members?.find(member=> member._id!=user._id)
    
  

    const submit = async()=>{
       if(value.trim() != 0){
         try {
             await axios.post('/chat/create_message',{conversationId,sender,text:value})
             setValue('')
             setEmoji(false);
             set();
             socket.current.emit('send messages', {
                 senderId : user._id,
                 receiverId:receiverId._id,
                 text : value
             })
 
         } catch (error) {
             console.log(error);
         }
       } 
    }
   
  return (
    <div className="flex flex-row items-center h-16 rounded-xl fixed bottom-5 lg:left-1/4 -left-1 bg-white w-full lg:w-3/5 lg:px-4">
         {emoji && <div className='absolute z-50 bottom-16 w-full bg-black'><EmojiPicker searchPlaceholder='      search' categories={['suggested','smileys_people',]}  width={850} height={350} onEmojiClick={(emoji)=>{setValue(prev=> prev+emoji.emoji);}} /></div>}
    {/* <div>
      <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
        </svg>
      </button>
    </div> */}
    <div className="flex-grow ml-4">
      <div className="relative w-full">
        <input required onChange={(e)=>{setValue(e.target.value)}} value={value} type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
        <button onClick={()=>{setEmoji(!emoji)}} className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div className="ml-4">
      <button onClick={submit} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
        <span>Send</span>
        <span className="ml-2">
          <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
  )
}

export default NewMsg
