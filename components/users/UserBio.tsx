import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";
import Link from "next/link";
import Following from "@/pages/following";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    let fecha = format(new Date(fetchedUser.createdAt), "MMMM 'del' yyyy");
    fecha = fecha.replace(fecha.charAt(0), fecha.charAt(0).toUpperCase());
    fecha = fecha.replace('January','Enero')
    fecha = fecha.replace('February','Febrero')
    fecha = fecha.replace('March','Marzo')
    fecha = fecha.replace('April','Abril')
    fecha = fecha.replace('May','Mayo')
    fecha = fecha.replace('June','Junio')
    fecha = fecha.replace('July','Julio')
    fecha = fecha.replace('August','Agosto')
    fecha = fecha.replace('September','Septiembre')
    fecha = fecha.replace('October','Octubre')
    fecha = fecha.replace('November','Noviembre')
    fecha = fecha.replace('December','Diciembre')

    return fecha;
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Editar" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Dejar de Seguir" : "Seguir"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Usuario desde {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            {currentUser?.id === fetchedUser.id ? (
              <Link href={"/following"}>
                <p className="text-neutral-500">Siguiendo</p>
              </Link>
            ) : (
              <p className="text-neutral-500">Siguiendo</p>
            )}
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            {currentUser?.id === fetchedUser.id ? (
              <Link href={"/followers"}>
                <p className="text-neutral-500">Seguidores</p>
              </Link>
            ) : (
              <p className="text-neutral-500">Seguidores</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
