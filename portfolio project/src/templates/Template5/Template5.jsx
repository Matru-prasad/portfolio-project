import React, { useEffect } from "react";
import "./Template5.css";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Template6 from "../Template6/Template6.jsx"; // ✅ make sure path is correct
import { createRoot } from "react-dom/client";

export default function Template5({ data }) {

  // ✅ DOWNLOAD TEMPLATE6 AS PDF (FIXED)
  const downloadCV = async () => {
    try {
      // 🔥 Create hidden container
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "-9999px";
      container.style.width = "210mm"; // A4 width
      container.style.background = "#fff";
      document.body.appendChild(container);

      // 🔥 Render Template6 inside it
      const root = createRoot(container);
      root.render(<Template6 data={data} />);

      // 🔥 Wait for render + styles
      await new Promise((res) => setTimeout(res, 1000));

      const input = container.querySelector("#cv-template");

      if (!input) {
        alert("CV not found!");
        return;
      }

      // 🔥 Convert to canvas
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");

      // 🔥 Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // 🔥 DOWNLOAD FILE
      pdf.save(`${data?.name || "resume"}.pdf`);

      // 🔥 Cleanup
      root.unmount();
      document.body.removeChild(container);

    } catch (err) {
      console.error(err);
      alert("Download failed!");
    }
  };

  // ✅ SCROLL ANIMATION (UNCHANGED)
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="creative-template">

      {/* NAVBAR */}
      <nav className="creative-nav">
        <h2 className="logo">Creative.</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="download-btn" onClick={downloadCV}>
          Download CV
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero fade-up">
        <div className="hero-text">
          <h5>HELLO, I'M</h5>
          <h1>{data?.name}</h1>
          <h2>{data?.role}</h2>
          <p>{data?.about}</p>
        </div>

        {data?.image && (
          <div className="hero-img-wrapper">
            <img src={data.image} alt="profile" />
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section id="about" className="section fade-up">
        <h2>About Me</h2>
        <div className="card-grid">
          <div className="info-card">
            <p>{data?.about}</p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section fade-up">
        <h2>My Skills</h2>

        <div className="skills-grid">
          {data?.skills?.map((s, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-icon">{s.icon || "✨"}</div>
              <p>{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section fade-up">
        <h2>My Projects</h2>

        <div className="projects-grid">
          {data?.projects?.map((p, i) => (
            <div className="project-card" key={i}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      {data?.experience?.length > 0 && (
        <section className="section fade-up">
          <h2>Experience</h2>

          <div className="projects-grid">
            {data.experience.map((e, i) => (
              <div className="project-card" key={i}>
                <h3>{e.role}</h3>
                <p>{e.company} • {e.year}</p>
                <p>{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data?.education && (
        <section className="section fade-up">
          <h2>Education</h2>

          <div className="projects-grid">
            <div className="project-card">
              <h3>{data.education}</h3>
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data?.certifications?.length > 0 && (
        <section className="section fade-up">
          <h2>Certifications</h2>

          <div className="projects-grid">
            {data.certifications.map((c, i) => (
              <div className="project-card" key={i}>
                <h3>{c.name}</h3>
                <p>{c.org}</p>
                <p>{c.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INTERESTS */}
      {data?.interests?.length > 0 && (
        <section className="section fade-up">
          <h2>Interests</h2>

          <div className="projects-grid">
            {data.interests.map((i, idx) => (
              <div className="project-card" key={idx}>
                <h3>{i.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {data?.achievements?.length > 0 && (
        <section className="section fade-up">
          <h2>Achievements</h2>

          <div className="projects-grid">
            {data.achievements.map((a, i) => (
              <div className="project-card" key={i}>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section id="contact" className="section fade-up">
        <h2>Contact Me</h2>

        <div className="projects-grid">
          <div className="project-card">
            <p>📞 {data?.contact?.phone}</p>
            <p>✉️ {data?.contact?.email}</p>
          </div>
        </div>
      </section>

    </div>
  );
}