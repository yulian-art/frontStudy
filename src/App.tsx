import './App.css'
import CourseCard from './components/CourseCard'
import type { Course } from './types/course'

const courses: Course[] = [
  {
    id: 'c-001',
    title: 'React 基础',
    totalLessons: 12,
    completedLessons: 0,
  },
  {
    id: 'c-002',
    title: 'TypeScript 进阶',
    totalLessons: 12,
    completedLessons: 3,
  },
  {
    id: 'c-003',
    title: '算法与数据结构',
    totalLessons: 12,
    completedLessons: 12,
  },
]

export default function App(){
  return (
    <main className="app">
      <h1 className="app__title">学习与求职记录</h1>
      <section className="course-list">
        {courses.map((course)=>(
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </main>
  )
}