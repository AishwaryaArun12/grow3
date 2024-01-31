import  { useContext,useEffect  } from 'react'
import homeBg from '../assets/homeBg.png'
import { Spinner } from 'flowbite-react';
import Post from './Post'
import { postContext } from '../store/Post'

const Posts = () => {
  const {posts,getAllPosts,setPage } = useContext(postContext)
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Load more posts if the user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setPage((prevPage) => prevPage + 1);
     
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className='' >
        <div className='relative '>
            <img className='absolute z-0' src={homeBg} alt="" />
            
        </div>
        <div>
        <h2 className='relative lg:pt-36 pt-28 lg:pb-44 pb-5 px-4 lg:mb-4 text-3xl font-bold text-white text-center  
        tracking-tight  sm:text-3xl'>Innovation thrives on collaboration. Connect, create, conquer.</h2>
        </div>
        {posts?.length !== 0 ? (
        <div className='m-1'>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        </div>
        ) : <div className='flex flex-wrap justify-center gap-2 mt-40'>
          <div className="text-center">
        <Spinner color='purple' aria-label="Center-aligned spinner example" />
      </div> 
        </div> }
    </div>
  )
}

export default Posts
