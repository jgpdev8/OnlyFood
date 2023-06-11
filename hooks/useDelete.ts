import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useDelete = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  
  const toggleDelete = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      request = () => axios.delete('/api/deletePost', { data: { postId } });
      

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Correcto');
    } catch (error) {
      toast.error('Algo fue mal');
    }
  }, [currentUser, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);

  return {
    
    toggleDelete
  }
}

export default useDelete;
