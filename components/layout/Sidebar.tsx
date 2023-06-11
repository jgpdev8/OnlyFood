import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import {BsFillBookmarkFill} from 'react-icons/bs'

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'Inicio',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notificaciones',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Perfil',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
    {
      icon:BsFillBookmarkFill,
      label:'Lista',
      href:'/listed',
      auth: true,
    }
  ]

  return (
    <div className="col-span-1 h-full">
        <div className="flex flex-col items-center">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                alert={item.alert}
                auth={item.auth}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
              />
            ))}
            {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Desconectar" />}
            <SidebarTweetButton/>
          </div>
        </div>
      </div>
  )
};

export default Sidebar;
