import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useReport = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const [isLoadingReport,setIsLoadingReport] = useState(false);

  const loginModal = useLoginModal();

  const hasReported = useMemo(() => {
    const list = fetchedPost?.ReportIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleReport = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      setIsLoadingReport(true);
      if (hasReported) {
        request = () => axios.delete('/api/report', { data: { postId } });
      } else {
        request = () => axios.post('/api/report', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Correcto');
    } catch (error) {
      toast.error('Algo fue mal');
    }
    finally{
      setIsLoadingReport(false);
    }
  }, [currentUser, hasReported, postId, mutateFetchedPosts, mutateFetchedPost, loginModal, isLoadingReport]);

  return {
    hasReported,
    toggleReport,
    isLoadingReport
  }
}

export default useReport;
