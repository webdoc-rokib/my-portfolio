import React, { useState } from 'react';
import { Cpu, Shield, TrendingUp, AlertCircle, BookMarked } from 'lucide-react';

const Interests = ({ visibleSections }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <section id="interests" className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3 transition-all duration-1000 transform translate-x-0 opacity-100">
          <Cpu className="text-blue-400" /> Areas of Focus
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cyber Security Card */}
          <div 
            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 p-10 hover:border-teal-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.1)] translate-y-0 opacity-100 cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 'security' ? null : 'security')}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
              <Shield size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/20 group-hover:scale-110 transition-transform">
                <Shield className="text-teal-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Cyber Security <AlertCircle size={20} className="text-teal-400" />
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                My primary career aspiration. Actively learning network security, ethical hacking, vulnerability assessment, and secure architecture design.
              </p>
              
              {expandedCard === 'security' && (
                <div className="space-y-3 mb-6 animate-in">
                  <div className="text-sm text-slate-300">
                    <strong>Currently Exploring:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                      <li>Advanced Penetration Testing (CEH)</li>
                      <li>Zero-trust architecture models</li>
                      <li>Threat intelligence and analysis</li>
                      <li>Cloud security (AWS/Azure)</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="inline-flex items-center gap-2 text-teal-400 font-bold tracking-wide text-sm uppercase">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span> Career Goal
              </div>
            </div>
          </div>

          {/* AI Card */}
          <div 
            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 p-10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] translate-y-0 opacity-100 cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 'ai' ? null : 'ai')}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:-rotate-12 duration-700">
              <Cpu size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Cpu className="text-blue-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Artificial Intelligence <TrendingUp size={20} className="text-blue-400" />
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                Fascinated by AI potential. Exploring machine learning, deep learning, and how AI integrates with security to predict and prevent threats.
              </p>
              
              {expandedCard === 'ai' && (
                <div className="space-y-3 mb-6 animate-in">
                  <div className="text-sm text-slate-300">
                    <strong>Tech Stack & Learning:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                      <li>TensorFlow & PyTorch frameworks</li>
                      <li>Computer vision and NLP projects</li>
                      <li>AI-driven security (anomaly detection)</li>
                      <li>MLOps and deployment strategies</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="inline-flex items-center gap-2 text-blue-400 font-bold tracking-wide text-sm uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Current Passion
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-teal-500/50 transition-all hover:shadow-lg">
            <div className="text-3xl mb-4">📚</div>
            <h4 className="font-bold text-white mb-2">Certifications</h4>
            <p className="text-sm text-slate-400 mb-3">Currently pursuing industry-recognized security and AI certifications</p>
            <p className="text-xs text-teal-400 font-semibold">TryHackMe Hall of Fame • Learning Daily</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:shadow-lg">
            <div className="text-3xl mb-4">🔬</div>
            <h4 className="font-bold text-white mb-2">Research</h4>
            <p className="text-sm text-slate-400 mb-3">Following emerging security trends and publishing insights on cyber threats</p>
            <p className="text-xs text-blue-400 font-semibold">Medium • GitHub • Blog</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:shadow-lg">
            <div className="text-3xl mb-4">🤝</div>
            <h4 className="font-bold text-white mb-2">Community</h4>
            <p className="text-sm text-slate-400 mb-3">Contributing to open source projects and mentoring junior developers</p>
            <p className="text-xs text-purple-400 font-semibold">Open Source • CTF Competitions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
