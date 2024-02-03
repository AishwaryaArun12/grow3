import React, { useState ,useContext} from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaHeart, FaPaperPlane, FaComment,FaCommentSlash} from 'react-icons/fa';
import { URL } from '../axiosConfig';
import defaultProfile from '../assets/defaultProfile.png'
import axios from '../axiosConfig';
import { postContext } from '../store/Post';
import { AuthContext } from '../store/Auth';
import ReplyComment from './ReplyComment';
import Comment from './Comment';
import Modal from './Modal'
import Confirm from './Confirm';
import PostModalbody from './PostModalbody';
import ReportConfirm from './ReportConfirm';

const Post = ({post}) => {
  const {user} = useContext(AuthContext)
  const {setPosts,getAllPosts} = useContext(postContext)
  const [ emoji ,setEmoji] = useState(false);
  const [comments,setComments] = useState(false);
  const [newcomment,setNewComment] = useState('')
  const id = localStorage.getItem('id');
  const [dropdown,setDropdown] = useState(false);
 
  const toggleColour = async(event) => {
    const icon = event.currentTarget;
    
    // Check the current color and toggle it
    if (post.likes.includes(id)) {
      
      try {
        await axios.patch('/post/remove_like',{id : post._id,comment : newcomment})
        icon.style.color = 'gray';
        setPosts((prev) => {
          const newposts = prev.map((i) => {
            if (i._id === post._id) {
              // Use $pull to remove the specific id from the likes array
              return { ...i, likes: i.likes.filter((likeId) => likeId !== id) };
            } else {
              return i;
            }
          });
          
          return newposts
        });
      } catch (error) {
        console.log(error);
      }
    }
     else {
      
      try {
        await axios.patch('/post/add_like',{id : post._id})
        icon.style.color = 'red';
        setPosts((prev) => {
          const newpost =  prev.map((i) => {
            if (i._id === post._id) {
              // Use $pull to remove the specific id from the likes array
              return { ...i, likes: [...i.likes,id] };
            } else {
              return i;
            }
          });
          
          return newpost;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
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

  const addComment =async ()=>{
    if(newcomment.trim() != ''){
      try {
         await axios.patch('/post/add_comment',{id:post._id,comment:newcomment});
  
        setNewComment('')
        getAllPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }
  const remove = async()=>{
    try {
      if(post.media){
        await axios.delete(`/post/delete/${post._id}/${post.media}`);
      }else{
        await axios.delete(`/post/delete/${post._id}/up/media`);
      }
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  }
  const report = async (reason)=>{
    try {
      const res = await axios.post('/post/report',{reason,reportFor: 'post',itemId : post._id, userId: user._id})
      return res.data.message
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <div className="bg-gray-100 w-full flex items-center justify-center">
      
    <div className="bg-white p-4 shadow-md w-full">
      {/* User Info with Three-Dot Menu */}
      <div className="flex items-center justify-between mb-4">
        <a href={localStorage.getItem('id') != 'ADMIN' ? `/user/${post?.userId?._id}`: `/admin/user/${post?.userId?._id}`}>
        <div className="flex items-center space-x-2">
          
          <img src={post?.userId?.profileImg ? `${URL}/${post?.userId.profileImg.slice(8)}`: defaultProfile} alt="User Avatar" className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-gray-800 font-semibold">{post?.userId?.name}</p>
            <p className="text-gray-500 text-sm">{formatDate(post?.time)}</p>
          </div>
        </div>
        </a>
        <div className='relative'>
      {localStorage.getItem('id') != 'ADMIN' &&  <button
          id="dropdownComment1Button"
          onClick={()=>{setDropdown(!dropdown)}}
          className=" inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>}
        {/* Dropdown menu */}
        <div
          id="dropdownComment1"
          className={`${dropdown ? 'absolute' : 'hidden'} right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
          {user?._id == post?.userId?._id ? <> <li>
              <Modal 
                button={(<p onClick={()=>{setDropdown(!dropdown)}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</p>)} 
                body={PostModalbody} post={post}/>
            </li>
            <li>
              <div>
              <Modal confirmation='Are you sure you want to remove this post ?'  body={Confirm} updatePost={remove}
              button={(<p onClick={()=>{setDropdown(!dropdown)}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</p>)}/>
              </div>
            </li>
           </> :  <li>
           <div>
              <Modal title={'Report'}   body={ReportConfirm} updatePost={report}
              button={(<p onClick={()=>{setDropdown(!dropdown)}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</p>)}/>
              </div>
            </li>}
          </ul>
        </div>
       </div>
      </div>

      {/* Message */}
      <p className="mb-4 text-gray-800">
        {post?.description}
      </p>

      {/* Image */}
      {post?.media && <img src={`${post?.media}`} alt="Post Image" className="mb-4 w-full h-96 object-cover rounded-md" />}

      {/* Like and Comment Section */}
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <FaHeart onClick={localStorage.getItem('id') != 'ADMIN' ? toggleColour : ''}   className={`${post?.likes?.includes(user?._id)? 'text-red-700': 'text-gray-500'} w-5 h-5 fill-current`}/>
            <span>{post?.likes?.length} Likes</span>
          </button>
        </div>
        <button onClick={localStorage.getItem('id') != 'ADMIN' ? ()=>{setComments(!comments)} : ''} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <FaComment className='w-5 h-5 fill-current'/>
          <span>{post?.comments?.length} Comments</span>
        </button>
      </div>
      {comments && <><hr className="mt-1 mb-2" />
      <div className='flex justify-between'>
        <p className="text-gray-800 font-semibold mt-1">Comments</p>
        {localStorage.getItem('id') != 'ADMIN' && <div className="relative z-0 flex">
        <span>
          <button className='mt-2' onClick={()=>{setEmoji(!emoji)}}>&#x1F60A;</button>
          {emoji && <div className='absolute'><Picker  data={data} onEmojiSelect={(emoji)=>{setNewComment(prev=>prev+emoji.native);}} /></div>}
        </span>
        <div>
          <input value={newcomment} onChange={(e)=>{setNewComment(e.target.value)}} type="text" id="floating_standard" class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="floating_standard" className={`${newcomment !=''? 'hidden' : 'block'} absolute text-base text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>Add your comment.....</label>
        </div>
        <FaPaperPlane  className='mt-3' onClick={addComment}/>
        </div>}
        </div>
      <hr className="mt-2 mb-2" />
      
     {/* Comments */}
<div className="mt-4 h-auto max-h-88 overflow-y-auto">
  {post?.comments?.length !== 0 ? (
    post.comments.map((comment) => (
      <React.Fragment key={comment._id}>
        <Comment comment={comment} />
        {comment?.reply.map((reply) => (
          <React.Fragment key={reply._id}>
            <ReplyComment comment={reply} commentId={comment._id}/>
          </React.Fragment>
        ))}
      </React.Fragment>
    ))
  ) : (
    <div className="flex justify-center p-4 w-full">
      <FaCommentSlash size={24} />
      <p className="mx-3">No Comments yet</p>
    </div>
  )}
</div>
</>}
    </div>
  </div>
  )
}

export default Post
