import { AcademicShell, RecordRow, Section } from "./site-components";
import { academicSections } from "./academic-data";
export default function AboutPage() {
  return <AcademicShell active="about">
    <header className="page-heading welcome-heading"><h1>Welcome!</h1><p className="intro">I'm Seong-ho Lee, an assistant professor in the Department of Statistics at the University of Seoul. Before joining UoS, I was a research fellow at the University of Michigan. I completed my Ph.D. in Statistics at The Pennsylvania State University under the guidance of <a href="http://sites.psu.edu/yanyuanma/" target="_blank" rel="noopener noreferrer">Dr. Yanyuan Ma</a>.</p></header>
    {academicSections.map(section => <Section key={section.id} title={section.title} id={section.id}>
      {section.records.map(record => <RecordRow key={`${record.date}-${record.title}`} {...record} />)}
    </Section>)}
  </AcademicShell>;
}
