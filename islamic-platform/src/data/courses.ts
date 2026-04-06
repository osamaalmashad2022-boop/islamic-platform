import type { Course } from '../types/course'
import { prim1T2 } from './prim1-t2'
import { prep1T2 } from './prep1-t2'
import { sec3T2 } from './sec3-t2'

export const allCourses: Course[] = [prim1T2, prep1T2, sec3T2]

export function getCourseById(id: string): Course | undefined {
  return allCourses.find((c) => c.id === id)
}
