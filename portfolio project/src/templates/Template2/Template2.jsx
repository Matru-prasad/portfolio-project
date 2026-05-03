import React from "react";
import "./template2.css";

export default function Template2({ data }) {

  const safeArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  };

  if (!data) return <div>Loading...</div>;

  const skillsList = safeArray(data?.skills);
  const educationList = safeArray(data?.education);
  const certList = safeArray(data?.certifications);
  const langList = safeArray(data?.languages);

  return (
    <div id="cv-template" className="cv-container">

      {/* HEADER */}
      <div className="cv-header">
        <div>
          <h1>{data?.name}</h1>
          <h2>{data?.role}</h2>
        </div>

        {data?.image && (
          <img src={data.image} alt="profile" className="profile-img" />
        )}
      </div>

      <hr />

      {/* TOP */}
      <div className="cv-top">

        {(data?.contact?.phone || data?.contact?.email || data?.contact?.address) && (
          <div>
            <h3>CONTACT</h3>
            {data?.contact?.phone && <p>📞 {data.contact.phone}</p>}
            {data?.contact?.email && <p>✉️ {data.contact.email}</p>}
            {data?.contact?.address && <p>📍 {data.contact.address}</p>}
          </div>
        )}

        {data?.about && (
          <div>
            <h3>SUMMARY</h3>
            <p>{data.about}</p>
          </div>
        )}
      </div>

      <hr />

      {/* MAIN 2 COLUMN */}
      <div className="cv-main">

        {/* LEFT */}
        <div className="left">

          {/* SKILLS */}
          {skillsList.length > 0 && (
            <div className="section">
              <h3>SKILLS</h3>
              <ul>
                {skillsList.map((s, i) => (
                  <li key={i}>
                    {typeof s === "object" ? s.name : s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* EDUCATION */}
          {educationList.length > 0 && (
            <div className="section">
              <h3>EDUCATION</h3>
              {educationList.map((edu, i) => (
                <div key={i} className="timeline">
                  <h4>
                    {typeof edu === "object" ? edu.degree : edu}
                  </h4>
                  {typeof edu === "object" && edu.institute && (
                    <p>{edu.institute}</p>
                  )}
                  {typeof edu === "object" && edu.duration && (
                    <span>{edu.duration}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* LANGUAGES */}
          {langList.length > 0 && (
            <div className="section">
              <h3>LANGUAGES</h3>
              <ul>
                {langList.map((l, i) => (
                  <li key={i}>
                    {typeof l === "object" ? l.name : l}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT */}
        <div className="right">

          {/* CERTIFICATIONS */}
          {certList.length > 0 && (
            <div className="section">
              <h3>CERTIFICATIONS</h3>
              {certList.map((c, i) => (
                <div key={i} className="timeline">
                  <h4>
                    {typeof c === "object" ? c.name : c}
                  </h4>
                  {typeof c === "object" && c.org && (
                    <p>{c.org}</p>
                  )}
                  {typeof c === "object" && c.year && (
                    <span>{c.year}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {data?.projects?.length > 0 && (
            <div className="section">
              <h3>PROJECTS</h3>

              {data.projects.map((p, i) => (
                <div key={i} className="timeline">
                  <h4>
                    {typeof p === "object" ? p.title : p}
                  </h4>
                  {typeof p === "object" && p.description && (
                    <p>{p.description}</p>
                  )}
                  {typeof p === "object" && p.link && (
                    <span>{p.link}</span>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}