import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios ,{URL} from '../axiosConfig'
import Post from './Post';
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from 'flowbite-react';
import Modal from './Modal';
import Confirm from './Confirm';
import { HiBan, HiCheck } from 'react-icons/hi';



const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [data,setData] = useState([])

  const remove = async(post)=>{
    
    try {
      if(post?.media){
        await axios.delete(`/post/delete/${post._id}/${post.media}`);
      }else{
        await axios.delete(`/post/delete/${post._id}/up/media`);
      }
      allReports();
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (postDate) => {
    const currentDate = new Date();
    const postDateTime = new Date(postDate);
    const timeDifferenceInSeconds = Math.floor((currentDate - postDateTime) / 1000);
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds === 1 ? '' : 's'} ago`;
    }
  
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  
    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes === 1 ? '' : 's'} ago`;
    }
  
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  
    if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hour${timeDifferenceInHours === 1 ? '' : 's'} ago`;
    }
  
    return postDateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

    function allReports(){
    axios.get(`${URL}/post/get_all_reports`).then(res=>{
        setData(res.data.result);
    })
  }

  useEffect(()=>{
    allReports();
  },[])

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
  });

  async function block (id){
    try {
        await axios.get(`/admin/block/?id=${id}`)
        allReports();
    } catch (error) {
        console.log(error);
    }
   }
   async function unblock (id){
    try {
        await axios.get(`/admin/unblock/?id=${id}`)
        allReports();
    } catch (error) {
        console.log(error);
    }
   }

  console.log("Render with index:", index);

  return (
    <div id="animation-carousel" className="relative w-full h-screen" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative h-full overflow-hidden rounded-lg md:h-full">
    {data.length != 0 ? data.map((data, i) => (
      <animated.div key={i} style={{ ...props, display: i === index ? 'block' : 'none' }}>
        <div className="lg:flex absolute block w-full h-full -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2">
          <div className='lg:w-3/5 w-full lg:ml-16 ml-1 my-3 overflow-y-auto scrollNone'>
            <Post post={data.postId} key={data._id}/>
          </div>
          <div className='lg:w-1/2 w-full overflow-y-auto'>
          <div className='flex'>
              <Modal confirmation='Are you sure you want to remove this post ?' user={data.postId}  body={Confirm} updatePost={()=>{remove(data.postId)}}
              button={(<Button className='m-3 dark:bg-black bg-gray-500'>Remove Post</Button>)}/>
               {data.postId.userId.active ?  <Button onClick={()=>{block(data.postId.userId._id)} } className="m-3 bg-gray-500 dark:bg-black">Block User
                {<HiBan size={19} /> }
              </Button> :  <Button onClick={()=>{unblock(data.postId.userId._id)}} className="m-3 bg-gray-500 dark:bg-black">Unblock User
                {<HiCheck size={19}  /> }
              </Button>}
              </div>
            
            {data.details.map(i => (
              <div className='flex m-3'>
                <div className="flex items-center bg-slate-100 lg:w-4/5 w-full">
                  <img src={i?.userId.profileImg ? `${URL}/${i.userId.profileImg.replace('uploads\\', '')}` : defaultProfile} alt="User Avatar" className="w-12 h-12 rounded-full mx-3" />
                  <a href={`/user/${i.userId._id}`} className='ml-3 w-3/5'>
                    <p className="text-gray-800 font-semibold">{i?.userId.name}</p>
                    
                    <p className="text-gray-500 text-base">Reason : {i?.reason}</p>
                    <p className="text-gray-500 text-base"> {formatDate(i.time)}</p>
                  </a>
                </div>
               <div className='bg-slate-100 text-center'>
               {i?.userId.active ?  <Button onClick={()=>{block(i?.userId._id)} } className="bg-gray-500 dark:bg-black m-3 h-10 mr-10">Block
                {<HiBan size={18} /> }
              </Button> :  <Button onClick={()=>{unblock(i?.userId._id)}} className="m-3 h-10 bg-gray-500 dark:bg-black">Unblock
                {<HiCheck size={18}  /> }
              </Button>}
               </div>
                
              </div>
            )) }
          </div>
        </div>
      </animated.div>
    )) : <p className='text-center text-2xl my-14'>No Reports....</p>}
  </div>
      {/* Slider controls */}{ data.length !=0 &&<>
      <button type="button" className=" ml-0 lg:ml-2 absolute top-0 start-0 z-30 flex items-center justify-center h-full px-0 lg:px-4 cursor-pointer group focus:outline-none" onClick={() => setIndex((index - 1 + data.length) % data.length)} data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 dark:group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none" onClick={() => setIndex((index + 1) % data.length)} data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white group-focus:ring-gray-800/70 dark:group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button></>}
    </div>
  );
};

export default Carousel;
