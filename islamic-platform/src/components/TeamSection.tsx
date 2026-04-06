import { supervisors, teamMembers } from '../data/teamData'
import './TeamSection.css'

export function TeamSection() {
  return (
    <section className="team" id="team" aria-labelledby="team-heading">
      <h2 id="team-heading" className="team__title">
        فريق العمل والإشراف
      </h2>

      <section className="team__block" aria-labelledby="team-members-heading">
        <h3 id="team-members-heading" className="team__block-title">
          فريق العمل
        </h3>
        <div className="team__person-grid">
          {teamMembers.map((person, i) => (
            <article
              key={person.id}
              className="team-person-card"
              style={{ animationDelay: `${0.06 + i * 0.07}s` }}
            >
              <div className="team-person-card__avatar" aria-hidden="true">
                <span className="team-person-card__emoji">{person.emoji}</span>
              </div>
              <p className="team-person-card__name">{person.name}</p>
              <span className="team-person-card__badge">عضو فريق العمل</span>
            </article>
          ))}
        </div>
      </section>

      <section className="team__block team__block--supervisors" aria-labelledby="team-supervisors-heading">
        <div className="team__supervisors-banner">
          <h3 id="team-supervisors-heading" className="team__block-title team__block-title--on-gold">
            تحت إشراف
          </h3>
        </div>
        <div className="team__supervisor-grid">
          {supervisors.map((person, i) => (
            <article
              key={person.id}
              className="team-person-card team-person-card--supervisor"
              style={{ animationDelay: `${0.28 + i * 0.08}s` }}
            >
              <div className="team-person-card__avatar team-person-card__avatar--supervisor" aria-hidden="true">
                <span className="team-person-card__emoji">{person.emoji}</span>
              </div>
              <p className="team-person-card__name">{person.name}</p>
              <span className="team-person-card__badge team-person-card__badge--supervisor">مشرف أكاديمي</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
