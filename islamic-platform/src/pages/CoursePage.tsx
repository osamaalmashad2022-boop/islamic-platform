import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseById } from '../data/courses'
import { Quiz } from '../components/Quiz'
import { LessonContent } from '../components/LessonContent'
import './CoursePage.css'

type Phase = 'intro' | 'pre' | 'lessons' | 'post' | 'done'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = useMemo(() => (courseId ? getCourseById(courseId) : undefined), [courseId])
  const [phase, setPhase] = useState<Phase>('intro')

  useEffect(() => {
    setPhase('intro')
  }, [courseId])

  if (!course) {
    return (
      <div className="course-page">
        <p>الكورس غير موجود.</p>
        <Link to="/">العودة للرئيسية</Link>
      </div>
    )
  }

  return (
    <div className="course-page">
      <nav className="breadcrumb" aria-label="مسار التنقل">
        <Link to="/">الرئيسية</Link>
        <span aria-hidden> / </span>
        <span>{course.shortTitle}</span>
      </nav>

      {phase === 'intro' && (
        <section className="course-intro">
          <h1 className="course-intro__title">{course.title}</h1>
          <p className="course-intro__desc">{course.description}</p>
          <ol className="course-intro__steps">
            <li>اختبار قبلي قصير</li>
            <li>دروس تفاعلية مع صور توضيحية</li>
            <li>اختبار بعدي لمراجعة التعلّم</li>
          </ol>
          <button type="button" className="btn btn--primary" onClick={() => setPhase('pre')}>
            ابدأ الاختبار القبلي
          </button>
        </section>
      )}

      {phase === 'pre' && (
        <>
          <Quiz
            title="الاختبار القبلي"
            questions={course.preQuiz}
            submitLabel="تصحيح وإرسال"
            onFinish={() => setPhase('lessons')}
          />
          <p className="course-page__skip">
            <button type="button" className="link-button" onClick={() => setPhase('lessons')}>
              تخطي الاختبار القبلي والانتقال للدروس
            </button>
          </p>
        </>
      )}

      {phase === 'lessons' && (
        <LessonContent units={course.units} onComplete={() => setPhase('post')} />
      )}

      {phase === 'post' && (
        <Quiz
          title="الاختبار البعدي"
          questions={course.postQuiz}
          submitLabel="تصحيح وإرسال"
          onFinish={() => setPhase('done')}
        />
      )}

      {phase === 'done' && (
        <section className="course-done" aria-labelledby="done-title">
          <h2 id="done-title">أحسنت إتمام المسار</h2>
          <p>يمكنك العودة للرئيسية أو إعادة المراجعة من البداية.</p>
          <div className="course-done__actions">
            <Link to="/" className="btn btn--primary">
              الرئيسية
            </Link>
            <button type="button" className="btn btn--ghost" onClick={() => setPhase('intro')}>
              إعادة من البداية
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
