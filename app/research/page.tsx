import { AcademicShell, Arrow } from "../site-components";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Seong-ho Lee | Research" };
import { interests, publications } from "../academic-data";
export default function ResearchPage() {
  return <AcademicShell active="research"><header className="page-heading research-heading"><h1>Research interests</h1></header><div className="interests-grid">{interests.map(([title, description]) => <section className="interest" key={title}><h2>{title}</h2><p>{description}</p></section>)}</div><section className="publications-section" aria-labelledby="publications-title"><div className="section-heading"><h2 id="publications-title">Publications</h2></div><p className="author-key">* ⭢ corresponding author; ⁺ ⭢ lab member; ⁼ ⭢ co-first author</p><ol className="publication-list">{publications.map(p => <li className="publication" key={p.title}><span className="publication-year">{p.year}</span><article><h3><a href={p.url} target="_blank" rel="noopener noreferrer">{p.title}<Arrow /></a></h3><p className="authors">{p.authors}</p><p className={p.journal === "submitted" ? "publication-status" : "journal"}>{p.journal}</p></article></li>)}</ol></section></AcademicShell>;
}
