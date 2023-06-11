import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import {AiOutlineDelete} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {AiOutlineCopy} from 'react-icons/ai'


import useLoginModal from '@/hooks/useLoginModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';
import Link from 'next/link';
import { BsFillBookmarkFill,BsBookmark } from 'react-icons/bs';
import useAddList from '@/hooks/useAddList';
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked,isLoading,toggleLike } = useLike({ postId: data.id, userId});
  const { isListed,isLoadingSave,toggleAddList } = useAddList({ postId: data.id,userId});
  const [abierto, setAbierto] = useState(false);

 

  
  

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    if(!isLoading){
      toggleLike();
    }

    
  }, [loginModal, currentUser, toggleLike]);

  const onAddList = useCallback(async (ev: any) => {
    ev.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
      
    }
    if(!isLoadingSave){
      toggleAddList();
    }
  },[loginModal,currentUser,toggleAddList])
  
  const handleModal = (ev:any) =>{
    ev.stopPropagation();
    if(abierto){
      setAbierto(false)
    }else{
      setAbierto(true)
    }    
  }

  let locationLink = 'https://www.google.com/maps?q=' + data.location;

  const cadena = data.ingredients;

  
  let cadenaConSaltosDeLinea: JSX.Element[] | React.ReactNode;

if (cadena) {
  cadenaConSaltosDeLinea = cadena
    .trim()
    .split('-')
    .filter((item: string) => item !== '')
    .map((item: string, index: number) => (
      <li key={index}>
        {item.replace(/(?:^|\s)\S/g, (char: string) => char.toUpperCase())}
      </li>
    ));
} else {
  cadenaConSaltosDeLinea = <li>Cadena vacía</li>;
}

  

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
  const ListedIcon = isListed ? BsFillBookmarkFill : BsBookmark;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
    
  }, [data.createdAt])
  
  
  return (
    <>
    {abierto && (<ConfirmationModal postId={data.id} userId={userId} handleModal={handleModal} />)}
    <div 
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">        
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt?.replace('seconds','segundos').replace('minute','minuto').replace('hour','hora')}
            </span>
          </div>
          <div className='text-white mt-1 text-[25px]'>
          {data.title}
          </div>
          <div className='text-neutral-300 mt-1 text-[20px] flex gap-2'>   
          {data.location && (
            <Link href={locationLink} target='_blank'>{data.location}</Link>
          )}                  
          {data.location && (<TiLocation className='text-red-500 w-6 h-6'/>)}          
          </div>
          <div className='my-5 grid place-items-center'>
            {data?.image && (
            <Image src={data.image} width={300} height={300} alt="Cover Image" style={{ objectFit: 'cover' }}/>
            )} 
          </div>
          <div className="text-white mt-1">
            {data.body}                 
          </div>  
          <div className="text-white mt-1">
            Ingredientes: 
            {cadenaConSaltosDeLinea}                 
          </div>         
          <div className="flex flex-row items-center mt-3 gap-10">
            <div 
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}                                                   
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>
                {data.likedIds.length}
              </p>              
            </div>
            <div
              onClick={onAddList}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              <ListedIcon color={isListed ? 'red' : ''} size={18}/>                                        
            </div>
            
            <div 
            onClick={handleModal}
            className='
            flex 
            flex-row 
            items-center 
            text-neutral-500 
            gap-2 
            cursor-pointer 
            transition 
            hover:text-red-500
            '>
              {currentUser?.id == data.user.id && (<AiOutlineDelete size={20}></AiOutlineDelete>)}            
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PostItem;