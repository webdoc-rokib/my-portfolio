import React, { useState, useEffect, useRef } from 'react';
import cvfile from "./assets/cv.pdf"
import { 
  User, Code, BookOpen, Coffee, Globe, Shield, Terminal, Mail, 
  Linkedin, Github, Cpu, ChevronDown, Plane, Menu, X, ExternalLink, 
  Server, Lock, Activity, Eye, MapPin
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  // Typewriter effect state
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100 - Math.random() * 50);
  const toRotate = [ "Web Developer", "Cyber Security Enthusiast", "Tech Learner" ];
  const period = 2000;

  // Set Title and Favicon
  useEffect(() => {
    document.title = "MD Rokibul Islam | Portfolio";
    
    // Set dynamic favicon
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛡️</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  // Handle scroll effects & Section visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, []);

  // Typewriter logic
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'interests', label: 'Interests' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-teal-500/10 via-blue-500/5 to-transparent blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-teal-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-blue-400 transition-all duration-300">
                MD.RI<span className="text-teal-500 animate-pulse">_</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                      activeSection === link.id
                        ? 'text-teal-400 bg-slate-900/50 border border-teal-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {activeSection === link.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className={`transition-all duration-1000 transform ${visibleSections['home'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                Computer Science Student & Tech Enthusiast building the future of <span className="text-teal-300 font-semibold">Cyber Security</span> and <span className="text-blue-300 font-semibold">AI</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2 group"
                >
                  <Mail size={20} className="group-hover:rotate-12 transition-transform" /> Get in Touch
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500/50 text-white font-semibold transition-all flex items-center justify-center gap-2 group"
                >
                  <Eye size={20} className="group-hover:scale-110 transition-transform" /> View Work
                </button>
              </div>
            </div>

            {/* Terminal/Visual Component */}
            <div className={`hidden md:block transition-all duration-1000 delay-300 transform ${visibleSections['home'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
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

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
            <ChevronDown size={32} className="text-slate-500 hover:text-teal-400 transition-colors" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 transform ${visibleSections['about'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            
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
                  Hello! I'm <span className="text-white font-semibold">MD Rokibul Islam</span>, a dedicated Computer Science student at <span className="text-teal-400">Northern University Bangladesh</span>.
                </p>
                <p>
                  I bridge the gap between building software and securing it. My journey started with simple web pages, but my curiosity led me down the rabbit hole of <span className="text-blue-400 font-medium">Network Security</span> and <span className="text-purple-400 font-medium">Artificial Intelligence</span>.
                </p>
                <p>
                  When I'm not auditing code or training models, I'm likely exploring new places or enjoying a good cup of tea while watching cricket.
                </p>
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

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${visibleSections['skills'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Terminal className="text-teal-400" /> Technical Arsenal
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              My toolkit for building and breaking. Constantly expanding my knowledge base.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Python", icon: "🐍", level: "Advanced", color: "group-hover:text-yellow-400", border: "group-hover:border-yellow-400" },
              { name: "JavaScript", icon: "⚡", level: "Advanced", color: "group-hover:text-yellow-300", border: "group-hover:border-yellow-300" },
              { name: "C++", icon: "⚙️", level: "Intermediate", color: "group-hover:text-blue-500", border: "group-hover:border-blue-500" },
              { name: "Java", icon: "☕", level: "Intermediate", color: "group-hover:text-red-500", border: "group-hover:border-red-500" },
              { name: "HTML/CSS", icon: "🎨", level: "Expert", color: "group-hover:text-orange-500", border: "group-hover:border-orange-500" },
              { name: "React", icon: "⚛️", level: "Intermediate", color: "group-hover:text-cyan-400", border: "group-hover:border-cyan-400" },
              { name: "Networking", icon: "🌐", level: "Learning", color: "group-hover:text-green-500", border: "group-hover:border-green-500" },
              { name: "Linux", icon: "🐧", level: "Daily Drive", color: "group-hover:text-slate-200", border: "group-hover:border-slate-200" }
            ].map((skill, idx) => (
              <div 
                key={idx} 
                className={`bg-slate-900 p-6 rounded-xl border border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group relative overflow-hidden ${visibleSections['skills'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-current ${skill.color}`}></div>
                <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>{skill.icon}</div>
                <h3 className={`text-lg font-bold text-slate-200 transition-colors ${skill.color}`}>{skill.name}</h3>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className={`h-full bg-slate-500 ${skill.color.replace('text', 'bg')} w-[85%] rounded-full`}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-mono">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - NEW FEATURE */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className={`mb-16 transition-all duration-1000 transform ${visibleSections['projects'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <Server className="text-purple-400" /> Featured Projects
            </h2>
            <div className="h-1 w-20 bg-purple-500 rounded-full mb-4"></div>
            <p className="text-slate-400 max-w-2xl">
              A selection of my recent work in Development and Security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Safe Ballot",
                desc: "A secure, transparent voting system designed to ensure election integrity using modern web security standards.",
                tech: ["Security", "React", "Cryptography"],
                icon: Lock,
                color: "teal",
                link: "https://github.com/webdoc-rokib/safe_ballot"
              },
              {
                title: "Rescue Map BD",
                desc: "Disaster response coordination platform mapping critical resources and rescue requests during emergencies.",
                tech: ["Mapping", "Real-time", "Crowdsource"],
                icon: MapPin,
                color: "red",
                link: "https://github.com/webdoc-rokib/rescue-map-bd"
              },
              {
                title: "ClassWave",
                desc: "Comprehensive academic management tool for Northern University Bangladesh to streamline classroom activities.",
                tech: ["Education Tech", "Management", "Web"],
                icon: BookOpen,
                color: "blue",
                link: "https://github.com/Northern-University-Bangladesh/ClassWave"
              },
              {
                title: "Visa Track",
                desc: "Automated tracking system for visa applications, providing real-time status updates and notifications.",
                tech: ["Automation", "Tracking", "Web"],
                icon: Plane,
                color: "purple",
                link: "https://github.com/webdoc-rokib/visa-track"
              }
            ].map((project, idx) => (
              <div 
                key={idx}
                className={`group bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden hover:border-${project.color}-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className={`h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-800 transition-colors`}>
                  <div className={`absolute inset-0 bg-gradient-to-tr from-${project.color}-500/10 to-transparent`}></div>
                  <project.icon size={64} className={`text-${project.color}-400 group-hover:scale-110 transition-transform duration-500`} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                      <Github size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3 transition-all duration-1000 transform ${visibleSections['interests'] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <Cpu className="text-blue-400" /> Areas of Focus
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cyber Security Card */}
            <div className={`group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 p-10 hover:border-teal-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.1)] ${visibleSections['interests'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
                <Shield size={180} />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="text-teal-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Cyber Security</h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                  My primary career aspiration. I am actively learning about network security, ethical hacking, and vulnerability assessment. I want to build systems that are secure by design.
                </p>
                <div className="inline-flex items-center gap-2 text-teal-400 font-bold tracking-wide text-sm uppercase">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span> Career Goal
                </div>
              </div>
            </div>

            {/* AI Card */}
            <div className={`group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 p-10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] ${visibleSections['interests'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:-rotate-12 duration-700">
                <Cpu size={180} />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Cpu className="text-blue-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Artificial Intelligence</h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                  Fascinated by the potential of AI. I enjoy exploring machine learning concepts and understanding how AI can be integrated with security to predict and prevent threats.
                </p>
                <div className="inline-flex items-center gap-2 text-blue-400 font-bold tracking-wide text-sm uppercase">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Current Passion
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`transition-all duration-1000 transform ${visibleSections['contact'] ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Collaborate?</h2>
            <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
              Whether you have a question, a project idea, or just want to discuss the latest in Cyber Sec or Cricket matches, my inbox is always open!
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a href="mailto:mdrokibulislam.nub@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-700 hover:border-teal-500 transition-all group hover:-translate-y-1 shadow-lg">
                <Mail className="text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">Email Me</span>
              </a>
              <a href="https://www.linkedin.com/in/rokib09" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all group hover:-translate-y-1 shadow-lg">
                <Linkedin className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">LinkedIn</span>
              </a>
              <a href="https://github.com/webdoc-rokib/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all group hover:-translate-y-1 shadow-lg">
                <Github className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">GitHub</span>
              </a>
              <a href="https://www.facebook.com/rokibul09" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all group hover:-translate-y-1 shadow-lg">
                <Facebook className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 text-2xl font-bold text-slate-200">
             MD.RI <span className="text-teal-500">_</span>
          </div>
          <p className="text-slate-500 mb-6">
            © {new Date().getFullYear()} MD Rokibul Islam. Built with React & Tailwind.
          </p>
          <div className="flex justify-center gap-6 text-sm text-slate-600 font-mono">
            <span className="hover:text-teal-400 transition-colors cursor-default">Coding</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 my-auto"></span>
            <span className="hover:text-green-400 transition-colors cursor-default">Cricket</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 my-auto"></span>
            <span className="hover:text-amber-500 transition-colors cursor-default">Tea</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 my-auto"></span>
            <span className="hover:text-blue-400 transition-colors cursor-default">Travel</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;