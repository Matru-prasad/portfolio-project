import React, { useEffect, useState } from "react";
import "./Template3.css";

const Template3 = ({ data, downloadPDF }) => {

  // 🔥 control animation once
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100); // small delay for smooth entry
  }, []);

  return (
    <div className="t3-wrapper">

      {/* ===== BACKGROUND ===== */}
      <div className="t3-bg top"></div>
      <div className="t3-bg middle"></div>
      <div className="t3-bg vertical"></div>

      {/* ===== IMAGE ===== */}
      {data.image && (
        <div className={`t3-image-frame ${animate ? "show" : ""}`}>
          <img src={data.image} alt="profile" />
        </div>
      )}

      {/* ===== NAME ===== */}
      <div className={`t3-name-block ${animate ? "show" : ""}`}>
        <h1 className="t3-name">{data.name}</h1>
        <h2>{data.role}</h2>
        {data.contact?.phone && <p>{data.contact.phone}</p>}
        {data.contact?.email && <p>{data.contact.email}</p>}
      </div>

      {/* ===== LEFT SECTION ===== */}
      <div className={`t3-card left ${animate ? "show" : ""}`}>

        {data.education && (
          <>
            <h3>EDUCATION</h3>
            <p>{data.education}</p>
          </>
        )}

        {data.skills?.length > 0 && (
          <>
            <h3>SKILLS</h3>
            <ul>
              {data.skills.map((s, i) => (
                <li key={i}>{s?.name || s}</li>
              ))}
            </ul>
          </>
        )}

        {data.certifications?.length > 0 && (
          <>
            <h3>CERTIFICATIONS</h3>
            <ul>
              {data.certifications.map((c, i) => (
                <li key={i}>
                  {c.name}
                  {c.org && ` | ${c.org}`}
                  {c.year && ` (${c.year})`}
                </li>
              ))}
            </ul>
          </>
        )}

        {data.languages?.length > 0 && (
          <>
            <h3>LANGUAGES</h3>
            <ul>
              {data.languages.map((lang, i) => (
                <li key={i}>{lang.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* ===== RIGHT TOP ===== */}
      {data.about && (
        <div className={`t3-card right-top ${animate ? "show" : ""}`}>
          <h3>ABOUT</h3>
          <p>{data.about}</p>
        </div>
      )}

      {/* ===== PROJECTS ===== */}
      {data.projects?.length > 0 && (
        <div className={`t3-card right-bottom ${animate ? "show" : ""}`}>
          <h3>PROJECTS</h3>
          {data.projects.map((p, i) => (
            <div key={i}>
              <p><strong>{p.title}</strong></p>
              {p.description && <p>{p.description}</p>}
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer">
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== LEFT BOTTOM ===== */}
      <div className={`t3-card left-bottom ${animate ? "show" : ""}`}>

        {data.experience?.length > 0 && (
          <>
            <h3>EXPERIENCE</h3>
            <ul>
              {data.experience.map((exp, i) => (
                <li key={i}>
                  {exp.role}
                  {exp.company && ` - ${exp.company}`}
                  {exp.duration && ` (${exp.duration})`}
                </li>
              ))}
            </ul>
          </>
        )}

        {data.awards?.length > 0 && (
          <>
            <h3>AWARDS</h3>
            <ul>
              {data.awards.map((a, i) => (
                <li key={i}>{a.title || a}</li>
              ))}
            </ul>
          </>
        )}

        {(data.contact?.phone || data.contact?.email) && (
          <>
            <h3>CONTACT</h3>
            {data.contact?.phone && <p>{data.contact.phone}</p>}
            {data.contact?.email && <p>{data.contact.email}</p>}
          </>
        )}
      </div>

      {/* ===== DOWNLOAD BUTTON ===== */}
      <div className={`t3-download-wrapper ${animate ? "show" : ""}`}>
        <button className="t3-download-btn" onClick={downloadPDF}>
          Download CV
        </button>
      </div>

    </div>
  );
};

export default Template3;