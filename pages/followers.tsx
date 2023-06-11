import FollowersFeed from "@/components/FollowersFeed";
import Header from "@/components/Header";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Followers = () => {
  return ( 
    <>
      <Header showBackArrow label="Seguidores" />
      <FollowersFeed/>
    </>
   );
}
 
export default Followers;