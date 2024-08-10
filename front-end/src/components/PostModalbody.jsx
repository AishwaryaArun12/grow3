/* eslint-disable react/prop-types */
import  { useContext, useEffect, useRef ,useState} from 'react'
import { MdPhotoLibrary } from 'react-icons/md'
import { FaTelegramPlane } from 'react-icons/fa';
import axios from '../axiosConfig';
import { firebaseContext, postContext } from '../store/Post';

import { ref,uploadBytes,getDownloadURL,deleteObject } from "firebase/storage";


const PostModalbody = ({close,ePost}) => {
    const postImgRef = useRef(null);
    const [postImg, setPostImg] = useState();
    const [error,setError] = useState();
    const [description,setDescription] = useState();
    const {setPosts,getAllPosts} = useContext(postContext)
    const [oldImg,setOldImg] = useState();
    const {db,storage} = useContext(firebaseContext)
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
     
      if(postImg || description && description?.trim() != ''){
        if(postImg?.name){

          try {
            const imageRef = ref(storage, postImg.name);
      const pathImagesRef = ref(storage, `images/${postImg.name}`);
      
      uploadBytes(pathImagesRef, postImg).then((snapshot) => {
        console.log('Uploaded a blob or file!',snapshot);
        getDownloadURL(ref(storage, pathImagesRef))
    .then(async(url) => {
      const file = url;
            const res = await axios.post('/post/create',{file,description})
            
            getAllPosts();
    })
      });
            
          } catch (error) {
            console.log(error,'sssss');
            setError(error.message)
          }
        }else{
          try {
            const res = await axios.post('/post/create',{description})

            getAllPosts();
          } catch (error) {
            console.log(error,'sssss');
            setError(error.message)
          }
        }
      }else{
        setError('Add something which you want to share')
      }
      setDescription('');
      setPostImg('');
      
      close()
    }
    const handleClick = async ()=>{
      if(!ePost){
        handleSubmit()
      }else{
        try {
        
          if(!oldImg){
            const desertRef = ref(storage, ePost.media);
          deleteObject(desertRef).then(() => {
            console.log('deleted successfully')
          }).catch((error) => {
            console.log('error',error)
          });
            const imageRef = ref(storage, postImg.name);
          const pathImagesRef = ref(storage, `images/${postImg.name}`);
          
          uploadBytes(pathImagesRef, postImg).then((snapshot) => {
            console.log('Uploaded a blob or file!',snapshot);
            getDownloadURL(ref(storage, pathImagesRef))
        .then(async(url) => {
          const file = url;
          const res= await axios.patch('/post/edit_post',{id: ePost._id,file,description})
          getAllPosts();
        })
          });
          
          }else{
            await axios.patch('/post/edit_post',{id: ePost._id,file:ePost.media,description})
            getAllPosts();
          }
          
          
        } catch (error) {
          setError(error.message)
        }
        setDescription('');
          setPostImg('');
          close()
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
                           <img src={`${oldImg}`} alt="" />
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
