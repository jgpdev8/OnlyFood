import React from 'react';

import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen bg-black flex">
      <div className="container h-full mx-auto w-3/5 overflow-y-auto scrollbar-hide">
        <div className="h-full">
          <div className='fixed top-0 left-0 w-1/5 h-screen'>
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
          <div className='fixed top-0 right-0 w-1/5 h-screen'>
          <FollowBar />
          </div>
        </div>
     </div>
    </div>
  )
}

export default Layout;
