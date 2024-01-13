import  { useContext, useState } from 'react';
import defaultProfile from '../assets/defaultProfile.png'
import { URL } from '../axiosConfig';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import axios from '../axiosConfig';
import { AuthContext } from '../store/Auth';
import { postContext } from '../store/Post';
import Modal from './Modal'
import Confirm from './Confirm';

const ReplyComment = ({comment,commentId}) => {
    const {user} = useContext(AuthContext)
    const {getAllPosts} = useContext(postContext)
    const [dropdown,setDropdown] =  useState(false)
    const [ emoji ,setEmoji] = useState(false);
    const [reply,setReply]= useState(false);
    const [mention,setMention] = useState('')
    const [ReplyComment,setReplyComment] = useState('');
    const [error,setError] = useState()
    const [editInput,setEditInput]  = useState(false)
    const [editComment, setEditComment] = useState(comment.reply);

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
      const addReply = async()=>{
        try {
             await axios.patch('/post/add_reply',{commentId,userId:user._id, reply:ReplyComment, time : new Date(),mention : mention._id});
            setMention('');
            setReplyComment('')
            setReply(!reply)
            getAllPosts();
        } catch (error) {
            setError(error.message)
        }
      }
      const edit =async ()=>{
        try {
          await axios.patch('/post/edit_comment_reply',{commentId, replyId : comment._id, text : editComment})
          
          getAllPosts();
          setError()
          setEditInput(false);
        } catch (error) {
          setError(error.message)
        }
      }
      const remove = async()=>{
        try {
          await axios.patch('/post/delete_reply',{commentId,replyId:comment._id});
          getAllPosts();
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
       <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-10 h-10 rounded-full"
              src={comment.userId.profileImg ? `${URL}/${comment.userId.profileImg.replace('uploads\\', '')}`: defaultProfile}
              alt="Michael Gough"
            />
            {comment.userId.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
              {formatDate(comment.time)}
            </time>
          </p>
        </div>
       <div className='relative'>
       <button
          id="dropdownComment1Button"
          onClick={()=>{setDropdown(!dropdown)}}
          className=" inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* Dropdown menu */}
        <div
          id="dropdownComment1"
          className={`${dropdown ? 'absolute' : 'hidden'} right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
          {user._id == comment.userId._id ? <> <li>
              <p onClick={()=>{setEditInput(true);setDropdown(!dropdown);}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Edit
              </p>
            </li>
            <li>
              <div>
              <Modal confirmation='Are you sure you want to remove this reply ?'  body={Confirm} updatePost={remove}
              button={(<p onClick={()=>{setDropdown(!dropdown)}} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</p>)}/>
              </div>
            </li>
           </> :  <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Report
              </a>
            </li>}
          </ul>
        </div>
       </div>
      </footer>
      <p className="text-gray-700 dark:text-gray-400">
        <span className='text-blue-500'>@{comment.mention.name} </span> {comment.reply}
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button
         onClick={()=>{setReply(!reply); setMention(comment.userId)}}
          type="button"
          className="flex items-center text-sm text-gray-900 hover:underline dark:text-gray-400 font-medium"
        >
          <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
          </svg>
          Reply
        </button>
      </div>
      {reply && <>{error && <p className='text-red-700 ml-8 mt-2'>{error}</p>}
      <div className='flex m-4 relative'>
       
      <span>
          <button className='mt-2 text-2xl mx-1' onClick={()=>{setEmoji(!emoji)}}>&#x1F60A;</button>
          {emoji && <div className='absolute z-40'><Picker   data={data} onEmojiSelect={(emoji)=>{setReplyComment(prev=>prev+emoji.native);setEmoji(!emoji)}} /></div>}
        </span>
      <div class="relative w-full">
      
    <input type="text" id="floating_outlined" value={ ReplyComment} onChange={(e)=>{setReplyComment(e.target.value)}} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-3xl border-1 border-blue-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:border-blue-800 peer" placeholder=" " />
    <label for="floating_outlined" className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Reply to @{mention.name}</label>
    </div>
    <FaPaperPlane size={25}  className='mt-3 text-blue-900' onClick={addReply}/>
      </div></>}
      {editInput && <>{error && <p className='text-red-700 ml-8 mt-2'>{error}</p>}
      <div className='flex m-4 relative'>
       
      <span>
          <button className='mt-2 text-2xl mx-1' onClick={()=>{setEmoji(!emoji)}}>&#x1F60A;</button>
          {emoji && <div className='absolute z-40'><Picker   data={data} onEmojiSelect={(emoji)=>{setEditComment(prev=>prev+emoji.native);}} /></div>}
        </span>
      <div class="relative w-full">
      
    <input type="text" id="floating_outlined" value={ editComment} onChange={(e)=>{setEditComment(e.target.value)}} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-3xl border-1 border-blue-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:border-blue-800 peer" placeholder=" " />
    <label for="floating_outlined" className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edit Reply</label>
    </div>
    <FaPaperPlane size={25} onClick={edit}  className='mt-3 text-blue-900 hover:text-blue-400' />
    <FaTimes size={25} onClick={()=>{setEditInput(false)}}  className='mx-3 mt-3 text-red-900 hover:text-red-400'/>
      </div></>}
    </article>
  );
};

export default ReplyComment;
