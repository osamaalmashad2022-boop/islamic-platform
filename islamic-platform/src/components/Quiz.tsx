import { useMemo, useState } from 'react'
import type { QuizQuestion } from '../types/course'
import './Quiz.css'

type Props = {
  title: string
  questions: QuizQuestion[]
  onFinish: (score: number, total: number) => void
  submitLabel?: string
}

export function Quiz({ title, questions, onFinish, submitLabel = 'إرسال الإجابات' }: Props) {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!submitted) return 0
    let s = 0
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) s += 1
    }
    return s
  }, [answers, questions, submitted])

  function select(q: QuizQuestion, index: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [q.id]: index }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitted) {
      onFinish(score, questions.length)
      return
    }
    const allAnswered = questions.every((q) => answers[q.id] !== undefined)
    if (!allAnswered) {
      alert('يرجى الإجابة على جميع الأسئلة قبل الإرسال.')
      return
    }
    setSubmitted(true)
  }

  function handleContinue() {
    onFinish(score, questions.length)
  }

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0

  return (
    <section className="quiz" aria-labelledby="quiz-title">
      <h2 id="quiz-title" className="quiz__heading">
        {title}
      </h2>
      <form className="quiz__form" onSubmit={handleSubmit}>
        <ol className="quiz__list">
          {questions.map((q, idx) => (
            <li key={q.id} className="quiz-card">
              <p className="quiz-card__prompt">
                <span className="quiz-card__num">{idx + 1}.</span> {q.prompt}
              </p>
              <ul className="quiz-card__options" role="radiogroup" aria-label={`سؤال ${idx + 1}`}>
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i
                  const showResult = submitted
                  const isCorrect = i === q.correctIndex
                  const cls = [
                    'quiz-option',
                    selected ? 'is-selected' : '',
                    showResult && selected && isCorrect ? 'is-correct' : '',
                    showResult && selected && !isCorrect ? 'is-wrong' : '',
                    showResult && !selected && isCorrect ? 'is-reveal' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        className={cls}
                        onClick={() => select(q, i)}
                        disabled={submitted}
                        aria-pressed={selected}
                      >
                        <span className="quiz-option__bullet" aria-hidden />
                        {opt}
                      </button>
                    </li>
                  )
                })}
              </ul>
              {submitted && q.feedback && (
                <p className="quiz-card__feedback" role="note">
                  {q.feedback}
                </p>
              )}
            </li>
          ))}
        </ol>

        {!submitted ? (
          <button type="submit" className="btn btn--primary">
            {submitLabel}
          </button>
        ) : (
          <div className="quiz__result">
            <p className="quiz__result-score">
              النتيجة: <strong>{score}</strong> من <strong>{questions.length}</strong> ({pct}%)
            </p>
            <button type="button" className="btn btn--primary" onClick={handleContinue}>
              متابعة
            </button>
          </div>
        )}
      </form>
    </section>
  )
}
