import React from 'react';
import cvfile from "../assets/cv.pdf"
import { 
  User, Code, BookOpen, Coffee, Globe, Plane,
  Linkedin, Github, Facebook, Twitter
} from 'lucide-react';

const About = ({ visibleSections }) => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 transform translate-y-0 opacity-100">
          
          <div className="space-y-8">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-2">
                <span className="text-teal-400"><User className="w-8 h-8" /></span> 
                About Me
              </h2>
              <div className="h-1 w-20 bg-teal-500 rounded-full"></div>
            </div>
            
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>
                <span className="text-teal-300 font-bold text-2xl">Hey! 👋</span> I'm <span className="text-white font-semibold">MD Rokibul Islam</span>, a passionate Computer Science student at <span className="text-teal-400 font-semibold">Northern University Bangladesh</span>.
              </p>
              <p>
                My journey began with curiosity—building simple websites, then diving deep into <span className="text-blue-400 font-medium">Network Security</span>, <span className="text-purple-400 font-medium">Ethical Hacking</span>, and <span className="text-green-400 font-medium">Machine Learning</span>. I believe in building secure systems and believe cybersecurity isn't an afterthought—it's a fundamental principle.
              </p>
              <p>
                When I'm not debugging code or analyzing security vulnerabilities, you'll find me exploring new places, catching cricket matches, or brewing the perfect cup of tea. I'm a perpetual learner who thrives on challenges and loves collaborating with creative minds.
              </p>
              <p className="text-teal-300 font-semibold italic">
                "Code that's not secure is just a beautiful vulnerability waiting to happen."
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-teal-500/50 transition-all hover:-translate-y-1 text-center">
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <Code className="text-teal-400" size={20} />
                </div>
                <div className="text-sm text-slate-400">Languages</div>
                <div className="text-lg font-bold text-teal-400 mt-1">8+</div>
              </div>
              
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:-translate-y-1 text-center">
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <BookOpen className="text-blue-400" size={20} />
                </div>
                <div className="text-sm text-slate-400">Coursework</div>
                <div className="text-lg font-bold text-blue-400 mt-1">30+</div>
              </div>
              
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all hover:-translate-y-1 text-center">
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <Globe className="text-purple-400" size={20} />
                </div>
                <div className="text-sm text-slate-400">Open Source</div>
                <div className="text-lg font-bold text-purple-400 mt-1">10+</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-teal-500/50 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="text-blue-400" size={20} />
                  <span className="font-semibold text-white">Education</span>
                </div>
                <div className="text-sm text-slate-400">B.Sc. in CSE</div>
                <div className="text-xs text-teal-500/80">Northern University Bangladesh</div>
              </div>
              
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-teal-500/50 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="text-teal-400" size={20} />
                  <span className="font-semibold text-white">Occupation</span>
                </div>
                <div className="text-sm text-slate-400">Student & Web Dev</div>
                <div className="text-xs text-green-500/80">Available for Hire</div>
              </div>
            </div>

            {/* Personal Likes */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Code, text: "Coding", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
                { icon: Plane, text: "Travel", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
                { icon: Coffee, text: "Tea", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                { icon: Globe, text: "Cricket", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" }
              ].map((item, index) => (
                <span key={index} className={`px-4 py-2 ${item.bg} rounded-full text-sm border ${item.border} flex items-center gap-2 hover:scale-105 transition-transform cursor-default`}>
                  <item.icon size={16} className={item.color} /> 
                  <span className="text-slate-200">{item.text}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Visual/Card Area */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-5 mb-8 border-b border-slate-800 pb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-white relative z-10 border-2 border-slate-700">
                    MR
                  </div>
                  <div className="absolute inset-0 bg-teal-500 blur-xl opacity-20 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">MD Rokibul Islam</h3>
                  <p className="text-teal-400 font-mono text-sm mt-1">@CyberSecEnthusiast</p>
                  <div className="flex gap-2 mt-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-xs text-slate-400">Online & Coding</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 font-mono text-sm bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex gap-2">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">skills</span> = <span className="text-yellow-300">['Secure Coding', 'Ethical Hacking']</span>;
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-400">let</span> <span className="text-blue-400">passion</span> = <span className="text-green-400">'Learning AI'</span>;
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-400">function</span> <span className="text-blue-400">future</span>() {'{'}
                </div>
                <div className="pl-4">
                   <span className="text-purple-400">return</span> <span className="text-green-400">'Cyber Security Expert'</span>;
                </div>
                <div>{'}'}</div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="flex gap-4">
                  <a href="https://github.com/webdoc-rokib/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-teal-400 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/rokib09" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.facebook.com/rokibul09" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-blue-400 transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="https://x.com/rokibul_islam09" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
                <a 
                  href={cvfile}
                  download="MD_Rokibul_Islam_CV.pdf"
                  className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
