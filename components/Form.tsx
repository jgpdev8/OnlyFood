import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import {AiOutlinePlusCircle} from 'react-icons/ai'

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';
import ImageUpload from "../components/ImageUpload";

import Avatar from './Avatar';
import Button from './Button';
import ImageCloudinaryUpload from './ImageCloudinaryUpload';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [image, setPostImage] = useState('');

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [title,setTitle] = useState('');
  const [locationTmp,setLocationTmp] = useState('');
  const [location,setLocation] = useState('');
  const [ingredients,setIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 
  const [inputValue, setInputValue] = useState('');

  const agregarCadena = () => {
    if (inputValue.trim() !== '') {
      setIngredients(prevText => prevText + '- ' + inputValue + '\n');
      setInputValue('');
    }
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      agregarCadena();
    }
  };
  

  const locationplusCity = () =>{
    setLocation(locationTmp);
  }

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      locationplusCity();
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body,image,title,ingredients,location });

      toast.success('FoodIt Creado');
      setLocationTmp('');
      setLocation('');
      setIngredients('');
      setPostImage('');
      setBody('');
      setTitle('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Algo Fue Mal');
    } finally {
      setIsLoading(false);
    }
  }, [body,title,locationTmp,location,mutatePosts, isComment, postId, mutatePost,setPostImage]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
          <ImageCloudinaryUpload
            value={image}
            onChange={(value)=> setPostImage(value)}
          />
          {/* <ImageUpload value={image} disabled={isLoading} onChange={(image) => setPostImage(image)} label="Sube la imagen de tu comida" />        */}
            <input placeholder="Título" type="text" maxLength={40} 
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            className=' 
                peer
                resize-none 
                mt-3 
                w-1/2
                p-2
                bg-neutral-500
                rounded 
                placeholder:text-white
                ring-0           
                text-[20px]      
                text-white
                mb-2'/>   
              <div className='grid grid-cols-2 mt-3 mb-3 gap-4 content-center m-auto text-center align-content-center align-middle'>
              <input placeholder="Ingredientes" type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className=' 
                peer
                resize-none                             
                bg-neutral-500
                p-2
                rounded 
                placeholder:text-white
                ring-0           
                text-[20px]      
                text-white
                '/>  
                <AiOutlinePlusCircle onClick={agregarCadena} className='text-white w-8 h-8 cursor-pointer'/>
              </div>
              <div className='grid grid-cols-2 mt-3 mb-3 gap-4'>
              <input placeholder="Ubicación" type="text" maxLength={20} 
            onChange={(event) => setLocationTmp(event.target.value)}
            value={locationTmp}
            className=' 
                peer
                resize-none 
                mt-3                 
                bg-neutral-500
                placeholder:text-white
                p-2
                rounded 
                ring-0           
                text-[20px]      
                text-white
                mb-2'/>    
                {locationTmp!="" && (<input placeholder="Ciudad" type="text" maxLength={20} 
            onChange={(event) => setLocation(locationTmp +' '+ event.target.value)}           
            className=' 
                peer
                resize-none 
                mt-3 
                
                bg-neutral-500
                rounded 
                ring-0           
                text-[20px]      
                text-white
                mb-2'/>                          
              )}
                </div>
                              
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}>
            </textarea>

            <textarea
              disabled={isLoading}
              value={ingredients}
              readOnly
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black
                h-48 
                disabled
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder="Ingredientes">
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Food It!" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Bienvendido a OnlyFood</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Conectarse" onClick={loginModal.onOpen} />
            <Button label="Registrarse" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;