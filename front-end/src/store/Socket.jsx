import { createContext, useContext, useMemo, useState } from "react";
import {io} from 'socket.io-client'
import { URL } from "../axiosConfig";

export const SocketContext = createContext(null);

export const useSocket = ()=>{
    const {socket} = useContext(SocketContext);
    return socket;
}


export default function Context({children}){
    const [remoteSocketId, setRemoteSocketId ] = useState();
    const socket =  useMemo(()=> io(URL), [])
    
    return (
        <>
        <SocketContext.Provider value={{socket,remoteSocketId,setRemoteSocketId}}>
            {children}
        </SocketContext.Provider>
        </>
    )
}