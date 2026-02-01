import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = ({ children, visibleSections }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleSections[entry.target.id] = true;
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

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/interests', label: 'Interests' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

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
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => navigate('/')}>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-blue-400 transition-all duration-300">
                MD.RI<span className="text-teal-500 animate-pulse">_</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                      isActive(link.path)
                        ? 'text-teal-400 bg-slate-900/50 border border-teal-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive(link.path) && (
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
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

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

export default Layout;
