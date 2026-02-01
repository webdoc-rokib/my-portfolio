import React, { useState } from 'react';
import { Mail, Linkedin, Github, Facebook, X, ExternalLink, Send, CheckCircle } from 'lucide-react';

const Contact = ({ visibleSections }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xkozgeyk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mdrokibulislam.nub@gmail.com',
      link: 'mailto:mdrokibulislam.nub@gmail.com',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'hover:border-red-500/50'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'MD Rokibul Islam',
      link: 'https://www.linkedin.com/in/rokib09/',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'hover:border-blue-500/50'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@webdoc-rokib',
      link: 'https://github.com/webdoc-rokib/',
      color: 'text-slate-300',
      bgColor: 'bg-slate-500/10',
      borderColor: 'hover:border-slate-400/50'
    },
    {
      icon: X,
      label: 'X (Twitter)',
      value: '@rokibul_islam09',
      link: 'https://x.com/rokibul_islam09',
      color: 'text-slate-300',
      bgColor: 'bg-slate-500/10',
      borderColor: 'hover:border-slate-400/50'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'MD Rokibul Islam',
      link: 'https://www.facebook.com/rokibul09',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'hover:border-blue-500/50'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center transition-all duration-1000 transform translate-x-0 opacity-100">
          Let's Connect & Collaborate
        </h2>
        
        <p className="text-center text-slate-400 text-lg mb-16 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities. Whether you want to discuss cybersecurity, AI, or just grab coffee ☕, feel free to reach out!
        </p>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 lg:grid-cols-5 md:gap-4">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl ${method.bgColor} border border-slate-700 ${method.borderColor} p-6 transition-all duration-500 hover:shadow-lg flex flex-col items-center text-center cursor-pointer transform hover:scale-105`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`${method.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{method.label}</h3>
                <p className="text-xs text-slate-400 truncate max-w-[150px]">{method.value}</p>
                <ExternalLink size={14} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>

        {/* Quick Message Form */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Send size={28} className="text-blue-400" /> Quick Message
          </h3>
          
          {submitted ? (
            <div className="text-center py-12 animate-in">
              <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Message Received! 🎉</h4>
              <p className="text-slate-400">Thanks for reaching out. I'll get back to you ASAP!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              
              <textarea
                name="message"
                placeholder="Your message or project idea..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 text-center hover:border-blue-500/50 transition-all">
          <h3 className="text-2xl font-bold text-white mb-3">
            💡 Let's Build Something Amazing Together
          </h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Open to freelance projects, full-time opportunities, partnerships, or just interesting conversations about tech, security, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mdrokibulislam.nub@gmail.com"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
            >
              Email Me Now
            </a>
            <a
              href="https://www.linkedin.com/in/rokib09/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-slate-600 hover:border-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-105"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-sm mt-12">
          Response time: Usually within 24-48 hours ⏱️
        </p>
      </div>
    </section>
  );
};

export default Contact;
