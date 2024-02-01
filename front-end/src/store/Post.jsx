import { createContext, useEffect, useState } from "react";
import axios from "../axiosConfig";
import React from "react";

export const postContext = createContext(null);

export default function Post ({children}){
  
    const [posts,setPosts] = useState([])
    const [page,setPage] = useState(1);
    async function getAllPosts(){
      
        axios.get(`/post/getallposts/${page}/${0}`).then(res=>{         
          setPosts(res?.data?.posts);
        }).catch(err=>{
          console.log(err);
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          if(err.status == 401){
            window.location.href = '/login'
          }
        })
              
    }
    useEffect(()=>{
      getAllPosts()
    },[page])
    return(
      <React.Fragment>
        <postContext.Provider value={{posts,setPosts,getAllPosts,setPage}}>
            {children}
        </postContext.Provider>
        </React.Fragment>
    )
}