import axios from "axios";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useAddList = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const [isLoadingSave,setIsLoadingSave] = useState(false);

  const loginModal = useLoginModal();

  


  const isListed = useMemo(() => {
    const list = currentUser?.listIds || [];

    return list.includes(postId);
  }, [fetchedPost, currentUser]);
  const isListedRef = useRef<boolean>(isListed);

  const toggleAddList = useCallback(async () => {

     
    
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      setIsLoadingSave(true);
      if (isListed) {
        request = () => axios.delete('/api/addList', { data: { postId } });
      } else {
        request = () => axios.post('/api/addList', { postId });
      }

      await request();  
      isListedRef.current = !isListedRef.current;    
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Correcto');
    } catch (error) {
      toast.error('Algo fue mal');
    }
    finally{
      setIsLoadingSave(false);
    }
  }, [currentUser, isListed, postId, mutateFetchedPosts, mutateFetchedPost, loginModal,isLoadingSave]);

  return {
    isListed: isListedRef.current,
    toggleAddList,
    isLoadingSave
  }
}

export default useAddList;
