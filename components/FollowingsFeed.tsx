import useUsers from "@/hooks/useUsers";

import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "./Avatar";


const FollowingFeed = () => {
  
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  if (users.length === 0) {
    return null;
  }
  
  return ( 
    <div className="flex flex-col gap-6 mt-4 ml-4">
          {users.map((user: Record<string, any>) => {
            
              if (currentUser?.followingIds.includes(user.id)) {
                
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
              }
            
          })}
        </div>
   );
}
 
export default FollowingFeed;