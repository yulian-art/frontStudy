import { Routes, Route, NavLink } from 'react-router'
import CoursesPage from './pages/CoursesPage'
import JobsPage from './pages/JobsPage'
import './App.css'

export default function App() {
  return (
    <>
      <nav className="app-nav">
        <NavLink to="/" end>
          课程学习
        </NavLink>
        <NavLink to="/jobs">求职记录</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </>
  )
}