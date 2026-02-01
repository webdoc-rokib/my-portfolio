import React from 'react';
import { Server, Lock, BookOpen, Plane, MapPin, Github, ExternalLink, Star, Users } from 'lucide-react';

const Projects = ({ visibleSections }) => {
  const projects = [
    {
      title: "Safe Ballot",
      desc: "A secure, transparent voting system designed to ensure election integrity. Built with cryptography best practices and modern security standards.",
      tech: ["Security", "React", "Cryptography", "Backend"],
      icon: Lock,
      color: "teal",
      link: "https://github.com/webdoc-rokib/safe_ballot",
      status: "Completed",
      impact: "Designed for scalability to 100K+ voters",
      stars: 45
    },
    {
      title: "Rescue Map BD",
      desc: "Real-time disaster response coordination platform. Maps critical resources and rescue requests during emergencies with live collaboration features.",
      tech: ["Mapping", "Real-time", "Crowdsource", "WebSocket"],
      icon: MapPin,
      color: "red",
      link: "https://github.com/webdoc-rokib/rescue-map-bd",
      status: "Active",
      impact: "Used in local disaster drills",
      stars: 38
    },
    {
      title: "ClassWave",
      desc: "Comprehensive academic management tool for Northern University Bangladesh. Streamlines classroom activities, assignments, and student communication.",
      tech: ["Education Tech", "Management", "Database", "UI/UX"],
      icon: BookOpen,
      color: "blue",
      link: "https://github.com/Northern-University-Bangladesh/ClassWave",
      status: "In Development",
      impact: "Managing 500+ students daily",
      stars: 67
    },
    {
      title: "Visa Track",
      desc: "Automated tracking system for visa applications. Provides real-time status updates, notifications, and document management for applicants.",
      tech: ["Automation", "Tracking", "Notifications", "Database"],
      icon: Plane,
      color: "purple",
      link: "https://github.com/webdoc-rokib/visa-track",
      status: "Live",
      impact: "Processing 1000+ visa applications",
      stars: 52
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 transition-all duration-1000 transform translate-y-0 opacity-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Server className="text-purple-400" /> Featured Projects
          </h2>
          <div className="h-1 w-20 bg-purple-500 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Handpicked projects showcasing my skills in development, security, and problem-solving. Each project represents real challenges solved with creative, scalable solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden hover:border-slate-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 opacity-100 translate-y-0"
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-800 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-transparent"></div>
                <project.icon size={64} className="text-slate-600 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{project.title}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Live' ? 'bg-teal-500/20 text-teal-400' :
                    project.status === 'In Development' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-700/50 text-slate-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.desc}
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-400">💡</span>
                    <span>{project.impact}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded border border-slate-700 hover:border-slate-600 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-slate-800 flex gap-3">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors group/link">
                    <Github size={16} /> Source Code
                    <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Want to see more?</h3>
          <p className="text-slate-400 mb-6">Explore my GitHub profile for more projects, open source contributions, and code samples.</p>
          <a href="https://github.com/webdoc-rokib/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500/50 rounded-lg transition-all hover:shadow-lg hover:shadow-teal-500/20">
            <Github size={20} /> Visit My GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
