import { useEffect } from "react";

export function usePageTitle(title: string) {
    useEffect(()=>{
        document.title = `${title} | 我的前端笔记`
    }, [title])
}