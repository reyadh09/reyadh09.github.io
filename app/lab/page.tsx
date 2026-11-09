import { AcademicShell } from "../site-components";
import type { Metadata } from "next";
import { alumni, currentMembers, sortMembers, type Member } from "./members";

export const metadata: Metadata = { title: "Seong-ho Lee | Lab" };

function MemberTable({ members, labelledBy }: { members: Member[]; labelledBy: string }) {
  return (
    <table className="member-table" aria-labelledby={labelledBy}>
      <colgroup>
        <col className="member-name-column" />
        <col className="member-program-column" />
        <col className="member-period-column" />
      </colgroup>
      <thead>
        <tr><th scope="col">Name</th><th scope="col">Program</th><th scope="col">Period</th></tr>
      </thead>
      <tbody>
        {members.map(({ name, korean, program, period }) => (
          <tr key={name}>
            <th scope="row">
              <div className="member-identity">
                <span className="member-name">{name}</span>
                {korean && <span className="member-korean" lang="ko">{korean}</span>}
              </div>
            </th>
            <td className="member-program">{program}</td>
            <td className="member-period">{period}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LabPage() {
  return (
    <AcademicShell active="lab">
      <header className="page-heading lab-heading">
        <h1>IDEA Lab</h1>
        <p className="lab-full-name">for Incomplete Data Efficient Analysis</p>
      </header>
      <section className="lab-section" aria-labelledby="current-members">
        <h2 id="current-members">Current members</h2>
        <MemberTable members={sortMembers(currentMembers, "current")} labelledBy="current-members" />
      </section>
      <section className="lab-section alumni" aria-labelledby="alumni">
        <h2 id="alumni">Alumni</h2>
        <MemberTable members={sortMembers(alumni, "alumni")} labelledBy="alumni" />
      </section>
    </AcademicShell>
  );
}
