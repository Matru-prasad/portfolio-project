import React from "react";
import "./template6.css";

export default function Template6({ data }) {
  if (!data) return null;

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div id="cv-template" className="t6-container">
      <div className="t6-grid">

        {/* ===== LEFT SIDE ===== */}
        <div className="t6-left">

          {/* NAME + ROLE */}
          <h1>{data?.name || "Your Name"}</h1>
          <h2>{data?.role || "Your Role"}</h2>

          {/* PUSH DOWN (ALIGN WITH CONTACT) */}
          <div className="summary-wrapper">
            <p className="summary">
              {data?.about || "Short professional summary about you."}
            </p>
          </div>

          {/* EXPERIENCE */}
          {safe(data?.experience).length > 0 && (
            <div className="section">
              <h3>EXPERIENCE</h3>

              {data.experience.map((e, i) => (
                <div key={i} className="block">
                  <h4>{e.role}</h4>
                  <p className="muted">
                    {e.company} • {e.year}
                  </p>
                  <p>{e.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION */}
          {data?.education && (
            <div className="section">
              <h3>EDUCATION</h3>
              <p>{data.education}</p>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {safe(data?.certifications).length > 0 && (
            <div className="section">
              <h3>CERTIFICATIONS</h3>

              {data.certifications.map((c, i) => (
                <p key={i}>
                  {c.name} — {c.org} ({c.year})
                </p>
              ))}
            </div>
          )}
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div className="t6-right">

          {/* IMAGE */}
          {data?.image && (
            <img src={data.image} alt="profile" />
          )}

          {/* CONTACT */}
          <div className="section">
            <h3>CONTACT</h3>
            <p>📞 {data?.contact?.phone || "-"}</p>
            <p>✉ {data?.contact?.email || "-"}</p>
            <p>📍 {data?.contact?.address || "India"}</p>
          </div>

          {/* SKILLS */}
          {safe(data?.skills).length > 0 && (
            <div className="section">
              <h3>SKILLS</h3>

              {data.skills.map((s, i) => (
                <p key={i}>• {s.name}</p>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {safe(data?.projects).length > 0 && (
            <div className="section">
              <h3>PROJECTS</h3>

              {data.projects.map((p, i) => (
                <p key={i}>{p.title}</p>
              ))}
            </div>
          )}

          {/* LANGUAGES */}
          {safe(data?.languages).length > 0 && (
            <div className="section">
              <h3>LANGUAGES</h3>

              {data.languages.map((l, i) => (
                <p key={i}>
                  • {l.name}
                  {l.level ? ` (${l.level})` : ""}
                </p>
              ))}
            </div>
          )}

          {/* INTERESTS */}
          {safe(data?.interests).length > 0 && (
            <div className="section">
              <h3>INTERESTS</h3>

              {data.interests.map((i, idx) => (
                <p key={idx}>• {i.name}</p>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}