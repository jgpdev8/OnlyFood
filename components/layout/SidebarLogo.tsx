import { useRouter } from "next/router";
import Image from "next/image";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-28
        w-28
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-orange-500 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <Image src={'/images/Copia_de_OnlyFoodLogo-removebg-preview.png'}  height={200} width={200} alt='Logo' />
    </div>
  );
};

export default SidebarLogo;
