import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import './Layout.css'

export function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <p className="layout__footer-text">
          <span dir="ltr" lang="en">
            WaSSel
          </span>
          {' — '}منصة تعليمية — جامعة دمياط، كلية التربية، قسم تكنولوجيا التعليم
        </p>
      </footer>
    </div>
  )
}
