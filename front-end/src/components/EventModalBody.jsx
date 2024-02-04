import React, { useState ,useEffect,useRef, useContext} from 'react'
import { useForm } from 'react-hook-form';
import axios,{URL} from '../axiosConfig'
import DateTime from './DateTime';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../store/Auth';
import { Button } from 'flowbite-react';
import { firebaseContext } from '../store/Post';
import { ref,uploadBytes,getDownloadURL,deleteObject } from "firebase/storage";
 
  

const EventModalBody = ({close,updatePost,ePost}) => {
  const {user} = useContext(AuthContext);
    const modalRef = useRef();
    const [error,setError] = useState();
    const {register,handleSubmit} = useForm({
        defaultValues : {
            name : ePost?.name,
            description : ePost?.description,
            eventLink : ePost?.eventLink,
            startTime : ePost?.startTime,
            endTime : ePost?.endTime
        }
    });
    const {db,storage} = useContext(firebaseContext)
    const [start,setStart]= useState();
    const [end,setEnd] = useState();
    const initialSpeakers = ePost?.speakers ?? []
    const [speakers,setSpeakers ] = useState(initialSpeakers);
    const [selectedFile, setSelectedFile] = useState(ePost?.media);
    const [value,setValue] = useState();
    const [names,setNames] = useState([]);
    const [suggetions,setSuggetions] = useState([])
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];

      setSelectedFile(file);
    };

    const submit = async (data)=>{
      const textRegex = /^[A-Za-z0-9\s.,'-]+$/;
      function isEndTimeGreaterThanStartTime(startTime, endTime) {
        const parseDate = (dateString) => {
          const [day,month,YearTimePeriod] = dateString.split('-');
          const [year,timePeriod] = YearTimePeriod.split(',');
          let [hours, minutes] = timePeriod.split(':');
          const isPM = minutes.includes('PM');
          minutes = minutes.slice(0,3)
          return new Date(parseInt(year),parseInt(month)-1,parseInt(day),isPM ? parseInt(hours) + 12 : parseInt(hours),parseInt(minutes),0,0);
        };
      
      const startDate = parseDate(startTime).getTime();
        const endDate = parseDate(endTime).getTime();
        return endDate > startDate;
      }
        if(ePost){
            try {
                let startTime;
                if(start._dateValue != ''){
                    startTime =`${start._dateValue}, ${start._timeValue}`
                }else{
                    startTime = ePost.startTime;
                }
                let endTime;
                
                if(end._dateValue != ''){
                    endTime =`${end._dateValue}, ${end._timeValue}`
                    console.log((endTime,'if'))
                }else{
                    endTime = ePost.endTime;
                    console.log((endTime,'else'))
                }
                 if(!selectedFile){
                  toast('Please select one image for your event')
                 }else if(speakers.length == 0){
                  toast('Should add speakers')
                 }else if(!isEndTimeGreaterThanStartTime(startTime,endTime)){
                  toast('Ending time must be greater than starting time')
                 }else if(data.eventLink.trim() == "" || !textRegex.test(data.name.trim()) || data.name.trim() == "" || !textRegex.test(data.description.trim()) || data.description.trim() == ""){
                  toast('Invalid input')
                 }else{
                  if(selectedFile){
                    const desertRef = ref(storage, ePost?.media);
                    deleteObject(desertRef).then(() => {
                      console.log('deleted successfully')
                    }).catch((error) => {
                      console.log('error',error)
                    });
                    const imageRef = ref(storage, selectedFile.name);
                    const pathImagesRef = ref(storage, `images/${selectedFile.name}`);
                    
                    uploadBytes(pathImagesRef, selectedFile).then((snapshot) => {
                      console.log('Uploaded a blob or file!',snapshot);
                      getDownloadURL(ref(storage, pathImagesRef))
                  .then(async(url) => {
                    const file = url;
                     const result =  await axios.patch('/event/edit_event',{...data,id:ePost._id,media:file,startTime,endTime,userId : localStorage.getItem('id'),speakers});
                    console.log(result,url,'hhhhhhhhh')
                     if(updatePost){
                      updatePost();
                    }
                    close();    
                  })
                    });
                  }else{
                    const result =  await axios.patch('/event/edit_event',{...data,id:ePost._id,media:ePost?.media,startTime,endTime,userId : localStorage.getItem('id'),speakers});
                    if(updatePost){
                      updatePost();
                    }
                    close(); 
                  }
                  
                 }
                 
                
             } catch (error) {
                 setError(error.message)
                 console.log(error)
             }

        }else{
            try {
              if(!selectedFile){
                toast("Please select one image for your event");
               }else if(speakers.length == 0){
                toast('Should add speakers')
               }else if(!start){
                toast("You didn't mention stating time");
               }else if(!end){
                toast("You didn't mention ending time");
               }else if(!isEndTimeGreaterThanStartTime(`${start._dateValue}, ${start._timeValue}`,`${end._dateValue}, ${end._timeValue}`)){
                toast('Ending time must be greater than starting time')
               }else if(data.eventLink.trim() == "" || !textRegex.test(data.name.trim()) || data.name.trim() == "" || !textRegex.test(data.description.trim()) || data.description.trim() == ""){
                toast('Invalid input')
               }else{
                const imageRef = ref(storage, selectedFile.name);
                const pathImagesRef = ref(storage, `images/${selectedFile.name}`);
                
                uploadBytes(pathImagesRef, selectedFile).then((snapshot) => {
                  console.log('Uploaded a blob or file!',snapshot);
                  getDownloadURL(ref(storage, pathImagesRef))
              .then(async(url) => {
                const file = url;
                      const result =  await axios.post('/event/create',{...data,media:file,startTime:`${start._dateValue}, ${start._timeValue}`,endTime:`${end._dateValue}, ${end._timeValue}`,userId : localStorage.getItem('id'),speakers});
                      if(updatePost){
                        updatePost(prev=>[...prev,result.data.result])
                      }
                       
                       close();
              
                    })
                });
              
                    }
             } catch (error) {
                 setError(error.message)
                 console.log(error)
             }
        }
    }

    const handleClick = async()=>{
        if(names.length == 0){
          try {
            const res = await axios.get('/get_all_users')
            setNames(res.data.users)
          } catch (error) {
            console.log(error)
          }
        }
      }
      const handleChange = (e)=>{
        setValue(e.target.value);
       if(e.target.value == ''){
        setSuggetions([]);
       }else{
        const filterFunction = (user) => user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
        const filteredUserData = names?.filter(filterFunction);
        setSuggetions(filteredUserData)
       }
      }
      const handleKeyPress = (event) => {
        if (event.key === 'ArrowDown') {
          // Handle down arrow key
          event.preventDefault();
          const nextIndex = (selectedSuggestion !== null ? selectedSuggestion + 1 : 0) % suggetions.length;
          setSelectedSuggestion(nextIndex);
        } else if (event.key === 'Enter') {
          // Handle Enter key
          event.preventDefault();
          if (selectedSuggestion !== null) {
            console.log(suggetions[selectedSuggestion],'aaaaaaaaaa')
            handleSelection(suggetions[selectedSuggestion]);
          }
        }
      };
    
      const handleSelection = (selectedUser) => {
        setSpeakers(prev=>[...prev,selectedUser.name]); 
        setSelectedSuggestion(null); 
        setSuggetions([]);
        setValue('')
      };
  return (
    <div>
     
     {new Date(user?.primium?.endingDate).getTime() >= Date.now() ? <form onSubmit={handleSubmit(submit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">         
          {error && 
            <p className='text-red-700 p-3'>{error}</p>
          }
           <div>
           <ToastContainer position="top-center" theme='dark' />
      <label className='width-4/5 h-40 p-2 cursor-pointer' htmlFor="fileInput">
        {selectedFile ? (
          // Display the selected image
          <img src={typeof selectedFile == 'string' ? `${selectedFile?.replace}` : window.URL.createObjectURL(selectedFile)} alt="Selected" className="max-h-52 w-full" />
        ) : (
          // Display a placeholder or an icon
          <span className="block text-center border w-full h-40 p-5">Click to select an image</span>
        )}
      </label>
      <input
        type="file"
        id="fileInput"
        className='sr-only'
        onChange={handleFileChange}
        accept="image/*" // Specify the accepted file types (images in this case)
      />
    </div>
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-7">
              <label htmlFor="username" className="block text-sm font-medium leading-6  text-gray-900">
                Event Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register('name')}
                  />
                </div>
              </div>
            </div>
           

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('description')}
                />
              </div>
             
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about Event.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Event Link
              </label>
              <div className="mt-2" >
                <input
                  type="text"
                  name="link"
                  id="link"
                  autoComplete="link"
                  {...register('eventLink')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  
                />
              </div>
            </div>
            <DateTime reg={register}  set={setStart} date={ePost?.startTime} label={'Start'}/>
               <DateTime reg={register}  set={setEnd} date={ePost?.endTime} label={'End'}/>

            <div className="sm:col-span-7">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Speakers
              </label>
              <div className="mt-2 relative">
                <input
                onKeyDown={handleKeyPress} onFocus={handleClick} onChange={handleChange}
                  id="speakers"
                  name="speakers"
                  type="text"
                  autoComplete="speakers"
                  value={value}
                  placeholder={speakers.join(',')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {suggetions?.length !=0 && <div className='absolute left-2 top-12 w-full p-2 text-gray-800  bg-gray-400'>
                    {suggetions?.map((i,index)=>
                      <p onClick={()=>{
                        setSpeakers(prev=>[...prev,i.name]);
                        setValue('');
                        setSelectedSuggestion(null); 
                        setSuggetions([]);
                    }} className={index === selectedSuggestion ? 'bg-gray-600 text-white cursor-pointer' : 'cursor-pointer'}
                     key={i._id}>{i.name}</p>
                    )}
                  </div>}
              </div>
            </div>
            
          </div>
        </div>

       
       
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={close} className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form> :<> <p className='m-6 font-serif text-lg'>Sorry, Only premium members can create an event !!</p>
    <Button className='bg-blue-950 enabled:hover:bg-black p-0 ml-10' onClick={()=>{window.location.href = '/premium'}}>Go with Premium</Button>
    </>}
    </div>
  )
}

export default EventModalBody
