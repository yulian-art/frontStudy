import type { Course } from "../types/course"

type CourseCardProps = {
    course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
    const percent = course.totalLessons === 0 ? 0 : Math.round((course.completedLessons / course.totalLessons) * 100)

    return (
        <article className="course-card">
            <h2>{course.title}</h2>
            <p className="course-card__lessons">
                已学 {course.completedLessons} / {course.totalLessons} 章节
            </p>
            <p className="course-card__percent">进度：{percent}%</p>
            <progress value={percent} max={100} />
        </article>
    )
}