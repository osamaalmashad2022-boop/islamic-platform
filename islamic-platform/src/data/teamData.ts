export type TeamRole = 'member' | 'supervisor'

export type TeamPerson = {
  id: string
  name: string
  emoji: string
  role: TeamRole
}

/** فريق العمل — إيموجي ولد/بنت حسب الخطة */
export const teamMembers: TeamPerson[] = [
  { id: 'm1', name: 'وليد يحيى الشافعي', emoji: '👦', role: 'member' },
  { id: 'm2', name: 'شهد ماهر صابر', emoji: '👧', role: 'member' },
  { id: 'm3', name: 'شهد محمد عبده سميسم', emoji: '👧', role: 'member' },
]

/** المشرفون الأكاديميون */
export const supervisors: TeamPerson[] = [
  { id: 's1', name: 'أ.د/ محمد شمة', emoji: '👨‍🏫', role: 'supervisor' },
  { id: 's2', name: 'م/ غادة المتولي', emoji: '👩‍🏫', role: 'supervisor' },
]
