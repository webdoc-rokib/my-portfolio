import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Interests from './pages/Interests';
import Contact from './pages/Contact';

const App = () => {
  const [visibleSections, setVisibleSections] = useState({});

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

  // Handle Section visibility
  useEffect(() => {
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
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, []);

  return (
    <Router>
      <Layout visibleSections={visibleSections}>
        <Routes>
          <Route path="/" element={<Home visibleSections={visibleSections} />} />
          <Route path="/about" element={<About visibleSections={visibleSections} />} />
          <Route path="/skills" element={<Skills visibleSections={visibleSections} />} />
          <Route path="/projects" element={<Projects visibleSections={visibleSections} />} />
          <Route path="/interests" element={<Interests visibleSections={visibleSections} />} />
          <Route path="/contact" element={<Contact visibleSections={visibleSections} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
