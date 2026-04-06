export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  /** نص اختياري يظهر بعد التصحيح */
  feedback?: string
}

export type LessonSlide = {
  id: string
  title: string
  body: string
  /** مسار نسبي من public */
  imageSrc?: string
  imageCaption?: string
}

export type Unit = {
  id: string
  title: string
  summary?: string
  lessons: LessonSlide[]
}

export type Course = {
  id: string
  title: string
  shortTitle: string
  description: string
  badge: string
  preQuiz: QuizQuestion[]
  postQuiz: QuizQuestion[]
  units: Unit[]
}
