import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const logos = [
  { src: '/logos/logo-damietta.jpg', alt: 'شعار جامعة دمياط' },
  { src: '/logos/logo-education.jpg', alt: 'شعار كلية التربية – جامعة دمياط' },
  { src: '/logos/logo-techno.jpg', alt: 'شعار قسم تكنولوجيا التعليم' },
] as const

export function Navbar() {
  return (
    <header className="navbar glass-panel" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
      <div className="navbar__inner">
        <div className="navbar__brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/">
            <img src="/images/logo.png" alt="شعار المنصة" style={{ height: '60px', borderRadius: '50%', boxShadow: 'var(--shadow-soft)' }} />
          </Link>
          <div>
            <Link to="/" className="navbar__title" lang="en" dir="ltr">
              WaSSel
            </Link>
            <p className="navbar__subtitle">تعلّم تفاعلي إبداعي</p>
          </div>
        </div>

        <nav className="navbar__links" aria-label="روابط رئيسية">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')} end>
            الرئيسية
          </NavLink>
          <NavLink to="/course/prim1-t2" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
            الابتدائي
          </NavLink>
          <NavLink to="/course/prep1-t2" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
            الإعدادي
          </NavLink>
          <NavLink to="/course/sec3-t2" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
            الثانوي
          </NavLink>
          <a href="/#team" className="nav-link">
            فريق العمل
          </a>
        </nav>

        <div className="navbar__logos" dir="ltr" aria-label="شعارات الجامعة">
          {logos.map((logo) => (
            <span key={logo.src} className="navbar__logo-frame">
              <img src={logo.src} alt={logo.alt} className="navbar__logo-img" width={54} height={54} loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
