import { createElement, useState } from 'react';
import { ArrowUpRight, Check, Facebook, Github, Linkedin, Mail, Send, X } from 'lucide-react';

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'mdrokibulislam.nub@gmail.com', href: 'mailto:mdrokibulislam.nub@gmail.com', external: false },
  { icon: Linkedin, label: 'LinkedIn', value: 'MD Rokibul Islam', href: 'https://www.linkedin.com/in/rokib09/', external: true },
  { icon: Github, label: 'GitHub', value: '@webdoc-rokib', href: 'https://github.com/webdoc-rokib/', external: true },
  { icon: X, label: 'X / Twitter', value: '@rokibul_islam09', href: 'https://x.com/rokibul_islam09', external: true },
  { icon: Facebook, label: 'Facebook', value: 'MD Rokibul Islam', href: 'https://www.facebook.com/rokibul09', external: true },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xkozgeyk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Message delivery failed (${response.status}).`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (submissionError) {
      console.error('Error sending message:', submissionError);
      setError('Your message could not be sent. Please try again or email me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="page-section contact-page">
      <div className="site-container">
        <header className="page-heading contact-heading">
          <p className="section-kicker">Open to good conversations</p>
          <h1>Let’s build something thoughtful.</h1>
          <p className="section-intro">
            Have a project, opportunity, or interesting idea? Send a note—I’d be glad to hear from you.
          </p>
        </header>

        <div className="contact-layout">
          <aside className="contact-aside">
            <div className="contact-aside-heading">
              <span className="contact-aside-icon"><Mail size={19} /></span>
              <div><span className="section-kicker">Find me online</span><h2>Choose your channel.</h2></div>
            </div>
            <div className="contact-methods">
              {contactMethods.map(({ icon, label, value, href, external }) => (
                <a
                  className="contact-method"
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="contact-method-icon">{createElement(icon, { size: 17 })}</span>
                  <span className="contact-method-copy"><strong>{label}</strong><small>{value}</small></span>
                  <ArrowUpRight size={15} className="contact-method-arrow" />
                </a>
              ))}
            </div>
            <div className="contact-note">
              <span className="contact-note-dot" />
              <p>I’m open to discussing web development, security, and interesting collaborations.</p>
            </div>
          </aside>

          <div className="contact-form-card">
            <div className="contact-form-heading">
              <span className="form-heading-icon"><Send size={18} /></span>
              <div><p className="section-kicker">A quick message</p><h2>Tell me what’s on your mind.</h2></div>
            </div>

            {submitted ? (
              <div className="form-success" role="status">
                <span><Check size={22} /></span>
                <h3>Thanks for reaching out.</h3>
                <p>Your message was sent successfully. I appreciate you getting in touch.</p>
                <button type="button" className="form-reset" onClick={() => setSubmitted(false)}>Send another message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field-row">
                  <label className="contact-field" htmlFor="contact-name">
                    <span>Your name</span>
                    <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Jane Smith" value={formData.name} onChange={handleChange} required />
                  </label>
                  <label className="contact-field" htmlFor="contact-email">
                    <span>Email address</span>
                    <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </label>
                </div>
                <label className="contact-field" htmlFor="contact-message">
                  <span>Message</span>
                  <textarea id="contact-message" name="message" placeholder="A little context helps me get back to you..." rows="6" value={formData.message} onChange={handleChange} required />
                </label>
                {error && <p className="contact-error" role="alert">{error}</p>}
                <div className="contact-submit-row">
                  <p>Your details are only used to reply to your message.</p>
                  <button type="submit" className="button button-primary" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Send message'} <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
