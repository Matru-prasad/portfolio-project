import React from "react";
import "./template1.css";

export default function Template1({ data, downloadPDF }) {
  if (!data) return <div>Loading...</div>;

  return (
    <div id="portfolio-preview" className="portfolio">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <h2 className="logo">Portfolio</h2>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          {data.skills?.length > 0 && <li><a href="#skills">Skills</a></li>}
          {data.languages?.length > 0 && <li><a href="#languages">Languages</a></li>}
          {data.education && <li><a href="#education">Education</a></li>}
          {data.projects?.length > 0 && <li><a href="#projects">Projects</a></li>}
          {data.certifications?.length > 0 && <li><a href="#certifications">Certifications</a></li>}
          {(data.contact?.phone || data.contact?.email) && (
            <li><a href="#contact">Contact</a></li>
          )}
        </ul>
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        <div className="hero-container">

          {data.image && (
            <div className="hero-image">
              <img src={data.image} alt="profile" crossOrigin="anonymous" />
            </div>
          )}

          <div className="hero-text">
            <h3>Hello I'm</h3>
            <h1>{data.name || "Your Name"}</h1>
            <h2>
              And I'm a <span>{data.role || "Your Role"}</span>
            </h2>
            <p>{data.about || "Your description..."}</p>
          </div>

        </div>
      </section>

      {/* ================= SKILLS ================= */}
      {data.skills?.length > 0 && (
        <section id="skills" className="skills-section fade-up">
          <h2>Skills</h2>
          <div className="skills-list">
            {data.skills.map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ================= LANGUAGES ================= */}
      {data.languages?.length > 0 && (
        <section id="languages" className="fade-up">
          <h2>Languages</h2>
          {data.languages.map((lang, i) => (
            <p key={i}>• {lang.name}</p>
          ))}
        </section>
      )}

      {/* ================= CERTIFICATIONS (ONLY THIS ADDED CLEANLY) ================= */}
      {data.certifications?.length > 0 && (
        <section id="certifications" className="fade-up">
          <h2>Certifications</h2>
          <div className="card">
            {data.certifications.map((cert, i) => (
              <p key={i}>
                <strong>{cert.name}</strong>
                {cert.org && ` - ${cert.org}`}
                {cert.year && ` (${cert.year})`}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section id="projects" className="projects-section fade-up">
          <h2>Projects</h2>
          <div className="projects">
            {data.projects.map((p, i) => (
              <div key={i} className="project-card card">
                <h4>{p.title}</h4>
                {p.description && <p>{p.description}</p>}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education && (
        <section id="education" className="education-section fade-up">
          <h2>Education</h2>
          <div className="card">
            {Array.isArray(data.education) ? (
              data.education.map((edu, i) => (
                <p key={i}>
                  {edu.degree} - {edu.institute} ({edu.duration})
                </p>
              ))
            ) : (
              <p>{data.education}</p>
            )}
          </div>
        </section>
      )}

      {/* ================= CONTACT ================= */}
      {(data.contact?.phone || data.contact?.email) && (
        <section id="contact" className="fade-up">
          <h2>Contact</h2>
          {data.contact?.phone && <p>📞 {data.contact.phone}</p>}
          {data.contact?.email && <p>📧 {data.contact.email}</p>}
        </section>
      )}

      {/* ================= DOWNLOAD ================= */}
      <div className="download-wrapper">
        <button className="download-btn" onClick={downloadPDF}>
          Download CV
        </button>
      </div>

    </div>
  );
}