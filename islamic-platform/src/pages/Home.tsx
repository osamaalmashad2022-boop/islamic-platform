import { Link } from 'react-router-dom'
import { allCourses } from '../data/courses'
import { TeamSection } from '../components/TeamSection'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__pattern" aria-hidden />
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__brand-en" lang="en" dir="ltr" style={{ fontFamily: 'var(--font-display)' }}>
              WaSSel
            </span>
            <span className="hero__title-ar">تعلّم تفاعلي وإبداعي</span>
          </h1>
          <p className="hero__lead">
            تعلّم تفاعلي بثلاث مراحل: اختبار قبلي، دروس معززة بصور، ثم اختبار بعدي لقياس التقدم.
          </p>
          <div className="hero__actions">
            <a href="#courses" className="btn btn--primary hero__cta">
              استكشف الكورسات
            </a>
            <a href="#team" className="btn hero__cta hero__cta--secondary">
              فريق العمل
            </a>
          </div>
        </div>
      </section>

      <TeamSection />

      <section id="courses" className="courses-section" aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="courses-section__title">
          اختر المرحلة
        </h2>
        <p className="courses-section__subtitle">
          كل مسار يبدأ باختبار قبلي، ثم دروس تفاعلية، ثم اختبار بعدي لمراجعة ما تعلمته.
        </p>
        <div className="course-cards">
          {allCourses.map((c) => (
            <article key={c.id} className="course-card">
              <div className="course-card__inner">
                <span
                  className={`course-card__badge course-card__badge--${c.badge === 'ابتدائي' ? 'prim' : c.badge === 'إعدادي' ? 'prep' : 'sec'}`}
                >
                  {c.badge}
                </span>
                <h3 className="course-card__title">{c.shortTitle}</h3>
                <p className="course-card__desc">{c.description}</p>
                <Link to={`/course/${c.id}`} className="course-card__link">
                  دخول الكورس
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
