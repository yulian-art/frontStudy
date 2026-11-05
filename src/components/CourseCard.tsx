import type { Course } from "../types/course"

type CourseCardProps = {
    course: Course
    onCompleteLesson: (CourseID : string) => void
}

export default function CourseCard({ course, onCompleteLesson }: CourseCardProps) {
    const percent = course.totalLessons === 0 ? 0 : Math.round((course.completedLessons / course.totalLessons) * 100)
    const isFinished = course.completedLessons >= course.totalLessons
    return (
        <article className="course-card">
            <h2>{course.title}</h2>
            <p className="course-card__lessons">
                已学 {course.completedLessons} / {course.totalLessons} 章节
            </p>
            <p className="course-card__percent">进度：{percent}%</p>
            <progress value={percent} max={100} />
            <button
                type="button"
                onClick={() => onCompleteLesson(course.id)}
                disabled={isFinished}>{isFinished ? '已完成' :'学完一节'}</button>
        </article>
    )
}