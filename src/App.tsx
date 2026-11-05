import { useState } from 'react'
import './App.css'
import CourseCard from './components/CourseCard'
import type { Course } from './types/course'

const initialCourses: Course[] = [
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
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  function handleCompleteLesson(CourseID : string) {
    setCourses((prevCourses) => 
    prevCourses.map((course)=>{
      if (course.id !== CourseID) return course

      if (course.completedLessons >= course.totalLessons) return course

      return { ...course, completedLessons: course.completedLessons + 1}
    }),
  )
  }

  return (
    <main className="app">
      <h1 className="app__title">学习记录</h1>
      <section className="course-list">
        {courses.map((course)=>(
          <CourseCard key={course.id} course={course} onCompleteLesson={handleCompleteLesson}/>
        ))}
      </section>
    </main>
  )
}

