import { useCallback, useEffect, useState } from "react";
import {IoFastFood} from "react-icons/io5"
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";


const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    
  
    router.push('/');      
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick}>
      <div className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-red-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      ">
        <IoFastFood size={28} color="black" />
      </div>
      <div className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-red-500
        hover:bg-opacity-90 
        cursor-pointer
      ">
        <p 
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-black 
            text-[20px]
        ">
          Food It!!
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
