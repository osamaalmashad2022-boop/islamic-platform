import { useMemo, useState } from 'react'
import type { Unit } from '../types/course'
import './LessonContent.css'

type Props = {
  units: Unit[]
  onComplete: () => void
}

export function LessonContent({ units, onComplete }: Props) {
  const flat = useMemo(
    () =>
      units.flatMap((u) =>
        u.lessons.map((lesson) => ({
          unitTitle: u.title,
          unitId: u.id,
          lesson,
        })),
      ),
    [units],
  )

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

  const { lesson, unitTitle } = current

  return (
    <section className="lessons" aria-labelledby="lesson-title">
      <div className="lessons__progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <div className="lessons__progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="lessons__meta">
        الدرس {index + 1} من {flat.length} — {unitTitle}
      </p>

      <div key={lesson.id} className="lesson-card-wrap">
        <article className="lesson-card">
          <h2 id="lesson-title" className="lesson-card__title">
            {lesson.title}
          </h2>
          <div className="lesson-card__goal">
            <span className="lesson-card__goal-label">تذكير</span>
            اقرأ بتمعن، ثم انتقل للدرس التالي عند استيعاب الفكرة الرئيسية.
          </div>
          <div className="lesson-card__body">
            <p>{lesson.body}</p>
          </div>
          {lesson.imageSrc && (
            <figure className="lesson-card__figure">
              <img
                src={lesson.imageSrc}
                alt={lesson.imageCaption ?? 'توضيح بصري للدرس'}
                className="lesson-card__img"
                loading="lazy"
              />
              {lesson.imageCaption && <figcaption>{lesson.imageCaption}</figcaption>}
            </figure>
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
