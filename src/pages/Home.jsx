import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, ChevronDown } from 'lucide-react';

const Home = ({ visibleSections }) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100 - Math.random() * 50);
  const toRotate = ["Web Developer", "Cyber Security Enthusiast", "Tech Learner"];
  const period = 2000;
  const navigate = useNavigate();

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
            <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-slate-900/50 border border-teal-500/30 mb-6 hover:border-teal-400/60 transition-colors">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <span className="text-teal-400 font-mono text-xs tracking-wider">SYSTEM ONLINE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              MD <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 animate-gradient">ROKIBUL</span> ISLAM
            </h1>
            
            <div className="text-xl md:text-2xl text-slate-400 mb-8 h-[40px] font-mono">
              I am a <span className="text-teal-400 border-r-2 border-teal-400 pr-1 animate-blink">{text}</span>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
              Building secure, scalable solutions at the intersection of <span className="text-teal-300 font-semibold">Web Development</span>, <span className="text-blue-300 font-semibold">Cyber Security</span>, and <span className="text-purple-300 font-semibold">AI</span>. Passionate about solving real-world problems through code.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-teal-500/50 transition-all">
                <div className="text-2xl font-bold text-teal-400">15+</div>
                <div className="text-xs text-slate-400">Projects</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-all">
                <div className="text-2xl font-bold text-blue-400">2+</div>
                <div className="text-xs text-slate-400">Years Coding</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all">
                <div className="text-2xl font-bold text-purple-400">∞</div>
                <div className="text-xs text-slate-400">Always Learning</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <Mail size={20} className="group-hover:rotate-12 transition-transform" /> Let's Work Together
              </button>
              <button 
                onClick={() => navigate('/projects')}
                className="px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500/50 text-white font-semibold transition-all flex items-center justify-center gap-2 group hover:scale-105"
              >
                <Eye size={20} className="group-hover:scale-110 transition-transform" /> Explore My Work
              </button>
            </div>
          </div>

          {/* Terminal/Visual Component */}
          <div className="hidden md:block transition-all duration-1000 delay-300 transform translate-x-0 opacity-100">
            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] transition-shadow duration-500 group">
              {/* Terminal Header */}
              <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-400 text-xs font-mono">rokibul@dev:~/portfolio</div>
                <div className="w-4"></div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm space-y-4">
                <div className="flex gap-2">
                  <span className="text-teal-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-300">$ ./init_profile.sh --verbose</span>
                </div>
                <div className="space-y-2 text-slate-400">
                  <p className="text-green-400">✔ Loading core modules...</p>
                  <p className="text-green-400">✔ Initializing security protocols...</p>
                  <p className="text-green-400">✔ Accessing database...</p>
                  <div className="pl-4 border-l-2 border-slate-700 my-2">
                    <p>Name: <span className="text-yellow-300">MD Rokibul Islam</span></p>
                    <p>Role: <span className="text-yellow-300">Student & Developer</span></p>
                    <p>Focus: <span className="text-yellow-300">CyberSec, AI, Web</span></p>
                    <p>Status: <span className="text-teal-300 animate-pulse">Ready to Work</span></p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-teal-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="w-2 h-4 bg-slate-400 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => navigate('/about')}>
          <ChevronDown size={32} className="text-slate-500 hover:text-teal-400 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Home;
