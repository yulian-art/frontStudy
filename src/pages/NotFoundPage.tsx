import { Result } from "antd";
import { Link } from "react-router";
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFoundPage(){
    usePageTitle('页面不存在')
    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <Result
            status="404"
            title="页面不存在"
            subTitle="检查网站"
            extra={
                <Link
                to="/"
                className="">
                    返回首页
                </Link>
            }
            />
        </main>
    )
}