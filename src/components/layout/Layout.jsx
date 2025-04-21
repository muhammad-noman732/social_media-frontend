import React from 'react';

import Navbar from "../navbar/Navbar"
import { Outlet ,  useLocation } from 'react-router-dom';
import SideBar from '../sidebar/Sidebar';

const Layout = () => {
  const location = useLocation();
  const hideSidebarPaths = ['/profile' , '/signup' ,'/login'] ;

  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);
  return (
    <div>
      <Navbar/>
      {/* fixes side bar accross all components */}

      {
      !shouldHideSidebar  &&( 
       <div className="hidden lg:block fixed top-14 left-0 w-[350px] h-screen overflow-y-auto bg-white border-r">
          <SideBar />
        </div>
        )}
         
       <main className={`p-4 ${!shouldHideSidebar ? 'lg:ml-[100px]' : 'lg:ml-[150px]'}`}>
        
        <Outlet />  
      </main>
    </div>
  );
};

export default Layout;
