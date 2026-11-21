import { Link, useParams } from 'react-router'
import { posts } from '../data/posts'
import { Tag } from 'antd'
import CodeBlock from '../components/CodeBlock'
import PostCard from '../components/PostCard'
import { usePageTitle } from '../hooks/usePageTitle'

export default function PostPage() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)
  const otherPosts = posts.filter((item) => item.slug !== slug).slice(0, 2)
  usePageTitle(post?.title ?? '找不到')
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/" className="text-sm text-indigo-700">
        返回首页
      </Link>

      {post ? (
        <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <div className="">
            <Tag color="blue">
              {post.category === 'TS' ? 'typescript' : post.category}
            </Tag>
            <time dateTime={post.date} className="text-sm text-slate-500">
              {post.date}
            </time>
          </div>
          <h1 className="m-0 text-3xl font-bold">{post.title}</h1>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-700">
            {post.content.map((block, index) => {
              if (block.type === 'code') {
                return (
                  <CodeBlock key={`${post.slug}-${index}`} code={block.code} />
                )
              }
              return (
                <p key={index} className="m-0">
                  {block.text}
                </p>
              )
            })}
          </div>
        </article>
      ) : (
        <h1 className="mt-6 text-2xl font-bold">找不到这篇文章</h1>
      )}
      {post && otherPosts.length > 0 && (
        <section className="mt-8" aria-labelledby="more-posts">
          <h2 id="more-posts" className="mb-4 text-xl font-semibold">
            继续阅读
          </h2>
          <div className="grid gap-4">
            {otherPosts.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
