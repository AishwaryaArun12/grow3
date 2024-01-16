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
          {isSidebarOpen ? <HiMenu size={24}/> : <div className='flex'><img src={GROW3} className='h-20 w-40' alt="" /><HiMenu size={24} className='mt-7'/></div>}
        </button>
        {isSidebarOpen && (
          // Render the sidebar when it's open
          <Sidebar aria-label="Sidebar with logo branding example"   className=' h-full'>
            <img src={GROW3} className='h-20 w-48' alt="" />
            <Sidebar.Items className='m-2'>
              <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
              <DarkThemeToggle/>
                </Sidebar.Item>
                <Sidebar.Item href="/admin/home" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>              
                <Sidebar.Item href="#" icon={HiInbox}>
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="/admin/users" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                  Subscriptions
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiViewBoards}>
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
      <Sidebar aria-label="Sidebar with logo branding example" className='h-screen fixed'>
        <img src={GROW3} className='h-20 w-full' alt="" />
        <Sidebar.Items className='m-2 text-lg'>
          <Sidebar.ItemGroup>
          <Sidebar.Item href="#" >
          <DarkThemeToggle className='mr-2'/> Theme Toggler
            </Sidebar.Item>
            <Sidebar.Item className='m-2 focus:bg-gray-200 dark:focus:bg-gray-600 text-lg' href="/admin/home" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            
            <Sidebar.Item className='m-2 text-lg' href="#" icon={HiInbox}>
              Inbox
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
