import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useSavedPosts = (userId?: string) => {
  const url = 'api/savedPosts'
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default useSavedPosts;
