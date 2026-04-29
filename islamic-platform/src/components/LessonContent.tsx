import { useMemo, useState } from 'react'
import type { Unit } from '../types/course'
import './LessonContent.css'

type Props = {
  units: Unit[]
  onComplete: () => void
}

type SlideItem =
  | { type: 'goals'; unitTitle: string; unitId: string; content: string[]; title: string }
  | { type: 'lesson'; unitTitle: string; unitId: string; lesson: import('../types/course').LessonSlide }
  | { type: 'activities'; unitTitle: string; unitId: string; content: string[]; title: string }

export function LessonContent({ units, onComplete }: Props) {
  const flat = useMemo(() => {
    return units.flatMap((u) => {
      const items: SlideItem[] = []
      if (u.goals && u.goals.length > 0) {
        items.push({
          type: 'goals',
          unitTitle: u.title,
          unitId: u.id,
          content: u.goals,
          title: 'أهداف الوحدة',
        })
      }
      u.lessons.forEach((lesson) => {
        items.push({
          type: 'lesson',
          unitTitle: u.title,
          unitId: u.id,
          lesson,
        })
      })
      if (u.activities && u.activities.length > 0) {
        items.push({
          type: 'activities',
          unitTitle: u.title,
          unitId: u.id,
          content: u.activities,
          title: 'أنشطة الوحدة',
        })
      }
      return items
    })
  }, [units])

  const [index, setIndex] = useState(0)
  const current = flat[index]
  const progress = flat.length ? ((index + 1) / flat.length) * 100 : 0

  if (!current) {
    return (
      <div className="lesson-empty">
        <p>لا توجد دروس مضافة بعد.</p>
        <button type="button" className="btn btn--primary" onClick={onComplete}>
          المتابعة إلى الاختبار البعدي
        </button>
      </div>
    )
  }

  const { unitTitle } = current

  return (
    <section className="lessons" aria-labelledby="lesson-title">
      <div className="lessons__progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <div className="lessons__progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="lessons__meta">
        القسم {index + 1} من {flat.length} — {unitTitle}
      </p>

      <div key={`${current.unitId}-${index}`} className="lesson-card-wrap">
        <article className="lesson-card">
          {current.type === 'goals' && (
            <>
              <h2 className="lesson-card__title">{current.title}</h2>
              <div className="lesson-card__body">
                <ul className="lesson-card__list">
                  {current.content.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {current.type === 'lesson' && (
            <>
              <h2 id="lesson-title" className="lesson-card__title">
                {current.lesson.title}
              </h2>
              <div className="lesson-card__goal">
                <span className="lesson-card__goal-label">تذكير</span>
                اقرأ بتمعن، ثم انتقل للدرس التالي عند استيعاب الفكرة الرئيسية.
              </div>
              <div className="lesson-card__body">
                <p>{current.lesson.body}</p>
              </div>
              {current.lesson.imageSrc && (
                <figure className="lesson-card__figure">
                  <img
                    src={current.lesson.imageSrc}
                    alt={current.lesson.imageCaption ?? 'توضيح بصري للدرس'}
                    className="lesson-card__img"
                    loading="lazy"
                  />
                  {current.lesson.imageCaption && <figcaption>{current.lesson.imageCaption}</figcaption>}
                </figure>
              )}
            </>
          )}

          {current.type === 'activities' && (
            <>
              <h2 className="lesson-card__title">{current.title}</h2>
              <div className="lesson-card__body">
                <ul className="lesson-card__list">
                  {current.content.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </article>
      </div>

      <div className="lessons__nav">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          السابق
        </button>
        {index < flat.length - 1 ? (
          <button type="button" className="btn btn--primary" onClick={() => setIndex((i) => i + 1)}>
            التالي
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={onComplete}>
            إنهاء الدروس والانتقال للاختبار البعدي
          </button>
        )}
      </div>
    </section>
  )
}
