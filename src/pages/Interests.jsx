import { createElement, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Cpu, FlaskConical, Github, Shield, Sparkles, Users } from 'lucide-react';

const focusAreas = [
  {
    id: 'security',
    number: '01',
    label: 'Career direction',
    title: 'Cybersecurity',
    description: 'I’m interested in how systems fail, how to assess risk responsibly, and how security can be part of a better product from day one.',
    icon: Shield,
    topics: ['Network security fundamentals', 'Ethical security testing', 'Secure system design', 'Threat analysis'],
  },
  {
    id: 'ai',
    number: '02',
    label: 'Curiosity in progress',
    title: 'AI & machine learning',
    description: 'I’m exploring how machine learning can solve useful problems—and where it can complement security and software engineering.',
    icon: Cpu,
    topics: ['Machine learning foundations', 'Neural networks', 'Practical AI applications', 'AI in security'],
  },
];

const waysToGrow = [
  { title: 'Hands-on practice', description: 'Learn by building, testing ideas, and working through practical challenges.', icon: FlaskConical },
  { title: 'Open source', description: 'Study how other developers approach problems and contribute where I can.', icon: Github },
  { title: 'Community', description: 'Share ideas, learn with others, and stay open to different perspectives.', icon: Users },
];

const Interests = () => {
  const [expandedArea, setExpandedArea] = useState(null);

  return (
    <section id="interests" className="page-section focus-page">
      <div className="site-container">
        <header className="page-heading">
          <p className="section-kicker">Beyond the day-to-day</p>
          <h1>Questions worth exploring.</h1>
          <p className="section-intro">
            My interests connect software, security, and emerging technology. I’m early in the journey,
            staying curious, and building a stronger foundation one project at a time.
          </p>
        </header>

        <div className="focus-grid">
          {focusAreas.map(({ id, number, label, title, description, icon, topics }) => {
            const expanded = expandedArea === id;
            return (
              <article className={`focus-card focus-card-${id}`} key={id}>
                <div className="focus-card-header">
                  <span className="focus-number">{number}</span>
                  <span className="focus-icon">{createElement(icon, { size: 22 })}</span>
                </div>
                <p className="focus-label">{label}</p>
                <h2>{title}</h2>
                <p className="focus-description">{description}</p>
                <button
                  type="button"
                  className="focus-toggle"
                  aria-expanded={expanded}
                  aria-controls={`${id}-topics`}
                  onClick={() => setExpandedArea(expanded ? null : id)}
                >
                  {expanded ? 'Close topics' : 'Topics I’m exploring'}
                  {expanded ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                </button>
                {expanded && (
                  <ul className="focus-topics" id={`${id}-topics`}>
                    {topics.map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                )}
              </article>
            );
          })}
        </div>

        <section className="growth-section" aria-labelledby="growth-heading">
          <div className="growth-heading">
            <span className="growth-heading-icon"><Sparkles size={19} /></span>
            <div>
              <p className="section-kicker">How I keep growing</p>
              <h2 id="growth-heading">Stay curious. Keep building.</h2>
            </div>
          </div>
          <div className="growth-grid">
            {waysToGrow.map(({ title, description, icon }, index) => (
              <article className="growth-card" key={title}>
                <span className="growth-index">0{index + 1}</span>
                {createElement(icon, { size: 20 })}
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Interests;
