import React,{useState} from 'react'
import SideBar from '../components/SideBar';
import Users from '../components/Users';
import { Flowbite } from 'flowbite-react';

const AdminUsers = () => {
    const [value ,setValue] = useState()
    const [suggetions,setSuggetions] = useState([])
    const [names,setNames ] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

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
            handleSelection(suggetions[selectedSuggestion]);
          }
        }
      };
    
      const handleSelection = (selectedUser) => {
        
        setValue(selectedUser.name); 
        setSelectedSuggestion(null); 
        setSuggetions([]);
        if(localStorage.getItem('id') == selectedUser._id){
          window.location.href= '/profile'
        }else{
          window.location.href= `/user/${selectedUser._id}`;
        }
        
      };
  return (
    <div>
       <Flowbite>
  <div className='sm:block lg:flex h-screen dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
    <div>
    <SideBar/>
   
    </div>
    <div>
    <div  className='mx-20 w-52 z-50 m-3 lg:mt-10  relative'>
                  <input onKeyDown={handleKeyPress} onFocus={handleClick} value={value} onChange={handleChange}  placeholder='Find User....' className='h-10 dark:placeholder:text-gray-200 dark:bg-transparent  placeholder:text-gray-700 bg-gray:200 rounded-full  text-white w-full ml-1 p-2 shadow-md border-gray-500 border-2 ' />
                  {suggetions?.length !=0 && <div className='absolute left-2 top-12 w-full p-2 text-gray-800  bg-gray-400'>
                    {suggetions?.map((i,index)=><a href={ `/user/${i._id}`}>
                      <p onClick={()=>{setValue(i.name)}} className={index === selectedSuggestion ? 'bg-gray-600 text-white cursor-pointer' : 'cursor-pointer'}
                     key={i._id}>{i.name}</p>
                    </a>)}
                  </div>}
                </div>
        <Users/>
    </div>
  </div>
   </Flowbite>
    </div>
  )
}

export default AdminUsers
