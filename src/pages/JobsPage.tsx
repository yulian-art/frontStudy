import type { Job } from '../types/jobs'
import '../App.css'
import { useState, useEffect } from 'react'
import JobForm from '../components/JobForm'
import { Select } from 'antd'
import { usePageTitle } from '../hooks/usePageTitle'
const initialJobs: Job[] = [
  {
    id: 'j-001',
    company: 'test',
    position: '前端开发实习生',
    status: 'applied',
  },
  {
    id: 'j-002',
    company: 'test',
    position: '前端开发实习生',
    status: 'applied',
  },
  {
    id: 'j-003',
    company: 'test',
    position: '前端开发实习生',
    status: 'applied',
  },
]

const statusLabels = {
  applied: '已投递',
  interviewing: '面试中',
  offer: '已录用',
  rejected: '未通过',
}

const JOBS_STORAGE_KEY = 'frontstudy:jobs:v1'
function isJob(value: unknown): value is Job {
  if (typeof value !== 'object' || value === null) return false

  const job = value as Record<string, unknown>
  return (
    typeof job.id === 'string' &&
    typeof job.company === 'string' &&
    typeof job.position === 'string' &&
    typeof job.status === 'string' &&
    Object.hasOwn(statusLabels, job.status)
  )
}

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY)
    if (raw === null) return initialJobs

    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.every(isJob)) return parsed
  } catch (error) {
    console.warn('读取求职记录失败', error)
  }

  return initialJobs
}

export default function JobsPage() {
  // Dispatch<SetStateAction<Job[]>>
  const [jobs, setJobs] = useState<Job[]>(loadJobs)

  useEffect(() => {
    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs))
    } catch (error) {
      console.warn('读取求职记录失败', error)
    }
  }, [jobs])

  function handleAddJob(company: string, position: string) {
    const newJob: Job = {
      id: crypto.randomUUID(),
      company,
      position,
      status: 'applied',
    }
    setJobs((prevJobs) => [...prevJobs, newJob])
  }

  function handleChangeStatus(id: string, status: Job['status']) {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, status } : job)),
    )
  }
  usePageTitle('求职记录')
  return (
    <main className="app">
      <h1 className="app__title">求职记录</h1>

      <JobForm onAddJob={handleAddJob} />

      <p>共{jobs.length}条投递记录</p>

      <section className="course-list">
        {jobs.map((job) => (
          <article className="course-card" key={job.id}>
            <h2>{job.company}</h2>
            <p>岗位：{job.position}</p>
            <label>
              投递状态
              <Select<Job['status']>
                value={job.status}
                style={{ width: 120 }}
                onChange={(status) => handleChangeStatus(job.id, status)}
                options={[
                  { value: 'applied', label: statusLabels.applied },
                  { value: 'interviewing', label: statusLabels.interviewing },
                  { value: 'offer', label: statusLabels.offer },
                  { value: 'rejected', label: statusLabels.rejected },
                ]}
              />
            </label>
          </article>
        ))}
      </section>
    </main>
  )
}
