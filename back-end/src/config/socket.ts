import { Server } from "socket.io";
import http from 'http'
import cors from 'cors';

const configureSocket = (server : http.Server)=>{
    const io = new Server(server,{
		cors: {
			origin: "*",
		},
		transports: ["websocket", "polling"],
		maxHttpBufferSize: 5 * 1024 * 1024
	});

    const emailToSocketIdMap = new Map();
    const socketIdToEmailMap = new Map();

    interface users {
        userId : string,
        socketId : string
       }
       let users : users[] = [];
        const addUser = (userId : string, socketId : string)=>{
            !users.some(user=> user.userId == userId) && 
            users.push({userId,socketId});
            console.log(users,'push')
        }

        const removeUser = (socketId:string)=>{
            users.filter(user=>user.socketId != socketId)
            console.log(users,'remove')
        }

       function getUser(userId : string):users{
          return users.find(user=> user.userId == userId)
        }


    io.on("connection", (socket):void=>{
        console.log(`Socket connected on ${socket.id}`)
        //chat
         socket.on('addUser', (userId)=>{
            addUser(userId,socket.id)
            io.emit('getUsers', users)
         })

         socket.on('disconnected', ()=>{
            console.log('a user disconnected!..')
            removeUser(socket.id)
         })

         socket.on('send messages', ({senderId,receiverId,text})=>{
            const user = getUser(receiverId);
            console.log(user,'aaaaaa',receiverId)
            io.to(user?.socketId).emit("get:message", {senderId, text})
         })

        // video call
        socket.on('room:join' , (data)=>{
            const {email, room} = data;
            emailToSocketIdMap.set(email,socket.id);
            socketIdToEmailMap.set(socket.id,email);
            io.to(room).emit("user:joined", { email, id : socket.id });
            socket.join(room);
            io.to(socket.id).emit("room:join", {email,room,id:socket.id});
        })

        socket.on('user:call', ({to, offer})=>{
            io.to(to).emit('incoming:call', {from : socket.id, offer});
        })

        socket.on('call:accepted', ({to, ans})=>{
            io.to(to).emit('call:accepted', {from : socket.id, ans});
        })

        socket.on('peer:nego:needed', ({to, offer})=>{
            io.to(to).emit('peer:nego:needed', {from : socket.id, offer});
        })

        socket.on('peer:nego:done', ({to , ans})=>{
            io.to(to).emit('peer:nego:final', {from : socket.id, ans});
        })
    })
}

export default configureSocket;