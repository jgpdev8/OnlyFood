import { useRouter } from "next/router";
import OnlyFoodLogo from '../../src/images/OnlyFoodLogo.svg';

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
        hover:bg-red-500 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <img src="https://imageshack.com/i/poHs1LAIp"  height={200} width={200} alt='Logo' />
    </div>
  );
};

export default SidebarLogo;
