import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/interests', label: 'Focus' },
];

const FloatingCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!finePointer.matches || !cursor) return undefined;

    const root = document.documentElement;
    const dot = cursor.querySelector('span');
    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let hasPosition = false;

    const animateCursor = () => {
      cursorX += (pointerX - cursorX) * 0.24;
      cursorY += (pointerY - cursorY) * 0.24;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      dot?.style.setProperty('--dot-x', `${pointerX - cursorX}px`);
      dot?.style.setProperty('--dot-y', `${pointerY - cursorY}px`);

      if (Math.abs(pointerX - cursorX) > 0.15 || Math.abs(pointerY - cursorY) > 0.15) {
        animationFrame = requestAnimationFrame(animateCursor);
      } else {
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!hasPosition) {
        cursorX = pointerX;
        cursorY = pointerY;
        hasPosition = true;
      }
      cursor.classList.add('is-visible');
      root.classList.add('custom-cursor-active');
      if (!animationFrame) animationFrame = requestAnimationFrame(animateCursor);
    };

    const handlePointerOver = (event) => {
      if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) {
        cursor.classList.add('is-hovering');
      } else {
        cursor.classList.remove('is-hovering');
      }
    };

    const hideCursor = () => {
      cursor.classList.remove('is-visible', 'is-hovering', 'is-pressed');
      root.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      hasPosition = false;
      dot?.style.removeProperty('--dot-x');
      dot?.style.removeProperty('--dot-y');
    };

    const handlePointerDown = () => cursor.classList.add('is-pressed');
    const handlePointerUp = () => cursor.classList.remove('is-pressed');
    const handleKeyDown = () => hideCursor();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerleave', hideCursor);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrame);
      root.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerleave', hideCursor);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div className="floating-cursor" aria-hidden="true" ref={cursorRef}><span /></div>;
};

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }, [location.pathname]);

  useEffect(() => {
    const main = document.getElementById('main-content');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!main || reducedMotion) return undefined;

    const motionSelector = [
      '.hero-copy > *',
      '.portrait-frame',
      '.section-heading',
      '.project-card',
      '.home-bottom-note',
      '.contact-strip-inner',
      '.happenings-heading',
      '.happenings-toolbar',
      '.happening-card',
      '.page-heading > *',
      '.about-story',
      '.about-profile',
      '.about-workspace',
      '.about-interests',
      '.skills-toolbar',
      '.skill-card',
      '.learning-section',
      '.learning-card',
      '.growth-card',
      '.focus-card',
      '.contact-aside',
      '.contact-form-card',
      '.projects-more',
    ].join(', ');
    const tiltSelector = '.project-card, .skill-card, .focus-card';
    let observedCount = 0;

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.motionVisible = 'true';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
      : null;

    const observeElements = (root) => {
      if (root instanceof Element && root.matches(motionSelector) && root.dataset.motionItem !== 'true') {
        root.dataset.motionItem = 'true';
        root.style.setProperty('--motion-delay', `${Math.min((observedCount % 5) * 65, 260)}ms`);
        observedCount += 1;
        if (observer) {
          root.dataset.motionVisible = 'false';
          observer.observe(root);
        } else {
          root.dataset.motionVisible = 'true';
        }
      }

      if (root instanceof Element || root instanceof Document) {
        root.querySelectorAll(motionSelector).forEach((element) => {
          if (element.dataset.motionItem === 'true') return;
          element.dataset.motionItem = 'true';
          element.style.setProperty('--motion-delay', `${Math.min((observedCount % 5) * 65, 260)}ms`);
          observedCount += 1;
          if (observer) {
            element.dataset.motionVisible = 'false';
            observer.observe(element);
          } else {
            element.dataset.motionVisible = 'true';
          }
        });
      }
    };

    main.dataset.motionReady = 'true';
    observeElements(main);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeElements));
    });
    mutationObserver.observe(main, { childList: true, subtree: true });

    const handlePointerMove = (event) => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      const card = event.target instanceof Element ? event.target.closest(tiltSelector) : null;
      if (!card || !main.contains(card)) return;

      const bounds = card.getBoundingClientRect();
      const tiltX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
      const tiltY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 5;
      card.style.setProperty('--tilt-x', tiltX.toFixed(2));
      card.style.setProperty('--tilt-y', tiltY.toFixed(2));
      card.style.setProperty('--spotlight-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      card.style.setProperty('--spotlight-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };

    const handlePointerOut = (event) => {
      const card = event.target instanceof Element ? event.target.closest(tiltSelector) : null;
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--spotlight-x');
      card.style.removeProperty('--spotlight-y');
    };

    if (finePointer.matches) {
      main.addEventListener('pointermove', handlePointerMove, { passive: true });
      main.addEventListener('pointerout', handlePointerOut, { passive: true });
    }

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      main.removeEventListener('pointermove', handlePointerMove);
      main.removeEventListener('pointerout', handlePointerOut);
      delete main.dataset.motionReady;
      main.querySelectorAll('[data-motion-item]').forEach((element) => {
        delete element.dataset.motionItem;
        delete element.dataset.motionVisible;
        element.style.removeProperty('--motion-delay');
        element.style.removeProperty('--tilt-x');
        element.style.removeProperty('--tilt-y');
        element.style.removeProperty('--spotlight-x');
        element.style.removeProperty('--spotlight-y');
      });
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-container header-inner">
          <Link to="/" className="brand" aria-label="MD Rokibul Islam home">
            <span className="brand-mark">RI</span>
            <span className="brand-name">Rokibul Islam<small>Developer · Security enthusiast</small></span>
          </Link>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav id="primary-navigation" className={`primary-navigation${isMenuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <div className="nav-links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="nav-contact">
              Let’s talk <ArrowUpRight size={15} />
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <Link to="/" className="footer-brand">RI<span>.</span></Link>
          <p>Designed and built with care by MD Rokibul Islam.</p>
          <a href="https://github.com/webdoc-rokib/" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
          <span className="footer-year">© {new Date().getFullYear()}</span>
        </div>
      </footer>
      <FloatingCursor />
    </div>
  );
};

export default Layout;
