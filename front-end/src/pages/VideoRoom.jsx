import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../store/Socket'
import ReactPlayer from 'react-player'
import peer from '../service/peer'
import Nav from '../components/Nav'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineAudioMuted } from "react-icons/ai";
import { FcEndCall } from "react-icons/fc";
import { BsCameraVideo } from "react-icons/bs";

const VideoRoom = () => {
    
    const socket = useSocket();
    
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream ] = useState();
    const {room} = useParams();
    const [remoteSocketId, setRemoteSocketId] = useState(room);
    const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [call, setCall] = useState(false);
  const navigate = useNavigate();
    

    const handleIncomingCall = useCallback(async ({from, offer})=>{
       
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio : true,
            video : true,
        })
        setMyStream(stream)
        const ans = await peer.getAnswer(offer)
        socket.emit('call:accepted', { to :from, ans})
    },[socket])
    const sendStreams = useCallback(()=>{
            for(const track of myStream.getTracks()){
                peer.peer.addTrack(track, myStream)
            }
    },[myStream])

    const handleCallAccepted = useCallback(({from,ans})=>{
        peer.setLocalDescription(ans);
        console.log('Call Accepted')
        sendStreams()
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async()=>{
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', {offer, to : remoteSocketId})
    
    },[remoteSocketId,socket])

    useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)

        return ()=>{
            peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded)
        }
    },[handleNegoNeeded])

    useEffect(()=>{
        peer.peer.addEventListener('track', async ev =>{
            console.log('track received...........',ev)
            const remoteStream = ev.streams[0]
            remoteStream.onaddtrack = function(event) {
                console.log('Track added:', event.track);
               };
               
               remoteStream.onremovetrack = function(event) {
                console.log('Track removed:', event.track);
               };
           
            setRemoteStream(remoteStream);
        })
    },[remoteStream])

    const handleNegoNeedIncoming = useCallback(async({from,offer})=>{
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to : from, ans})
    },[socket])
const handleNegodone = useCallback(async({ans})=>{
    await peer.setLocalDescription(ans)
},[])

    useEffect(()=>{
        
        socket.on("call:accepted" ,handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncoming)
        socket.on('peer:nego:final', handleNegodone)
        return ()=>{
            
            socket.off("call:accepted" ,handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncoming)
            socket.off('peer:nego:final', handleNegodone)
        }
    },[socket, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegodone])

    useEffect(()=>{
        async function getStream(){
            const stream = await navigator.mediaDevices.getUserMedia({
                audio : true,
                video : true,
            })
      
            setMyStream(stream)
            for(const track of stream.getTracks()){
                peer.peer.addTrack(track, stream)
            }
        }
        getStream();
        
    },[])
    // toggle camera
  const toggleCamera = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOff;
        setIsCameraOff(!isCameraOff);
      }
    }
  };

  // toggle audio mute
  const toggleAudioMute = () => {
    if (myStream) {
        myStream.getAudioTracks().forEach(track => track.enabled = !isAudioMuted);
      
        setIsAudioMuted(!isAudioMuted);
      
    }
  };

  const handleHangUp = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    setMyStream(null);
    setRemoteStream(null);
    socket.emit("hangup");
    
      navigate("/chat");
  };

  return (
    <>
    <div className='h-16'>
    <Nav/>
    </div>
    <div className='mb-10 mt-1 w-full  p-0 border text-center text-lg'>
        
        {!remoteStream && <>
        <ReactPlayer className="border-2 w-full" playing muted height={"100%"}  url={myStream}/>
        </>}
        
        {remoteStream && <>
            <div className='relative border-2'><ReactPlayer className="relative border-2 w-screen lg:mx-20" playing muted height={"80vh"} width={"100%"}  url={remoteStream}/>
                 <div className='m-2 flex justify-around w-1/2' >
                 {isCameraOff ? (
          <BsCameraVideo
            className="text-5xl mr-5 bg-gray-700 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleCamera}
          />
        ) : (
          <BsCameraVideo
            className="text-5xl mr-5 bg-red-500 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleCamera}
          />
        )}
        {isAudioMuted ? (
          <AiOutlineAudioMuted
            className="text-5xl mr-5 bg-gray-700 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleAudioMute}
          />
        ) : (
          <AiOutlineAudioMuted
            className="text-5xl mr-5 bg-red-500 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleAudioMute}
          />
        )}
        <FcEndCall
          className="text-5xl mr-5 bg-gray-700 text-white rounded-full p-2 hover:bg-red-500 hover:text-white cursor-pointer"
          onClick={handleHangUp}
        />
                </div></div>
        <div className='absolute right-20 bottom-5 text-end'><ReactPlayer playing muted height={"300px"} width={'50%'} url={myStream}/></div>
        
        </>}
      
    </div>
    </>
  )
}

export default VideoRoom
