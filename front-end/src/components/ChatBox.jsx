import React, { useContext, useEffect, useState ,useRef, useCallback} from 'react'
import defaultProfile from '../assets/defaultProfile.png'
import { URL } from '../axiosConfig'
import NewMsg from './NewMsg'
import Msg from './Msg'
import { AuthContext } from '../store/Auth'
import axios from '../axiosConfig'
import { FaVideo } from 'react-icons/fa'
import { SocketContext, useSocket } from '../store/Socket'
import { useNavigate } from 'react-router-dom'
import peer from '../service/peer'
import { Button } from 'flowbite-react'


const ChatBox = ({conv}) => {
    const [messages,setMessages] = useState({})
   const {user} = useContext(AuthContext)
   const {remoteSocketId,setRemoteSocketId } = useContext(SocketContext)
   const [incoming,setIncoming] = useState(false);
   
   const scrollRef = useRef();
   const navigate = useNavigate();

   async function getMessages(){
        
    try {
       const res = await axios.get(`/chat/get_messages/${conv._id}`);
       const groupedMessages = {};
       res.data.result?.forEach((message) => {
         const dateKey = new Date(message?.createdAt)?.toDateString(); // Using toDateString to ignore time
         if (!groupedMessages[dateKey]) {
           groupedMessages[dateKey] = [];
         }
         groupedMessages[dateKey].push(message);
       });
       setMessages(groupedMessages)
    } catch (error) {
        console.log(error);
    }
    
}
   useEffect(()=>{    
    getMessages();
   },[conv])
   useEffect(()=>{
    scrollRef?.current?.scrollIntoView({behavior : "smooth"})
   },[messages])
    const member = conv?.members?.filter(i=> i._id != user._id);

    const socket = useSocket()

    const handleIncomingCall = useCallback(({from, offer})=>{
        
        setIncoming({from, offer});
        
        
    },[socket,navigate])
     
    async function answer(){
        const ans = await peer.getAnswer(incoming.offer)
        socket.emit('call:accepted', { to :incoming.from, ans})
        const from = incoming.from;
        setIncoming(false);
    setRemoteSocketId(from);
    navigate(`/video/room/${from}`)
    }
    
      const handleUserJoin = useCallback(({email,id})=>{
        setRemoteSocketId(id);
    },[])
    const handleJoinRoom = useCallback((data)=>{
      const {email,room,id} = data;
     
    },[user,socket])
    
    useEffect(()=>{
        socket.emit('room:join', {email : user?.email,room : 1})
    },[user,socket])
    useEffect(()=>{
        socket.on("user:joined", handleUserJoin);
        socket.on("room:join", handleJoinRoom);
        socket.on("incoming:call", handleIncomingCall);
        return ()=>{
            socket.off("user:joined", handleUserJoin);
            socket.off('room:join', handleJoinRoom)
            socket.off("incoming:call", handleIncomingCall);
        }
    },[socket,handleUserJoin,handleJoinRoom,handleIncomingCall])

    const video = useCallback(async()=>{
        const offer = await peer.getOffer();
        socket.emit("user:call" , {to : remoteSocketId, offer})
        navigate(`/video/room/${remoteSocketId}`)
    },[remoteSocketId,socket])
    
    
    if(conv != 'd'){
        
        return (
            <div className="flex flex-col flex-auto h-fit lg:p-6 pb-20 w-full">
                <div className='p-1 w-full'> 
                <div className="flex flex-row bg-gray-200 items-center w-full hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img src={member[0]?.profileImg ? `${URL}/${member[0].profileImg.replace('uploads\\', '')}`: defaultProfile} alt="User Avatar" className="w-8 h-8 rounded-full" />
                </div>
                    <div className="ml-2 text-sm font-semibold">{member[0].name}</div>
                    <FaVideo className='ml-auto mr-5 cursor-pointer' onClick={video} size={24}/>
                  </div>
                 
                  </div>
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl overflow-y-auto h-[570px] lg:h-[440px] bg-gray-100 py-4 lg:p-4" >
                <div className="flex flex-col h-full  mb-4">
                  <div className="flex flex-col  lg:h-4/5">
                    
                    
                    {Object.keys(messages).map((dateKey) => (
                        <>
                        <h2 className='m-4 text-center'>{dateKey}   </h2>
                   <div >
                        
                        {messages[dateKey].map((message) => (
                            <div className="grid grid-cols-12 gap-y-2 lg:ml-20" ref={scrollRef}>
                                
                                <Msg own={message.sender != user._id} msg={message}/>
                            </div>
                        
                        ))}
                    </div>
                        </>
                    ))}
                    
                    
                    
            
        </div>
        <NewMsg conversation={conv}  set={getMessages} sender={member[0]._id}/>
        </div>
        </div>
        {incoming && <div className='rounded-lg shadow-lg border absolute top-1/3 left-1/2 -ml-16 p-6 bg-gradient-to-br from-black via-blue-900 to-black'>
                    <p className='text-3xl p-3 text-white animate-bounce'> You  have a call from A...</p>
                    <div className='flex justify-evenly p-4' >
                    <Button className='mx-2 bg-blue-950 enabled:hover:bg-black' onClick={answer}>Answer</Button>
                    <Button className='mx-2 bg-blue-950  enabled:hover:bg-black' onClick={()=>{setIncoming(false)}}>Reject</Button>
                    </div>
                    </div>}
        </div>
        
          )
    }else{
        return (
            <div className=' lg:mx-36 mx-8 text-center w-4/5 h-36 p-12 rounded-lg shadow-lg mt-28 border align-middle  text-lg  '>
                <p>Select One Conversation..</p>
                {incoming && <div className='rounded-lg shadow-lg border absolute top-1/3 left-1/2 -ml-16 p-6 bg-gradient-to-br from-black via-blue-900 to-black'>
                    <p className='text-3xl p-3 text-white animate-bounce'> You  have a call ....</p>
                    <div className='flex justify-evenly p-4' >
                    <Button className='mx-2 bg-blue-950 enabled:hover:bg-black' onClick={answer}>Answer</Button>
                    <Button className='mx-2 bg-blue-950  enabled:hover:bg-black' onClick={()=>{setIncoming(false)}}>Reject</Button>
                    </div>
                    </div>}
                </div>
        )
    }
  
}

export default ChatBox
