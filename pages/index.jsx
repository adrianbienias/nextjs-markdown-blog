import Link from "next/link"
import { getAllPosts } from "../libs/blog"

function Post({ post }) {
  const { title, slug } = post

  return (
    <>
      <Link href={"/blog/" + slug}>
        <h1>{title}</h1>
      </Link>
    </>
  )
}

function MorePosts({ posts }) {
  return posts.map((post, index) => <Post key={index} post={post} />)
}

export default function Index({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      {heroPost && <Post post={heroPost} />}
      {morePosts.length > 0 && <MorePosts posts={morePosts} />}
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "slug", "date", "content"])

  allPosts.map((post) => (post.date = new Date(post.date).toISOString()))

  return {
    props: { allPosts },
  }
}
