import { createElement, useState } from 'react';
import { ArrowUpRight, Braces, Cloud, Cpu, Network, Shield, Terminal } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Everything' },
  { id: 'languages', label: 'Languages' },
  { id: 'web', label: 'Web development' },
  { id: 'security', label: 'Systems & security' },
];

const skills = [
  { name: 'Python', category: 'languages', mark: 'Py' },
  { name: 'JavaScript', category: 'languages', mark: 'JS' },
  { name: 'C++', category: 'languages', mark: 'C+' },
  { name: 'Java', category: 'languages', mark: 'Ja' },
  { name: 'HTML & CSS', category: 'web', mark: '</>' },
  { name: 'React', category: 'web', mark: 'Re' },
  { name: 'Networking', category: 'security', mark: 'Net' },
  { name: 'Linux', category: 'security', mark: 'Ln' },
];

const learningAreas = [
  { title: 'Machine learning', detail: 'Exploring machine learning concepts, neural networks, and practical AI applications.', icon: Cpu },
  { title: 'Application security', detail: 'Learning ethical testing, vulnerability assessment, and secure architecture.', icon: Shield },
  { title: 'Cloud & infrastructure', detail: 'Building familiarity with cloud platforms, containers, and deployment workflows.', icon: Cloud },
];

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const visibleSkills = skills.filter((skill) => selectedCategory === 'all' || skill.category === selectedCategory);

  return (
    <section id="skills" className="page-section skills-page">
      <div className="site-container">
        <header className="page-heading">
          <p className="section-kicker">Tools and technologies</p>
          <h1>A growing, practical toolkit.</h1>
          <p className="section-intro">
            These are the languages and areas I’ve been working with. I’m more interested in applying
            the right tool thoughtfully than claiming a percentage for every skill.
          </p>
        </header>

        <div className="skills-toolbar">
          <div className="skills-section-label"><Terminal size={17} /><span>Technical toolkit</span></div>
          <div className="skill-filters" aria-label="Filter skills">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`skill-filter${selectedCategory === id ? ' is-selected' : ''}`}
                aria-pressed={selectedCategory === id}
                onClick={() => setSelectedCategory(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="skills-grid" aria-live="polite">
          {visibleSkills.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <span className="skill-mark">{skill.mark}</span>
              <div className="skill-card-info">
                <h2>{skill.name}</h2>
                <span>{categories.find((category) => category.id === skill.category)?.label}</span>
              </div>
              <Braces className="skill-card-decoration" size={22} aria-hidden="true" />
            </article>
          ))}
        </div>

        <section className="learning-section" aria-labelledby="learning-heading">
          <div className="learning-heading">
            <div>
              <p className="section-kicker">Always learning</p>
              <h2 id="learning-heading">Where I’m exploring next.</h2>
            </div>
            <Network size={23} aria-hidden="true" />
          </div>
          <div className="learning-grid">
            {learningAreas.map(({ title, detail, icon }, index) => (
              <article className="learning-card" key={title}>
                <div className="learning-card-top"><span>0{index + 1}</span>{createElement(icon, { size: 19 })}</div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <a className="tryhackme-link" href="https://tryhackme.com/p/rokib09" target="_blank" rel="noopener noreferrer">
          <span className="tryhackme-mark"><Shield size={18} /></span>
          <span><strong>Security practice</strong><small>View my TryHackMe profile and learning progress</small></span>
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
};

export default Skills;
