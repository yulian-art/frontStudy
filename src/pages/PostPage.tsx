import { Link, useParams } from "react-router";
import { posts } from "../data/posts";

export default function PostPage(){
    const {slug} = useParams()
    const post = posts.find((item) => item.slug ===slug)


    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <Link to="/" className="text-sm text-indigo-700">返回首页</Link>

            {post ? (
                <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
                    <h1 className="m-0 text-3xl font-bold">{post.title}</h1>
                    <p className="mt-6 mb-0 leading-8 text-slate-700">
                        {post.content}
                    </p>
                </article>
            ) : (
                <h1 className="mt-6 text-2xl font-bold">找不到这篇文章</h1>
            )}
        </main>
    )
}