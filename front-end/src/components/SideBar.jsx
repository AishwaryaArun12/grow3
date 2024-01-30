import  { useState } from 'react'
import { Sidebar, DarkThemeToggle } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiMenu } from 'react-icons/hi';
import GROW3 from '../assets/GROW3.gif'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';


const SideBar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const logout = ()=>{
        localStorage.removeItem('loginUser');
        localStorage.removeItem('id');
        localStorage.removeItem('loginAdmin');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('forgotPassword');
        navigate('/login')
      }

    // Use media query to check if the screen is in mobile view
    const isMobile = useMediaQuery({ maxWidth: 767 });
  
    const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
    {isMobile ? (
      // Render a button to toggle the sidebar in mobile view
      <div >
        <button onClick={handleToggleSidebar}>
          {isSidebarOpen ? <HiMenu size={24}/> : <div className='flex w-screen justify-between'><img src={GROW3} className='h-20 rounded-full w-20 m-2' alt="" /><HiMenu size={24} className='mt-7'/></div>}
        </button>
        {isSidebarOpen && (
          // Render the sidebar when it's open
          <Sidebar aria-label="Sidebar with logo branding example"   className=' h-full'>
            <img src={GROW3} className='h-20 rounded-lg w-48' alt="" />
            <Sidebar.Items className='m-2'>
              <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
              <DarkThemeToggle/>
                </Sidebar.Item>
                <Sidebar.Item href="/admin/home" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>              
                
                <Sidebar.Item href="/admin/users" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="/admin/subscription" icon={HiShoppingBag}>
                  Subscriptions
                </Sidebar.Item>
                <Sidebar.Item href="/admin/reports" icon={HiViewBoards}>
                  Reports
                </Sidebar.Item>
                {/* <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item> */}
                <Sidebar.Item  icon={HiTable}>
                  <button onClick={logout}>Logout</button>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        )}
      </div>
    ) : (
      // Render the full sidebar in non-mobile view
      <>
      <div className='w-60'></div>
      <Sidebar aria-label="Sidebar with logo branding example" className='h-screen fixed '>
        <div className='flex justify-around'>
        <img src={GROW3} className='rounded-full h-20 w-4/12' alt="" />
        <label for="toggle-example" class="pt-10 flex items-center cursor-pointer relative">
          <div class="toggle-bg dark:bg-gray-700 bg-grey-200 border-2 border-gray-200 h-8 w-16 after:hidden rounded-full"><DarkThemeToggle  id="toggle-example" className=' enabled:border-none p-0 dark:translate-x-9 mt-1 translate-x-1'/> </div>
          </label>
        </div>
        <Sidebar.Items className='m-2 mt-0 text-lg'>
          <Sidebar.ItemGroup>
          <Sidebar.Item href="#" >
          
            </Sidebar.Item>
            <Sidebar.Item className='m-2 focus:bg-gray-200 dark:focus:bg-gray-600 text-lg' href="/admin/home" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            
            <Sidebar.Item className='m-2 text-lg' href="/admin/users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item className='m-2 text-lg' href="/admin/subscription" icon={HiShoppingBag}>
              Subscriptions
            </Sidebar.Item>
            <Sidebar.Item href="/admin/reports" className='m-2 text-lg' icon={HiViewBoards}>
              Reports
            </Sidebar.Item>
            {/* <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item> */}
            <Sidebar.Item className='m-2 text-lg'  icon={HiTable}>
                  <button onClick={logout}>Logout</button>
                </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      </>
    )}
  </div>
  )
}

export default SideBar
