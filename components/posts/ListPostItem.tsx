import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import {TiLocation} from 'react-icons/ti'

import Avatar from '../Avatar';
import Link from 'next/link';
interface ListPostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const ListPostItem: React.FC<ListPostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();

 

  
  

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);


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

  


  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
    
  }, [data.createdAt])

  return (
    <>
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
          <div className='flex flex-row gap-5 mt-10'>
            <div className='text-white  text-[25px]'>
            {data.title}
            </div>
            <div className='text-neutral-300  text-[25px] flex gap-2'>   
            {data.location && (
              <Link href={locationLink} target='_blank'>{data.location}</Link>
            )}                  
            {data.location && (<TiLocation className='text-red-500 w-6 h-6'/>)}          
            </div>
            <div className=''>
            {data?.image && (
            <Image src={data.image} width={50} height={50} alt="Cover Image" style={{ objectFit: 'cover' }}/>
            )} 
            </div>
              
            
          </div>
          <div className="text-white mt-1 mx-2">
            Ingredientes: 
            {cadenaConSaltosDeLinea}                 
          </div>  
          
          </div>
        </div>
      </div>
    
    </>
  )
}

export default ListPostItem;