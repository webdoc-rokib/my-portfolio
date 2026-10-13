import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import cvFile from '../assets/cv.pdf';
import { projects } from '../data/projects';
import RecentHappenings from '../components/RecentHappenings';

const Home = () => {
  const [portraitAvailable, setPortraitAvailable] = useState(true);

  return (
    <div className="home-page">
      <section id="home" className="hero-section">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Portfolio · 2026</div>
            <p className="hero-overline">Hi, I'm Rokibul Islam</p>
            <h1>
              I build thoughtful
              <span className="hero-accent"> web experiences.</span>
            </h1>
            <p className="hero-description">
              Computer Science student and web developer with a security-first mindset.
              I enjoy turning complex ideas into useful, clear, and dependable products.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="button button-primary">
                Explore my work <ArrowRight size={17} />
              </Link>
              <Link to="/contact" className="button button-secondary">
                <Mail size={17} /> Get in touch
              </Link>
            </div>

            <a className="resume-link" href={cvFile} download="MD_Rokibul_Islam_CV.pdf">
              Download résumé <ArrowDown size={15} />
            </a>

            <div className="hero-specialties" aria-label="Areas of focus">
              <span><ShieldCheck size={16} /> Security-minded development</span>
              <span><Sparkles size={16} /> Curious by design</span>
            </div>
          </div>

          <div className="portrait-column">
            <div className="portrait-frame">
              <div className="portrait-backdrop" />
              {portraitAvailable ? (
                <img
                  className="portrait-image"
                  src="/portrait.jpg"
                  alt="Portrait of MD Rokibul Islam"
                  onError={() => setPortraitAvailable(false)}
                />
              ) : (
                <div className="portrait-placeholder" aria-label="Portrait placeholder">
                  <span className="portrait-monogram">RI</span>
                  <span className="portrait-placeholder-caption">Your portrait goes here</span>
                </div>
              )}
              <div className="portrait-note">
                <span className="portrait-note-mark"><ShieldCheck size={19} /></span>
                <span><strong>Build with care.</strong><small>Design · Development · Security</small></span>
              </div>
            </div>
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
          </div>
        </div>
        <a href="#featured-work" className="scroll-cue" aria-label="Scroll to featured work">
          <span>Scroll to explore</span><ArrowDown size={15} />
        </a>
      </section>

      <section id="featured-work" className="featured-section">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>Ideas made useful.</h2>
              <p className="section-intro">A few projects that reflect how I think, build, and solve problems.</p>
            </div>
            <Link to="/projects" className="text-link">All projects <ArrowUpRight size={16} /></Link>
          </div>

          <div className="featured-grid">
            {projects.slice(0, 3).map((project, index) => {
              const ProjectIcon = project.icon;
              return (
                <article className={`project-card project-card-${project.theme}`} key={project.title}>
                  <div className="project-cover" aria-hidden="true">
                    <div className="cover-window">
                      <div className="cover-window-bar"><span /><span /><span /></div>
                      <div className="cover-window-content">
                        <ProjectIcon size={31} strokeWidth={1.5} />
                        <span>{project.shortLabel}</span>
                      </div>
                    </div>
                    <span className="cover-index">0{index + 1}</span>
                  </div>
                  <div className="project-card-copy">
                    <div className="project-card-title">
                      <h3>{project.title}</h3>
                      <span className="project-category">{project.category}</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tech.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View source <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="home-bottom-note">
            <span className="home-bottom-icon"><Github size={18} /></span>
            <p>There’s more in progress. Follow along on GitHub.</p>
            <a href="https://github.com/webdoc-rokib/" target="_blank" rel="noopener noreferrer" aria-label="Visit Rokibul's GitHub profile">
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <RecentHappenings />

      <section className="home-contact-strip">
        <div className="site-container contact-strip-inner">
          <div>
            <p className="section-kicker">Have something in mind?</p>
            <h2>Let’s make it happen.</h2>
          </div>
          <div className="contact-strip-actions">
            <a href="https://www.linkedin.com/in/rokib09/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={19} /></a>
            <Link to="/contact" className="button button-primary">Start a conversation <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
