/* eslint-disable react/prop-types */
import  { useContext, useEffect, useRef ,useState} from 'react'
import { MdPhotoLibrary } from 'react-icons/md'
import { FaTelegramPlane } from 'react-icons/fa';
import axios from '../axiosConfig';
import { postContext } from '../store/Post';
import { URL } from '../axiosConfig';

const PostModalbody = ({close,ePost}) => {
    const postImgRef = useRef(null);
    const [postImg, setPostImg] = useState();
    const [error,setError] = useState();
    const [description,setDescription] = useState();
    const {setPosts,getAllPosts} = useContext(postContext)
    const [oldImg,setOldImg] = useState()
    let ePostImg;
    if(ePost){
      ePostImg = ePost.media;
    }
    useEffect(()=>{
      if(ePost){
        setDescription(ePost.description)
        setOldImg(ePost.media)
      }
    },[])
    const handleSubmit = async()=>{
      try {
        const file = postImg;
        const res = await axios.post('/post/create',{file,description},{
          headers: {
            'Content-Type': 'multipart/form-data',
          }}
        )
        setDescription('');
        setPostImg('');
        getAllPosts();
        close()
      } catch (error) {
        setError(error.message)
      }
    }
    const handleClick = async ()=>{
      if(!ePost){
        handleSubmit()
      }else{
        try {
          
          const file = oldImg ?? postImg;
           await axios.patch('/post/edit_post',{id: ePost._id,file,description,ePostImg},{
            headers: {
              'Content-Type': 'multipart/form-data',
            }}
          )
          setDescription('');
          setPostImg('');
          getAllPosts();
          close()
        } catch (error) {
          setError(error.message)
        }
      }
    }
  return (
    <div>
      {error && <p className='ml-6 m-2 p-2 text-red-700 '>{error}</p>}
      <div className="relative z-0 col-span-2 m-3 mt-3">
              <textarea type='text' value={description} onChange={(e)=>{setDescription(e.target.value)}} rows="5" className="peer mb-7 block w-full appearance-none  rounded-xl border-transparent bg-transparent py-4 px-1 text-base text-gray-900 focus:border-none focus:outline-none focus:ring-0" placeholder=" "></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-lg ml-3 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">{`${ePost ? 'Edit Post...': 'Start a Post....'}`}</label>
                    </div>
                    {postImg &&                       
                          <div>                            
                           <img src={window.URL.createObjectURL(postImg)} alt="" />
                          </div>                       
                      
                      }   
                      {oldImg &&                       
                          <div>                            
                           <img src={`${URL}/${oldImg.replace('uploads\\', '')}`} alt="" />
                          </div>                       
                      
                      }                    
                    <div className=' flex justify-between ml-4 absolute bottom-0 left-0 right-0 bg-white p-4'>
                      <div className='flex pt-1'>
                      <MdPhotoLibrary size={27} color="blue" className='opacity-60' />
                      <p onClick={()=>{postImgRef.current.click();}}>Media</p>
                      </div>
                      <input
                          type="file"
                          ref={postImgRef}
                          className='hidden'
                          name='file'
                          onChange={(e)=>{setPostImg(e.target.files[0]);setOldImg()}}
                        />
                      <div className='flex pt-1' onClick={handleClick}>
                      <FaTelegramPlane size={25} color="black" className='opacity-60' />
                      <p>Post</p>
                      </div>
                    </div>
    </div>
  )
}

export default PostModalbody
