import { useContext, useState ,useEffect} from 'react'
import Nav from '../components/Nav'
import { FaSearch} from 'react-icons/fa';
import ChatBox from '../components/ChatBox';
import axios from '../axiosConfig'
import { AuthContext } from '../store/Auth'
import defaultProfile from '../assets/defaultProfile.png'
import { URL } from '../axiosConfig'


const Chat = () => {
    const {user} = useContext(AuthContext)
    const [suggetions,setSuggetions] = useState([])
    const [names,setNames ] = useState([]);
    const [ value,setValue ] = useState();
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [conversations,setConversations] = useState([]);
    const [conv,setConv] = useState('d');
    const [bar,setBar] = useState(false);
    

    useEffect(()=>{
        async function getConversation(){
            try {
                console.log(user,'nbjj')
                const res = await axios.get(`/chat/get_conversations/${user._id}`)
                setConversations(res.data.result)
            } catch (error) {
               console.log(error) 
            }
        } 
        getConversation();
    },[user])
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
    
      const handleSelection =async (selectedUser) => {
        
        setValue(selectedUser.name); 
        setSelectedSuggestion(null); 
        setSuggetions([]);
        try {
            const res = await axios.post('/chat/create_conversation',{senderId: user._id,receiverId: selectedUser._id})
            setConversations(prev => [...prev,res.data.result]);
            setValue('')
        } catch (error) {
            console.log(error)
        }
        
      };
  return (
    <div>
      <Nav/>

      <div className="flex h-screen w-full antialiased text-gray-800 fixed pt-10">
  <div className="lg:flex block lg:flex-row h-full w-full overflow-x-hidden ">
    <div className="flex flex-col py-8 pl-6 pr-4 lg:w-64 bg-white w-full flex-shrink-0 border">
      <div className="flex flex-row items-center py-9 h-12 w-full">
        <div onClick={()=>{setBar(!bar)}} className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">QuickChat</div>
      </div>
     
      <div className={`lg:flex lg:flex-col mt-2 ${!bar ? 'hidden' : 'block'}`}>
        <div className="lg:flex lg:flex-row items-center justify-between text-xs">
        <div className="relative w-full">
  <input
    onKeyDown={handleKeyPress} onFocus={handleClick} value={value} onChange={handleChange}
    type="text"
    placeholder="Search..."
    className="flex w-full border-0 border-b-2 rounded-xl focus:outline-none focus:border-indigo-300 pl-10 h-10"
  />
  {suggetions?.length !=0 && <div className='absolute rounded-md left-2 top-12 w-full p-2 text-gray-800  bg-gray-200'>
                    {suggetions?.map((i,index)=>
                      <p onClick={()=>{handleSelection(i)}} className={index === selectedSuggestion ? 'bg-gray-400 p-1 text-white cursor-pointer' : 'cursor-pointer p-1'}
                     key={i._id}>{i.name}</p>
                    )}
                  </div>}
   <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
    <FaSearch className="text-gray-400" />
  </div>
 
</div>

        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 max-h-96  overflow-y-auto">
          {conversations.length != 0 && conversations.map((conv)=>{
            const member = conv.members.filter(i=> i._id != user._id);
            return (
                <button onClick={()=>{setConv(conv)}} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
            <img src={member[0]?.profileImg ? `${member[0].profileImg}`: defaultProfile} alt="User Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="ml-2 text-sm font-semibold">{member[0]?.name}</div>
            {/* <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">2</div> */}
          </button>
            )
          }) }
          
          
        </div>
      </div>
    </div>
    <div className='w-full '>
    <ChatBox conv={conv}/>
    </div>
</div>
</div>;


 

    </div>
  )
}

export default Chat
