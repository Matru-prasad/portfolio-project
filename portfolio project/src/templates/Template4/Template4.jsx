import React from "react";
import "./Template4.css";

const Template4 = ({ data = {} }) => {

  // ✅ SAFE DATA
  const safe = {
    name: data.name || "",
    role: data.role || "",
    image: data.image || "",
    about: data.about || "",
    contact: {
      phone: data.contact?.phone || "",
      email: data.contact?.email || ""
    },
    education: data.education || "",
    skills: Array.isArray(data.skills) ? data.skills : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    awards: Array.isArray(data.awards) ? data.awards : []
  };

  // ✅ UNIVERSAL VALUE EXTRACTOR (MAIN FIX)
  const getValue = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    return item.title || item.name || item.label || "";
  };

  return (
    <div id="cv-template" className="t4-container">

      {/* ===== HEADER ===== */}
      <div className="t4-header">
        <div>
          <h1>{safe.name}</h1>
          <h2>{safe.role}</h2>
        </div>

        {/* ✅ IMAGE */}
        {safe.image ? (
          <img src={safe.image} alt="profile" className="t4-img" />
        ) : null}
      </div>

      <div className="t4-body">

        {/* ===== LEFT ===== */}
        <div className="t4-left">

          {(safe.contact.phone || safe.contact.email) && (
            <div className="t4-section">
              <h3>Contact</h3>
              <p>{safe.contact.phone}</p>
              <p>{safe.contact.email}</p>
            </div>
          )}

          {safe.education && (
            <div className="t4-section">
              <h3>Education</h3>
              <p>{safe.education}</p>
            </div>
          )}

          {safe.skills.length > 0 && (
            <div className="t4-section">
              <h3>Skills</h3>
              <ul>
                {safe.skills.map((s, i) => {
                  const value = getValue(s);
                  return value ? <li key={i}>{value}</li> : null;
                })}
              </ul>
            </div>
          )}

          {safe.languages.length > 0 && (
            <div className="t4-section">
              <h3>Languages</h3>
              <ul>
                {safe.languages.map((l, i) => {
                  const value = getValue(l);
                  return value ? <li key={i}>{value}</li> : null;
                })}
              </ul>
            </div>
          )}

          {/* ✅ FIXED CERTIFICATIONS (NO EMPTY PDF ISSUE) */}
          {safe.certifications.length > 0 && (
            <div className="t4-section">
              <h3>Certifications</h3>
              <ul>
                {safe.certifications.map((c, i) => {
                  const value = getValue(c);
                  return value ? <li key={i}>{value}</li> : null;
                })}
              </ul>
            </div>
          )}

        </div>

        {/* ===== RIGHT ===== */}
        <div className="t4-right">

          {safe.about && (
            <div className="t4-section">
              <h3>About</h3>
              <p>{safe.about}</p>
            </div>
          )}

          {safe.experience.length > 0 && (
            <div className="t4-section">
              <h3>Experience</h3>
              {safe.experience.map((exp, i) => (
                <div key={i} className="t4-exp">
                  <p><strong>{exp?.role || ""}</strong></p>
                  <p>{exp?.company || ""} • {exp?.year || ""}</p>
                  <p>{exp?.description || ""}</p>
                </div>
              ))}
            </div>
          )}

          {safe.projects.length > 0 && (
            <div className="t4-section">
              <h3>Projects</h3>
              {safe.projects.map((p, i) => (
                <div key={i}>
                  <p><strong>{p?.title || ""}</strong></p>
                  <p>{p?.description || ""}</p>
                </div>
              ))}
            </div>
          )}

          {safe.awards.length > 0 && (
            <div className="t4-section">
              <h3>Awards</h3>
              <ul>
                {safe.awards.map((a, i) => {
                  const value = getValue(a);
                  return value ? <li key={i}>{value}</li> : null;
                })}
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Template4;