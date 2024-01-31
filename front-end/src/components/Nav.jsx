
 import { useContext, useState ,useEffect} from 'react'
import { Disclosure, Menu } from '@headlessui/react'
 import { AtSymbolIcon, Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import GROW3 from '../assets/GROW3.gif'
import axios from '../axiosConfig'
import { AuthContext } from '../store/Auth'
import defaultProfile from '../assets/defaultProfile.png'
import { URL } from '../axiosConfig'
import { postContext } from '../store/Post'

 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Nav() {
  const {user,setUser} = useContext(AuthContext)
  const {getAllPosts} = useContext(postContext)
  const [suggetions,setSuggetions] = useState([])
  const [names,setNames ] = useState([]);
  const [ value,setValue ] = useState();
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const navigate = useNavigate();
    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Partners', href: '/partners', current: false },
        { name: 'Events', href: '/event', current: false },
        { name: 'Chats', href: '/chat', current: false },
      ]
      const [nav,setNav]= useState(navigation)
    
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
      const logout = ()=>{
        localStorage.removeItem('loginUser');
        localStorage.removeItem('id');
        localStorage.removeItem('loginAdmin');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login')
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
        console.log(!names?.some(user=> user.name == value))
        if (event.key === 'ArrowDown') {
          // Handle down arrow key
          event.preventDefault();
          const nextIndex = (selectedSuggestion !== null ? selectedSuggestion + 1 : 0) % suggetions.length;
          setSelectedSuggestion(nextIndex);
        } else if (event.key === 'Enter') {
          // Handle Enter key
          event.preventDefault();
          const enteredValue = names?.find(user=> user.name.toLowerCase() == value.toLowerCase())
          
          if (selectedSuggestion !== null) {
            handleSelection(suggetions[selectedSuggestion]);
          }else if(enteredValue){
             handleSelection(enteredValue);
          }else{
            toast("Sorry, User not found!");
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
      <Disclosure as="nav" className="fixed z-10  bg-gradient-to-br from-black via-blue-900 to-black w-full shadow-lg">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center  justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 my m-12 ml-0  text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <ToastContainer />
                <div className="flex md:flex-1 left-10  items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="m-6 lg:m-0 flex  items-center">
                    <img
                      className="h-fit w-16 sm:m-1  rounded-full "
                      src={GROW3}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden  sm:ml-6 sm:block">
                    <div className="ml-40 pt-4 flex space-x-4">
                      {nav.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? ' hover:animate-pulse duration-300  underline hover:bg-blue-900 text-white' : 'text-gray-300 hover:bg-blue-900 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                          onClick={()=>{setNav(nav=>{
                           const newNav = nav.map(i=>{
                              if(i.name == item.name){
                                i.current = true;
                              }else{
                                i.current = false;
                              }
                               return i})
      
                               return newNav;
      
                          })}}
      
                        >
                          {item.name}
                        </a>
                      ))}
      
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div  className='mx-5 w-52 z-50 relative'>
                  <input onKeyDown={handleKeyPress} onFocus={handleClick} value={value} onChange={handleChange}  placeholder='Find User....' className='h-10  placeholder:text-gray-200 bg-transparent rounded-full  text-white w-full ml-1 p-2 shadow-md border-gray-500 border-2 ' />
                  {suggetions?.length !=0 && <div className='absolute left-2 top-12 w-full p-2 text-gray-800  bg-gray-400'>
                    {suggetions?.map((i,index)=><a href={i._id == localStorage.getItem('id') ? '/profile' : `/user/${i._id}`}>
                      <p onClick={()=>{setValue(i.name)}} className={index === selectedSuggestion ? 'bg-gray-600 text-white cursor-pointer' : 'cursor-pointer'}
                     key={i._id}>{i.name}</p>
                    </a>)}
                  </div>}
                </div>
      
                  
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {/* <Menu.Button className="relative flex rounded-full bg-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span> */}
                        <a href="/profile" className="relative flex rounded-full bg-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900">
                        <img
                          className="h-9 w-9 rounded-full"
                          src={`${user?.profileImg ? `${URL}/${user.profileImg.replace('uploads\\', '')}` : defaultProfile} `}
                          alt=""
                        />
                        </a>
                      {/* </Menu.Button> */}
                    </div>
                    {/* <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition> */}
      
                  </Menu>
                  <div className='ml-8 hidden lg:block'><button onClick={logout} className='text-gray-300'>Logout</button></div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1  px-2 pb-3 pt-2">
                {nav.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button key='logout' as='button' onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white'
                      'block rounded-md px-3 py-2 text-base font-medium">
                  Logout
                </Disclosure.Button>
              </div>
      
            </Disclosure.Panel>
          </>
        )}
      
      </Disclosure>
    </div>
    
  )
}

   
