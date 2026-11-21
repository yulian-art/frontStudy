import { Routes, Route, NavLink } from 'react-router'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import JobsPage from './pages/JobsPage'
import './App.css'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import NotFoundPage from './pages/NotFoundPage'

const navClass =
  'rounded-lg px-3 py-2 text-sm font-medium text-slate-600 no-underline' +
  'hover:bg-slate-100 aria-[current=page]:bg-indigo-700'

export default function App() {
  return (
    <>
      <nav
        aria-label="主导航"
        className="mx-auto flex max-w-5xl flex-wrap gap-2 px-6 py-3"
      >
        <NavLink to="/" end className={navClass}>
          首页
        </NavLink>
        <NavLink to="/jobs" className={navClass}>
          求职记录
        </NavLink>
        <NavLink to="/courses" className={navClass}>
          课程学习
        </NavLink>
      </nav>
      <ScrollToTop />
      <header className="bg-white shadow-sm">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </header>
    </>
  )
}
