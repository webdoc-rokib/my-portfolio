import { createElement } from 'react';
import { Activity, ArrowDown, ArrowUpRight, BookOpen, Code2, Coffee, Github, Linkedin, Plane, ShieldCheck } from 'lucide-react';
import cvFile from '../assets/cv.pdf';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/webdoc-rokib/', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rokib09/', icon: Linkedin },
];

const interests = [
  { label: 'Building things', icon: Code2 },
  { label: 'Exploring new places', icon: Plane },
  { label: 'Cricket', icon: Activity },
  { label: 'A good cup of tea', icon: Coffee },
];

const About = () => (
  <section id="about" className="page-section about-page">
    <div className="site-container">
      <header className="page-heading">
        <p className="section-kicker">A little about me</p>
        <h1>Curiosity, care, and a builder’s mindset.</h1>
        <p className="section-intro">
          I’m MD Rokibul Islam, a Computer Science student and web developer at Northern University Bangladesh.
          I care about making technology useful, understandable, and secure.
        </p>
      </header>

      <div className="about-layout">
        <div className="about-story">
          <div className="about-story-heading">
            <span className="about-icon"><ShieldCheck size={20} /></span>
            <div>
              <span className="section-kicker">How I approach my work</span>
              <h2>Thoughtful by default.</h2>
            </div>
          </div>
          <p>
            My path started with building websites and grew into a wider interest in how software works,
            how people use it, and how we can protect it. Today I’m developing my web skills while learning
            more about network security, ethical hacking, and machine learning.
          </p>
          <p>
            I believe good development is more than getting a feature to work. It’s making the experience
            clear, considering edge cases, and treating security as part of the process—not an afterthought.
            I enjoy learning in public, working through challenging problems, and collaborating with people
            who care about the details.
          </p>
          <blockquote>
            “Build useful things. Make them clear. Keep learning how to make them safer.”
          </blockquote>
          <div className="about-actions">
            <a className="button button-primary" href={cvFile} download="MD_Rokibul_Islam_CV.pdf">
              Download résumé <ArrowDown size={16} />
            </a>
            {socialLinks.map(({ label, href, icon }) => (
              <a key={label} className="about-social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit my ${label} profile`}>
                {createElement(icon, { size: 17 })}
              </a>
            ))}
          </div>
        </div>

        <aside className="about-profile" aria-label="Profile and education">
          <div className="about-photo">
            <img src="/portrait-editorial.jpg" alt="MD Rokibul Islam" />
            <span className="about-photo-label"><span /> Based in Bangladesh</span>
          </div>
          <div className="about-facts">
            <div className="about-fact">
              <span className="about-fact-icon"><BookOpen size={17} /></span>
              <div><span>Education</span><strong>B.Sc. in Computer Science & Engineering</strong><small>Northern University Bangladesh</small></div>
            </div>
            <div className="about-fact">
              <span className="about-fact-icon"><Code2 size={17} /></span>
              <div><span>Current focus</span><strong>Web development</strong><small>With security in mind</small></div>
            </div>
            <a className="about-profile-link" href="https://www.linkedin.com/in/rokib09/" target="_blank" rel="noopener noreferrer">
              More about my background <ArrowUpRight size={15} />
            </a>
          </div>
        </aside>
      </div>

      <section className="about-workspace" aria-labelledby="about-workspace-title">
        <img
          src="/working-at-desk.jpg"
          alt="Rokibul working at his computer in his workspace"
          loading="lazy"
          decoding="async"
        />
        <div className="about-workspace-copy">
          <p className="section-kicker">In the process</p>
          <h2 id="about-workspace-title">Learning by building.</h2>
          <p>
            Every project is a chance to sharpen my craft, explore new ideas, and make the web a little more useful.
          </p>
        </div>
      </section>

      <div className="about-interests">
        <div>
          <p className="section-kicker">Outside the editor</p>
          <h2>What keeps me curious.</h2>
        </div>
        <div className="interest-chips">
          {interests.map(({ label, icon }) => (
            <span className="interest-chip" key={label}>{createElement(icon, { size: 15 })}{label}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
