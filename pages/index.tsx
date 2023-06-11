import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"
import Search from "./search"

export default function Home() {
  return (
    <>
      <Header label="Inicio" />
      <Form placeholder="Descripción" />
      <PostFeed />
    </>
  )
}
