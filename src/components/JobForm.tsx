import { useState } from 'react'

type JobFormProps = {
    onAddJob: (company: string,position:string) => void
}

export default function JobForm({ onAddJob }: JobFormProps){
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [error, setError] = useState('')

    return (
        <form
        className='course-form'
        onSubmit={(event) => {
            event.preventDefault()

            const trimmedCompany = company.trim()
            const trimmedPosstiton = position.trim()

            if (!trimmedCompany || !trimmedPosstiton) {
                setError("请填写公司名称和岗位")
                return
            }

            onAddJob(trimmedCompany, trimmedPosstiton)

            setCompany('')
            setPosition('')
            setError('')
        }}
        >
            <label>
                公司名称
                <input
                value={company}
                onChange={(event) => setCompany(event.currentTarget.value)}
                />
            </label>
            <label>
                应聘岗位
                <input
                value={position}
                onChange={(event) => setPosition(event.currentTarget.value)}
                />
            </label>
            <button type='submit'>添加</button>

            {error && <p role='alert'>{ error }</p>}

        </form>
    )
}