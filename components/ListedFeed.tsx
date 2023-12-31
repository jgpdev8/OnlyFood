
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import ListPostItem from "./posts/ListPostItem";
import Header from "./Header";


const ListedFeed = () => {
  const { data: posts = []} = usePosts();
  const { data: currentUser } = useCurrentUser();

  if (currentUser.listIds.length == 0) {
    return (
      <div>
        <Header label="No hay publicaciones en tu lista"/>
      </div>
    );
  }

  return (
    <div className="flex flex-col  ">
      {posts.map((post: Record<string, any>) => {
        if (currentUser?.listIds.includes(post.id)) {
          return <ListPostItem data={post} key={post.id} userId={currentUser?.id} />;
        }
      })}
    </div>
  );
};

 
export default ListedFeed;