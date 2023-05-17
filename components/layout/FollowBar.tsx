import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">A quién seguir</h2>
        <div className="flex flex-col gap-6 mt-4">
       
          {/* {users.map((user: Record<string, any>) => (           
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))} */}
          {users.map((user: Record<string, any>) => {
            let count = 0;
            if (!currentUser) {
              return (
                <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
              )
            }else{
              if (user.id !== currentUser.id && !currentUser.followingIds.includes(user.id) && count<5) {
                count++;
                return (
                  <div key={user.id} className="flex flex-row gap-4">
                    <Avatar userId={user.id} />
                    <div className="flex flex-col">
                      <p className="text-white font-semibold text-sm">
                        {user.name}
                      </p>
                      <p className="text-neutral-400 text-sm">@{user.username}</p>
                    </div>
                  </div>
                );
              } else {
                return null; // Omitir el usuario actual si su ID coincide
              }
            }
            
          })}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
