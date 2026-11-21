import { Link, useParams } from 'react-router'
import { posts } from '../data/posts'
import { Tag } from 'antd'
export default function PostPage() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)

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
                  <pre
                    key={index}
                    className="m-0 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-slate-100"
                  >
                    <code>{block.code}</code>
                  </pre>
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
    </main>
  )
}
