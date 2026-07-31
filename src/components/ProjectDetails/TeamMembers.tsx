import type { TeamMember } from "../../types";

interface TeamMembersProps {
  team: TeamMember[];
}

function TeamMembers({ team }: TeamMembersProps) {
  return (
    <section className="card team-members" aria-labelledby="team-members-heading">
      <h2 id="team-members-heading" className="card__heading">
        Team members
      </h2>

      <ul className="team-members__list">
        {team.map((member) => (
          <li className="team-member" key={member.id}>
            <span className="team-member__avatar" aria-hidden="true">
              {member.initials}
            </span>
            <div className="team-member__info">
              <p className="team-member__name">{member.name}</p>
              <p className="team-member__role">{member.role}</p>
            </div>
            <div
              className="team-member__workload"
              title={`${member.workloadPercent}% workload`}
            >
              <div
                className="team-member__workload-fill"
                style={{ width: `${member.workloadPercent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TeamMembers;
