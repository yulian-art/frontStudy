import { useEffect, useState } from 'react'
import './App.css'
import CourseCard from './components/CourseCard'
import type { Course } from './types/course'
import CourseForm from './components/CourseForm'

type CourseFilter = 'all' | 'not-started' | 'learning' | 'completed'

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
  const COURSES_STORGAGE_KEY = 'frontstudy:courses:v1'
  function isCourse(value:unknown):value is Course {
    if(typeof value !== 'object' || value === null) return false

    const course = value as Record<string, unknown>

    return (
    typeof course.id === 'string' &&
    course.id.length > 0 &&
    typeof course.title === 'string' &&
    course.title.length > 0 &&
    typeof course.totalLessons === 'number' &&
    Number.isInteger(course.totalLessons) &&
    course.totalLessons > 0 &&
    typeof course.completedLessons === 'number' &&
    Number.isInteger(course.completedLessons) &&
    course.completedLessons >= 0 &&
    course.completedLessons <= course.totalLessons
  )
  }
  function loadCourses(): Course[] {
    try {
      const raw = localStorage.getItem(COURSES_STORGAGE_KEY)

      if (raw === null) return initialCourses

      const parsed: unknown = JSON.parse(raw)

      if(Array.isArray(parsed) && parsed.every(isCourse)) {
        return parsed as Course[]
      }
    } catch (error) {
      console.warn('读取课程失败', error)
    }

    return initialCourses
  }

export default function App(){
  const [filter, setFilter] = useState<CourseFilter>('all')
  const [courses, setCourses] = useState<Course[]>(loadCourses)

  useEffect(() => {
    try {
      localStorage.setItem(COURSES_STORGAGE_KEY, JSON.stringify(courses))
    } catch (error) {
      console.warn('保存课程失败', error)
    }
  }, [courses])



  function handleCompleteLesson(CourseID : string) {
    setCourses((prevCourses) => 
    prevCourses.map((course)=>{
      if (course.id !== CourseID) return course

      if (course.completedLessons >= course.totalLessons) return course

      return { ...course, completedLessons: course.completedLessons + 1}
    }),
  )
  
  }
  function handleAddCourse(title: string,totalLessons:number) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      title,
      totalLessons,
      completedLessons:0,
    }
    setCourses((prevCoures) => [...prevCoures, newCourse])
  }
  const visibleCourses = courses.filter(course => {
    const { completedLessons, totalLessons } = course

    switch (filter) {
      case 'all':
        return true
      case 'not-started':
      return completedLessons === 0
    case 'learning':
      return completedLessons > 0 && completedLessons < totalLessons
    case 'completed':
      return totalLessons > 0 && completedLessons >= totalLessons
    }
  })
  



  return (
    <main className="app">
      <h1 className="app__title">学习记录</h1>
      <CourseForm onAddCourse={handleAddCourse} />
      <div className="course-filter" role="group" aria-label="按学习状态筛选">
  <button
    type="button"
    aria-pressed={filter === 'all'}
    onClick={() => setFilter('all')}
  >
    全部
  </button>
  <button
    type="button"
    aria-pressed={filter === 'not-started'}
    onClick={() => setFilter('not-started')}
  >
    未开始
  </button>
  <button
    type="button"
    aria-pressed={filter === 'learning'}
    onClick={() => setFilter('learning')}
  >
    学习中
  </button>
  <button
    type="button"
    aria-pressed={filter === 'completed'}
    onClick={() => setFilter('completed')}
  >
    已完成
  </button>
</div>
<p className='course-summary'>
  共 {courses.length} 门， 当前展示 {visibleCourses.length} 门
</p>
{visibleCourses.length === 0 ? (
  <p className='course-empty'>暂无符合条件的课程</p>
):(
  <section className='course-list'>
    {visibleCourses.map((course) => (
      <CourseCard
        key={course.id}
        course={course}
        onCompleteLesson={handleCompleteLesson}
      />
    ))}
  </section>
)}
    </main>
  )
}

