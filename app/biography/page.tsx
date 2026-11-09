import type { Metadata } from "next";
import { academicSections } from "../academic-data";
import { AcademicShell, RecordRow, Section } from "../site-components";

export const metadata: Metadata = { title: "Seong-ho Lee | Biography" };

export default function BiographyPage() {
  return (
    <AcademicShell active="biography">
      <header className="page-heading biography-heading"><h1>Biography</h1></header>
      {academicSections.map(section => (
        <Section key={section.id} title={section.title} id={section.id}>
          {section.records.map(record => <RecordRow key={`${record.date}-${record.title}`} {...record} />)}
        </Section>
      ))}
    </AcademicShell>
  );
}
