import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/projects';

const Projects = () => (
  <section id="projects" className="projects-page page-section">
    <div className="site-container">
      <header className="page-heading">
        <p className="section-kicker">A selection of things I’ve worked on</p>
        <h1>Projects with a purpose.</h1>
        <p className="section-intro">
          I like building practical products that balance a thoughtful experience with dependable engineering.
          Here are a few examples across web development, security, and problem-solving.
        </p>
      </header>

      <div className="projects-grid">
        {projects.map((project, index) => {
          const ProjectIcon = project.icon;
          return (
            <article className={`project-card project-card-${project.theme}`} key={project.title}>
              <div className="project-cover" aria-hidden="true">
                <div className="cover-window">
                  <div className="cover-window-bar"><span /><span /><span /></div>
                  <div className="cover-window-content">
                    <ProjectIcon size={36} strokeWidth={1.5} />
                    <span>{project.shortLabel}</span>
                  </div>
                </div>
                <span className="cover-index">0{index + 1}</span>
              </div>
              <div className="project-card-copy">
                <div className="project-card-title">
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h2>{project.title}</h2>
                  </div>
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  <Github size={16} /> View source <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="projects-more">
        <div className="projects-more-icon"><Github size={20} /></div>
        <div>
          <h2>More experiments and code</h2>
          <p>Visit GitHub for repositories, source code, and what I’m exploring next.</p>
        </div>
        <a href="https://github.com/webdoc-rokib/" target="_blank" rel="noopener noreferrer" className="button button-secondary">
          GitHub profile <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

export default Projects;
