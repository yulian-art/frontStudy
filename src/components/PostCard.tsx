import { Card, Tag } from "antd"
import { Link } from "react-router"
import type { Post } from "../data/posts"
type PostCardProps = {
    post: Post
}


export default function PostCard({post}: PostCardProps) {
    return (
        <Link to={`/posts/${post.slug}`} className="block no-underline">
            <Card title={post.title} hoverable>
                <div className="mb-2 flex flex-wrap item-center gap-2">
                    <Tag color="blue">
                        {post.category === 'TS' ? 'TypeScript' : post.category}
                    </Tag>
                    <time dateTime={post.date} className="text-sm text-slate-500">
                        {post.date}
                    </time>
                </div>

                 <p className="m-0 leading-6 text-slate-700">{post.summary}</p>
            </Card>
        </Link>
    )
}