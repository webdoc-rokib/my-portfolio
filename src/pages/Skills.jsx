import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

const Skills = ({ visibleSections }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skills = [
    { name: "Python", icon: "🐍", level: "Advanced", proficiency: 95, category: "languages", color: "group-hover:text-yellow-400" },
    { name: "JavaScript", icon: "⚡", level: "Advanced", proficiency: 90, category: "languages", color: "group-hover:text-yellow-300" },
    { name: "C++", icon: "⚙️", level: "Intermediate", proficiency: 75, category: "languages", color: "group-hover:text-blue-500" },
    { name: "Java", icon: "☕", level: "Intermediate", proficiency: 70, category: "languages", color: "group-hover:text-red-500" },
    { name: "HTML/CSS", icon: "🎨", level: "Expert", proficiency: 98, category: "web", color: "group-hover:text-orange-500" },
    { name: "React", icon: "⚛️", level: "Intermediate", proficiency: 85, category: "web", color: "group-hover:text-cyan-400" },
    { name: "Networking", icon: "🌐", level: "Learning", proficiency: 60, category: "security", color: "group-hover:text-green-500" },
    { name: "Linux", icon: "🐧", level: "Daily Drive", proficiency: 88, category: "security", color: "group-hover:text-slate-200" }
  ];

  const filteredSkills = skills.filter(skill => selectedCategory === 'all' || skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 transition-all duration-1000 transform translate-y-0 opacity-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Terminal className="text-teal-400" /> Technical Arsenal
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            My carefully crafted toolkit. Always evolving, always learning. Hover over skills for proficiency details.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'All Skills', icon: '⚡' },
            { id: 'languages', label: 'Languages', icon: '🐍' },
            { id: 'web', label: 'Web Dev', icon: '🌐' },
            { id: 'security', label: 'Security', icon: '🔒' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* TryHackMe Badge */}
        <div className="flex justify-center mb-12 px-4">
          <iframe src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=6702438" style={{border: 'none', borderRadius: '8px', width: '100%', maxWidth: '600px', height: '100px', overflow: 'hidden'}}></iframe>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {filteredSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 p-6 rounded-xl border border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group relative overflow-hidden opacity-100 translate-y-0 cursor-default"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-current ${skill.color}`}></div>
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl transform group-hover:scale-110 transition-transform duration-300`}>{skill.icon}</div>
                <div className="text-right">
                  <div className="text-xs font-bold text-teal-400">{skill.proficiency}%</div>
                  <div className="text-xs text-slate-500">{skill.level}</div>
                </div>
              </div>
              <h3 className={`text-lg font-bold text-slate-200 transition-colors mb-3 ${skill.color}`}>{skill.name}</h3>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700 rounded-2xl p-8 mt-16">
          <h3 className="text-2xl font-bold mb-6 text-teal-400">Currently Learning 📚</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/30 hover:border-blue-500/60 transition-all">
              <div className="text-2xl mb-2">🤖</div>
              <h4 className="font-bold text-blue-400 mb-2">Machine Learning</h4>
              <p className="text-sm text-slate-400">Exploring TensorFlow, Neural Networks, and AI applications</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-bold text-purple-400 mb-2">Advanced Security</h4>
              <p className="text-sm text-slate-400">Penetration testing, reverse engineering, and cryptography</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all">
              <div className="text-2xl mb-2">☁️</div>
              <h4 className="font-bold text-green-400 mb-2">Cloud Architecture</h4>
              <p className="text-sm text-slate-400">AWS, Docker, Kubernetes, and DevSecOps practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
