import React, { useState } from 'react';
import {BiJoystickButton} from 'react-icons/bi'

import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className="h-screen bg-black flex">
      <div className="container h-full mx-auto md:w-3/5 w-5/5 overflow-y-auto scrollbar-hide">
        <div className="h-full">
          {/* Test */}
         
          <button
            className="md:hidden fixed top-5 left-5 bg-white rounded-full p-2 z-30"
            onClick={toggleSidebar}
          >
            <BiJoystickButton/>
          </button>
          {sidebarVisible && (
            <div className="fixed top-0 left-0 w-1/3 h-screen bg-neutral-800 z-20">
              <div className='mt-10'>
              <Sidebar/>
              </div>
            </div>
          )}
          <div className="flex-1 col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {/* Contenido principal */}
          </div>
   
          {/* Test */}
          <div className='fixed md:block hidden top-0 md:left-0 left-10 w-1/5 h-screen'>
          <Sidebar />
          </div>
          <div 
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800              
          ">
            {children}
          </div>
          <div className='fixed md:block hidden top-0 right-0 w-1/5  h-screen'>
          <FollowBar />
          </div>
        </div>
     </div>
    </div>
  )
}

export default Layout;
