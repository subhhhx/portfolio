'use client';

import { useState, useEffect, useCallback } from 'react';

type Tab = 'about' | 'projects' | 'resume' | 'contact';

// Wrapper suppresses hydration mismatch from ionicons injecting role/className/aria-label after SSR
function IonIcon({ name, size, style }: { name?: string; size?: string; style?: React.CSSProperties }) {
  return <ion-icon name={name} size={size} style={style} suppressHydrationWarning />;
}

interface Project {
  title: string;
  category: string;
  image: string;
  desc: string;
  tech: string[];
  github: string;
  live?: string;
  hideSource?: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const person = {
  name: 'Subhadeep Mandal',
  title: 'XIMB BM 28',
  email: 'msubha0107@gmail.com',
  phone: '+91 8335037475',
  location: 'Kolkata, West Bengal, India',
  github: 'https://github.com/subhhhx',
  linkedin: 'https://www.linkedin.com/in/subhadeep-mandal-aa1674268/',
  instagram: 'https://www.instagram.com/__subhhh',
  avatar: 'https://github.com/subhhhx.png',
};

const services = [
  {
    icon: 'bulb-outline',
    title: 'Strategic Thinking',
    desc: 'Breaking down complex business problems into structured frameworks and actionable decisions.',
  },
  {
    icon: 'stats-chart-outline',
    title: 'Data-Driven Management',
    desc: 'Combining analytical rigour with business acumen to drive evidence-based strategy.',
  },
  {
    icon: 'people-outline',
    title: 'Leadership & Teamwork',
    desc: 'Leading cross-functional teams, facilitating collaboration, and driving outcomes under ambiguity.',
  },
  {
    icon: 'git-network-outline',
    title: 'Tech-Business Bridge',
    desc: 'Translating engineering thinking into business impact across product, operations, and growth.',
  },
];

const projects: Project[] = [
  {
    title: 'Box Office Revenue Prediction',
    category: 'Machine Learning',
    image: '/box-office.webp',
    desc: 'Curated a dataset using TMDB APIs and web scraping of movie trailers. Developed a predictive model for estimating movie revenue using regression techniques and ML algorithms to improve forecasting accuracy.',
    tech: ['Python', 'TMDB API', 'Scikit-learn', 'Pandas', 'Regression'],
    github: 'https://github.com/subhhhx/box-office-revenue-prediction',
  },
  {
    title: 'Arduino Line-Following Bot',
    category: 'Embedded Systems',
    image: '/arduino.webp',
    desc: 'Designed and built an Arduino-based line-following robot. Developed and integrated IR sensor modules for precise line detection and implemented efficient path-following algorithms with obstacle avoidance.',
    tech: ['Arduino', 'C++', 'IR Sensors', 'Motor Control'],
    github: 'https://github.com/subhhhx',
    hideSource: true,
  },
  {
    title: 'Hariyali — E-commerce App',
    category: 'UI/UX Design',
    image: '/hariyali.png',
    desc: 'Designed the complete UI/UX of an e-commerce application. Developed interactive wireframes and prototypes for efficient user navigation, and collaborated with developers to integrate front-end design with backend functionality.',
    tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    github: 'https://github.com/subhhhx/hariyali',
  },
];

const education = [
  {
    school: 'Xavier Institute of Management Bhubaneswar (XIMB)',
    degree: 'MBA — Business Management (BM)',
    duration: '2026 — 2028',
    detail: 'Bhubaneswar, Odisha, India',
  },
  {
    school: 'Techno Main Salt Lake',
    degree: 'B.Tech — Computer Science & Business Systems',
    duration: 'Oct 2021 — May 2025',
    detail: 'Kolkata, West Bengal, India\nCGPA: 7.73',
  },
  {
    school: 'Hariyana Vidya Mandir',
    degree: 'Senior Secondary (XII)',
    duration: '2020 — 2021',
    detail: 'Kolkata, West Bengal, India\nPercentage: 88.5%',
  },
  {
    school: 'Kendriya Vidyalaya No. 1 Salt Lake',
    degree: 'Higher Secondary (X)',
    duration: '2018 — 2019',
    detail: 'Kolkata, West Bengal, India\nPercentage: 95.6%',
  },
];

const experience = [
  {
    company: 'SCALE AI (Outlier)',
    role: 'Maths Trainer (Freelance)',
    duration: 'Oct 2024 — Present',
    points: [
      'Designed and conducted A/B testing to enhance AI model responses.',
      'Developed complex prompts to effectively train AI models.',
      'Assessed AI responses based on accuracy, relevance, and quality.',
      'Provided feedback to improve AI model decision-making and learning.',
    ],
  },
  {
    company: 'Zscaler',
    role: 'Zero Trust Cloud Security Intern',
    duration: 'Apr 2024 — Jun 2024',
    points: [
      'Worked on Zero Trust Cloud Security protocols.',
      'Participated in workshops on cloud security infrastructure.',
      'Gained hands-on experience in network security and risk assessment.',
    ],
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactForm, setContactForm] = useState({ fullname: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const closeModal = useCallback(() => setSelectedProject(null), []);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) throw new Error();
      setFormStatus('success');
      setContactForm({ fullname: '', email: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <ul className="navbar-list">
          {(['about', 'projects', 'resume', 'contact'] as Tab[]).map((tab) => (
            <li key={tab} className="navbar-item">
              <button
                className={`navbar-link${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <IonIcon name={
                  tab === 'about' ? 'person-outline' :
                  tab === 'projects' ? 'briefcase-outline' :
                  tab === 'resume' ? 'document-text-outline' :
                  'mail-outline'
                } />
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {/* SIDEBAR */}
        <aside className={`sidebar${sidebarOpen ? ' active' : ''}`}>
          <div className="sidebar-info">
            <figure className="avatar-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.avatar} alt="Subhadeep Mandal" width={80} />
            </figure>
            <div className="info-content">
              <h1 className="name">{person.name}</h1>
              <p className="title">{person.title}</p>
            </div>
          </div>

          <div className="sidebar-info_more">
            <div className="separator" />
            <ul className="contacts-list">
              <li className="contact-item">
                <div className="icon-box"><IonIcon name="mail-outline" /></div>
                <div className="contact-info">
                  <p className="contact-title">Email</p>
                  <a href={`mailto:${person.email}`} className="contact-link">{person.email}</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="icon-box"><IonIcon name="phone-portrait-outline" /></div>
                <div className="contact-info">
                  <p className="contact-title">Phone</p>
                  <a href={`tel:${person.phone}`} className="contact-link">{person.phone}</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="icon-box"><IonIcon name="location-outline" /></div>
                <div className="contact-info">
                  <p className="contact-title">Location</p>
                  <address>{person.location}</address>
                </div>
              </li>
            </ul>
            <div className="separator" />
            <ul className="social-list">
              <li className="social-item">
                <a href={person.github} className="social-link" target="_blank" rel="noreferrer">
                  <IonIcon name="logo-github" />
                </a>
              </li>
              <li className="social-item">
                <a href={person.linkedin} className="social-link" target="_blank" rel="noreferrer">
                  <IonIcon name="logo-linkedin" />
                </a>
              </li>
              <li className="social-item">
                <a href={person.instagram} className="social-link" target="_blank" rel="noreferrer">
                  <IonIcon name="logo-instagram" />
                </a>
              </li>
            </ul>
          </div>

          <button className="info_more-btn" onClick={() => setSidebarOpen((o) => !o)}>
            <IonIcon name="chevron-down" />
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <div className="main-content">

          {/* ABOUT */}
          <article className={`about${activeTab === 'about' ? ' active' : ''}`} data-page="about">
            <header><h2 className="h2 article-title">About me</h2></header>
            <section className="about-text">
              <p>
                I am an engineer turned management professional, currently pursuing my MBA at XIMB (BM 28).
                My background in Computer Science and Business Systems gives me a strong foundation in
                analytical thinking, structured problem solving, and technology-driven decision making.
              </p>
              <p>
                I am passionate about applying critical thinking and data-backed reasoning to real business
                challenges. Whether it is working with teams, building strategy, or understanding systems,
                I bring both a technical perspective and a management mindset to everything I do.
              </p>
            </section>

            <section className="service">
              <h3 className="h3 service-title">What I&apos;m doing</h3>
              <ul className="service-list">
                {services.map((s) => (
                  <li key={s.title} className="service-item">
                    <div className="service-icon-box">
                      <IonIcon name={s.icon} size="large" style={{ color: 'var(--orange-yellow-crayola)' }} />
                    </div>
                    <div className="service-content-box">
                      <h4 className="h4 service-item-title">{s.title}</h4>
                      <p className="service-item-text">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* PROJECTS */}
          <article className={`projects${activeTab === 'projects' ? ' active' : ''}`} data-page="projects">
            <header><h2 className="h2 article-title">Projects</h2></header>
            <ul className="project-list">
              {projects.map((p) => (
                <li
                  key={p.title}
                  className="project-item active"
                  onClick={() => setSelectedProject(p)}
                >
                  <figure className="project-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </figure>
                  <div className="project-footer">
                    <div className="project-content-wrapper">
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-category">{p.category}</p>
                    </div>
                    <div className="project-links">
                      {!p.hideSource && (
                        <a
                          href={p.github}
                          className="project-link-icon"
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IonIcon name="logo-github" />
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          className="project-link-icon"
                          target="_blank"
                          rel="noreferrer"
                          title="Live Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IonIcon name="link-outline" />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* RESUME */}
          <article className={`resume${activeTab === 'resume' ? ' active' : ''}`} data-page="resume">
            <header className="resume-header">
              <h2 className="h2 article-title">Resume</h2>
              <div className="resume-actions">
                <a href="/Subhadeep_Mandal_Resume.pdf" target="_blank" className="download-btn">
                  <IonIcon name="eye-outline" />
                  <span>View PDF</span>
                </a>
                <a href="/Subhadeep_Mandal_Resume.pdf" download="Subhadeep_Mandal_Resume.pdf" className="download-btn">
                  <IonIcon name="download-outline" />
                  <span>Download</span>
                </a>
              </div>
            </header>

            <section className="timeline">
              <div className="title-wrapper">
                <div className="icon-box"><IonIcon name="briefcase-outline" /></div>
                <h3 className="h3">Experience</h3>
              </div>
              <ol className="timeline-list">
                {experience.map((exp) => (
                  <li key={exp.company} className="timeline-item">
                    <h4 className="h4 timeline-item-title">{exp.company}</h4>
                    <span>{exp.duration}</span>
                    <p className="timeline-text">
                      <strong style={{ color: 'var(--white-2)' }}>{exp.role}</strong>
                      {exp.points.map((pt, i) => (
                        <span key={i} style={{ display: 'block', marginTop: 4 }}>• {pt}</span>
                      ))}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="timeline">
              <div className="title-wrapper">
                <div className="icon-box"><IonIcon name="book-outline" /></div>
                <h3 className="h3">Education</h3>
              </div>
              <ol className="timeline-list">
                {education.map((ed) => (
                  <li key={ed.school} className="timeline-item">
                    <h4 className="h4 timeline-item-title">{ed.school}</h4>
                    <span>{ed.duration}</span>
                    <p className="timeline-text">
                      {ed.degree}
                      {ed.detail.split('\n').map((line, i) => (
                        <span key={i} style={{ display: 'block' }}>{line}</span>
                      ))}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </article>

          {/* CONTACT */}
          <article className={`contact${activeTab === 'contact' ? ' active' : ''}`} data-page="contact">
            <header><h2 className="h2 article-title">Contact</h2></header>

            <div className="mapbox">
              <iframe
                src="https://maps.google.com/maps?q=Kolkata,West+Bengal,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                title="Kolkata, West Bengal, India"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <section className="contact-form">
              <h3 className="h3 form-title">Contact Form</h3>
              <form className="form" onSubmit={handleContactSubmit}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full name"
                    required
                    value={contactForm.fullname}
                    onChange={(e) => setContactForm((f) => ({ ...f, fullname: e.target.value }))}
                  />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email address"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <textarea
                  className="form-input"
                  placeholder="Your Message"
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                />
                {formStatus === 'success' && (
                  <p style={{ color: 'var(--orange-yellow-crayola)', marginBottom: 12, fontSize: 'var(--fs-6)' }}>
                    Message sent! I&apos;ll get back to you soon.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p style={{ color: 'hsl(0,60%,60%)', marginBottom: 12, fontSize: 'var(--fs-6)' }}>
                    Something went wrong. Please try again.
                  </p>
                )}
                <button className="form-btn" type="submit" disabled={formStatus === 'loading'}>
                  <IonIcon name={formStatus === 'loading' ? 'reload-outline' : 'paper-plane'} />
                  <span>{formStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </section>

            <div className="separator" />

            <section className="contact-social">
              <h3 className="h3 form-title">Connect with me</h3>
              <ul className="social-list">
                <li className="social-item">
                  <a href={person.github} className="social-link" target="_blank" rel="noreferrer">
                    <IonIcon name="logo-github" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li className="social-item">
                  <a href={person.linkedin} className="social-link" target="_blank" rel="noreferrer">
                    <IonIcon name="logo-linkedin" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="social-item">
                  <a href={person.instagram} className="social-link" target="_blank" rel="noreferrer">
                    <IonIcon name="logo-instagram" />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </section>
          </article>

        </div>
      </main>

      {/* PROJECT DETAIL MODAL */}
      <div
        className={`project-modal-overlay${selectedProject ? ' active' : ''}`}
        onClick={closeModal}
      >
        {selectedProject && (
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={closeModal}>
              <IonIcon name="close-outline" />
            </button>
            <div className="project-modal-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="project-modal-body">
              <div className="project-modal-header">
                <div>
                  <h3 className="project-modal-title">{selectedProject.title}</h3>
                  <span className="project-modal-category">{selectedProject.category}</span>
                </div>
              </div>
              <div className="project-modal-separator" />
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">About This Project</h4>
                <p className="project-modal-desc">{selectedProject.desc}</p>
              </div>
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Tech Stack</h4>
                <div className="project-modal-tech">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="project-modal-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-modal-actions">
                {!selectedProject.hideSource && (
                  <a
                    href={selectedProject.github}
                    className="project-modal-btn project-modal-btn-github"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IonIcon name="logo-github" />
                    <span>Source Code</span>
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    className="project-modal-btn project-modal-btn-live"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IonIcon name="link-outline" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
