import { AcademicShell, Section } from "./site-components";

const recentNews = [
  {
    month: "Nov 2026",
    date: "2026-11",
    text: <>Jeongin Choi joined our lab as an M.S. student. Welcome, Jeongin!</>,
  },
  {
    month: "Oct 2026",
    date: "2026-10",
    text: <>Our paper “DOD: Detection of Outliers in High Dimensional Data with Distance of Distances” was published in <cite>Statistics and Computing</cite>. <a href="https://link.springer.com/article/10.1007/s11222-026-11026-0" aria-label="Paper on high-dimensional outlier detection">Paper</a></>,
  },
  {
    month: "Aug 2026",
    date: "2026-08",
    text: <>Odonchimeg Senden earned an M.S. degree. Congratulations, Odonchimeg!</>,
  },
  {
    month: "Jul 2026",
    date: "2026-07",
    text: <>Our paper “Efficient Inference under Label Shift in Unsupervised Domain Adaptation” was published in the <cite>Journal of Machine Learning Research</cite>. <a href="https://www.jmlr.org/papers/v27/25-2717.html" aria-label="Paper on inference under label shift">Paper</a></>,
  },
  {
    month: "Mar 2026",
    date: "2026-03",
    text: <>I received an Early Career Research Grant (Type B) from the National Research Foundation of Korea. <a href="https://research.uos.ac.kr/node/8556">Announcement</a></>,
  },
];

export default function HomePage() {
  return (
    <AcademicShell active="home">
      <header className="page-heading welcome-heading"><h1>Welcome!</h1><p className="intro">I'm Seong-ho Lee, an assistant professor in the Department of Statistics at the University of Seoul. Before joining UoS, I was a research fellow at the University of Michigan. I completed my Ph.D. in Statistics at The Pennsylvania State University under the guidance of <a href="http://sites.psu.edu/yanyuanma/" target="_blank" rel="noopener noreferrer">Dr. Yanyuan Ma</a>.</p></header>
      <Section title="Recent News" id="recent-news">
        <ul className="news-list" role="list">
          {recentNews.map(({ month, date, text }) => (
            <li className="record-row" key={date}>
              <time className="record-date" dateTime={date}>{month}</time>
              <div className="record-body"><p>{text}</p></div>
            </li>
          ))}
        </ul>
      </Section>
    </AcademicShell>
  );
}
