// src/components/LandingPage.js
import React from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import s from './LandingPage.module.css';

const LandingPage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignedIn) navigate('/dashboard');
  }, [isSignedIn, navigate]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={s.wrapper}>
      <header className={s.navbar}>
        <div className={s.logo}>VishwaVyapaar</div>
        <nav className={s.nav}>
          <button onClick={() => scrollTo('about')}>About Us</button>
          <button onClick={() => scrollTo('contact')}>Contact Us</button>
        </nav>
      </header>

      <section id="hero" className={s.hero}>
        <div className={s.parallax} />
        <h1 className={s.title}>HELP SME'S TO TRADE GLOBALLY</h1>
        <p className={s.sub}>
          Makes Import and Export Easy for Small and Medium Enterprises
        </p>
        <div className={s.tags}>
          {['#Import', '#VishwaVyapaar', '#SMEs', '#Export'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className={s.cta}>
          <SignUpButton mode="modal">
            <button className={s.btn}>Get Started<ChevronRight size={20} /></button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className={`${s.btn} ${s.outline}`}>Sign In</button>
          </SignInButton>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className={s.about}>
        <div className={s.aboutText}>
          <h2>About Us</h2>
          <p>
            VishwaVyapaar is built to demystify global trade for SMEs. From
            regulatory checklists to incentive discovery, we streamline every
            step so you can focus on growth, not paperwork.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"
          alt="About us"
          className={s.aboutImg}
        />
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className={s.contact}>
        <h2>Contact Us</h2>
        <p>Connect with the team behind VishwaVyapaar</p>
        <div className={s.links}>
          <a href="https://github.com/Krixna-Kant" target="_blank" rel="noopener">
            <Github size={24} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/krishna-kant19/" target="_blank" rel="noopener">
            <Linkedin size={24} /> LinkedIn
          </a>
          <a href="mailto:kant19krishna@gmail.com">
            <Mail size={24} /> Email
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;