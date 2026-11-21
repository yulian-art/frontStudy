import { useState } from "react";
import { Card, Select, Input} from "antd";
import { Link } from "react-router";
import { posts, type Post } from "../data/posts";
import PostCard from "../components/PostCard";

type CategoryFliter = 'all' | Post['category']
export default function HomePage(){
    const [categoryFilter, setCategoryFilter] = useState<CategoryFliter>('all')
    const [keyword, setKeyword] = useState('')
    const query = keyword.trim().toLowerCase()
    const visiblePosts = posts.filter((post) =>{
        const matchesCategory =
         categoryFilter === 'all' || post.category === categoryFilter
        

        const matchesKeyword = 
        post.title.toLowerCase().includes(query) || post.summary.toLowerCase().includes(query)

        return matchesCategory && matchesKeyword
    })
    return (
        <main className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
            <section className="mt-10" aria-labelledby="latest-posts">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 id="latest-posts" className="m-0 text-2xl font-bold">
                        最新文章
                    </h2>
                    <div className="">
                        <Input
                        aria-label="搜索文章"
                        placeholder="搜索文章标题或摘要"
                        allowClear
                        className="w-48 max-w-full"
                        value={keyword}
                        onChange={(event)=> setKeyword(event.currentTarget.value)}
                        
                        
                        />
                    
                    <Select<CategoryFliter>
                        aria-label="按文章分类筛选"
                        className="w-34"
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        options={[
                            { value: 'all', label: '全部分类' },
      { value: 'React', label: 'React' },
      { value: 'TS', label: 'TypeScript' },
      { value: '学习记录', label: '学习记录' },
                        ]}
                        />
                        </div>
                </div>

                {visiblePosts.length === 0 && (
                    <p className="rounded-xl bg-white p-6 text-center text-slate-500">
                        没有符合条件的文章
                    </p>
                )}
                            <section className="rounded-3xl bg-indigo-950 px-6 py-12 text-white sm:px-12">
                <h1 className="m-0 text-4xl font-bold tracking-tight sm:text-5xl">
                    笔记
                </h1>
                <p className="mt-4 mb-0 max-w-xl text-base leading-7 text-indigo-100">
                    记录
                </p>
            </section>

                <div className="grid gap-4">
                    {visiblePosts.map((post) => (
                        <PostCard key={post.slug} post={post}/>
                    ))}
                </div>
            </section>
            
            


            <section aria-label="博客" className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link to="/courses" className="block no-underline">
                    <Card title="课程学习" hoverable className="h-full">
                        查看课程和学习进度
                    </Card>
                </Link>

                <Link to="/jobs" className="block no-underline">
                    <Card title="求职记录" hoverable className="h-full">
                        111
                    </Card>
                </Link>
            </section>
        </main>
    )
}