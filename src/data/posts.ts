export type Post = {
    slug:string
    title: string
    summary : string
    content : string
    date : string
    category: 'React' | 'TS' | '学习记录'
}


export const posts: Post[] = [
    {
  slug: 'typescript-union-types',
  title: '我第一次用联合类型',
  summary: '用求职状态理解 TypeScript 里竖线的意思。',
  content: '求职记录只有几个允许的状态。我用竖线把这些值列出来，这样拼错状态时，TypeScript 就会提醒我。',
  date: '2026-11-21',
  category: 'TS',
},
{
  slug: 'react-state-notes',
  title: '用 useState 记录课程进度',
  summary: '记一下我点击「学完一节」后，页面是怎么更新的。',
  content: '点击按钮时，我用 setCourses 更新课程数组。只有 ID 匹配的课程会增加一节进度，React 随后重新渲染列表。',
  date: '2026-11-21',
  category: 'React',
},
]