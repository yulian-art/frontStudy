import { useState } from "react"

type CourseFormProps = {
    onAddCourse: (title: string, totalLessons: number) => void
}

export default function CourseForm({ onAddCourse }: CourseFormProps) {
    const [title, setTitle] = useState('')
    const [totalLessonsInput, setTotalLessonsInput] = useState('')
    const [error, setError] = useState('')

    return (
        <form className="course-form"
        noValidate
        onSubmit={(event) => {
            event.preventDefault()

            const trimmedTitle = title.trim()
            const lessons = Number(totalLessonsInput)

            if(!trimmedTitle) {
                setError('课程名称不为空')
                return
            }
            if (!Number.isInteger(lessons) || lessons <= 0) {
                setError('总章节数必须是大于0的整数')
                return
            }

            onAddCourse(trimmedTitle, lessons)
            setTitle('')
            setTotalLessonsInput('')
            setError('')
        }}

        >
            <label className="course-form__field_number">
                总章节数
                <input
                    title="1"
                    type="number"
                    min="1"
                    step="1"
                    value={totalLessonsInput}
                    onChange={(event) => setTotalLessonsInput(event.currentTarget.value)}
                    />
            </label>
            <label className="course-form__course_name">
                课程名称 
                <input 
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    />
                 
            </label>

            <button type="submit" className="course-form__submit">
                添加课程
            </button>

            {error && <p className="course-form__error">{error}</p>}
        </form>

        
    )
}