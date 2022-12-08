import Head from "next/head"
import { getPostBySlug, getAllPosts } from "../../libs/blog"
import markdownToHtml from "../../libs/markdownToHtml"

export default function Post({ post }) {
  return (
    <>
      <article>
        <Head>
          <title>{post.title}</title>
        </Head>
        <h1 className="text-3xl">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const content = await markdownToHtml(post.content || "")

  post.date = new Date(post.date).toISOString()

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}
