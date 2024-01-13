import { createContext, useEffect, useState } from "react";
import axios from "../axiosConfig";

export const postContext = createContext(null);

export default function Post ({children}){
  
    const [posts,setPosts] = useState([])
    const [page,setPage] = useState(1);
    const [prev,setPrev] = useState(1)
    async function getAllPosts(){
       if(prev!= page){
        
        axios.get(`/post/getallposts/${page}/${0}`).then(res=>{         
          setPosts(previous=>{return [...res?.data?.posts]});
        }).catch(err=>{
          console.log(err);
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          if(err.status == 401){
            window.location.href = '/login'
          }
        })
        setPrev(page);
       }else{
        
        axios.get(`/post/getallposts/${page}/${0}`).then(res=>{         
          setPosts(prev=>{return [...res?.data?.posts]});
        }).catch(err=>{
          console.log(err);
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          if(err.status == 401){
            window.location.href = '/login'
          }
        })
       }          
    }
    useEffect(()=>{
      getAllPosts()
    },[page])
    return(
        <>
        <postContext.Provider value={{posts,setPosts,getAllPosts,setPage}}>
            {children}
        </postContext.Provider>
        </>
    )
}