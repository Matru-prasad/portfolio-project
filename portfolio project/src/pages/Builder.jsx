import React, { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useNavigate } from "react-router-dom";
import "../styles/Builder.css";

export default function Builder() {
  const { data, setData } = useContext(PortfolioContext);
  const navigate = useNavigate();

  // ===== SAFE DEFAULT =====
  const safeData = {
    name: "",
    role: "",
    about: "",
    skills: [],
    projects: [],
    education: "",
    certifications: [],
    languages: [],
    experience: [],
    awards: [],
    interests: [],
    achievements: [],
    contact: { phone: "", email: "" },
    image: null,
    template: "template1",
    ...data,

    skills: data?.skills || [],
    projects: data?.projects || [],
    certifications: data?.certifications || [],
    languages: data?.languages || [],
    experience: data?.experience || [],
    awards: data?.awards || [],
    interests: data?.interests || [],
    achievements: data?.achievements || [],
  };

  // ===== LOAD =====
  useEffect(() => {
    const saved = localStorage.getItem("portfolioData");
    if (saved) {
      setData((prev) => ({
        ...prev,
        ...JSON.parse(saved),
      }));
    }
  }, [setData]);

  // ===== SAVE LOCAL =====
  useEffect(() => {
    localStorage.setItem("portfolioData", JSON.stringify(data));
  }, [data]);

  // ===== 🔥 BACKEND SAVE (NEW) =====
  const saveToBackend = async () => {
    try {
      await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("✅ Saved to MongoDB");
    } catch (err) {
      console.error("❌ Backend save error:", err);
    }
  };

  // ===== CHANGE =====
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // ===== IMAGE =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== TEMPLATE SWITCH =====
  const handleTemplateChange = (value) => {
    if (value === safeData.template) return;

    if (!window.confirm("Switching template will reset your data. Continue?"))
      return;

    if (value === "template1") {
      setData({
        template: "template1",
        name: "",
        role: "",
        about: "",
        skills: [],
        projects: [],
        education: "",
        certifications: [],
        languages: [],
        contact: { phone: "", email: "" },
        image: null,
      });
    }

    if (value === "template3") {
      setData({
        template: "template3",
        name: "",
        role: "",
        about: "",
        skills: [],
        projects: [],
        education: "",
        certifications: [],
        languages: [],
        experience: [],
        awards: [],
        contact: { phone: "", email: "" },
        image: null,
      });
    }

    if (value === "template5") {
      setData({
        template: "template5",
        name: "",
        role: "",
        about: "",
        skills: [],
        projects: [],
        education: "",
        certifications: [],
        languages: [],
        experience: [],
        interests: [],
        achievements: [],
        contact: { phone: "", email: "" },
        image: null,
      });
    }
  };

  // ===== HELPERS =====
  const addItem = (field, obj) => {
    setData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), obj],
    }));
  };

  const updateItem = (field, i, key, value) => {
    setData((prev) => {
      const updated = [...(prev[field] || [])];
      updated[i] = { ...updated[i], [key]: value };
      return { ...prev, [field]: updated };
    });
  };

  const removeItem = (field, i) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, idx) => idx !== i),
    }));
  };

  return (
    <div className="builder-container">
      <div className="form-area">

        <h2>Build Your Portfolio</h2>

        {/* TEMPLATE */}
        <h3>Select Portfolio Type</h3>
        <select
          value={safeData.template}
          onChange={(e) => handleTemplateChange(e.target.value)}
        >
          <option value="template1">🎓 Student Portfolio</option>
          <option value="template3">💼 Job Portfolio</option>
          <option value="template5">🎨 Creative Portfolio</option>
        </select>

        {/* BASIC */}
        <input
          placeholder="Your Name"
          value={safeData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          placeholder="Your Role"
          value={safeData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        />

        <textarea
          placeholder="About"
          value={safeData.about}
          onChange={(e) => handleChange("about", e.target.value)}
        />

        {/* IMAGE */}
        <h3>Profile Image</h3>
        {safeData.image ? (
          <div>
            <img
              src={safeData.image}
              alt="preview"
              style={{ width: 120, height: 120, borderRadius: "50%" }}
            />
            <button onClick={() => handleChange("image", null)}>
              Remove Image
            </button>
          </div>
        ) : (
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        )}

        {/* SKILLS */}
        <h3>Skills</h3>
        {safeData.skills.map((s, i) => (
          <div key={i}>
            <input
              placeholder="Skill"
              value={s.name || ""}
              onChange={(e) =>
                updateItem("skills", i, "name", e.target.value)
              }
            />
            <button onClick={() => removeItem("skills", i)}>×</button>
          </div>
        ))}
        <button onClick={() => addItem("skills", { name: "" })}>
          + Add Skill
        </button>

        {/* PROJECTS */}
        <h3>Projects</h3>
        {safeData.projects.map((p, i) => (
          <div key={i}>
            <input
              placeholder="Title"
              value={p.title || ""}
              onChange={(e) =>
                updateItem("projects", i, "title", e.target.value)
              }
            />
            <textarea
              placeholder="Description"
              value={p.description || ""}
              onChange={(e) =>
                updateItem("projects", i, "description", e.target.value)
              }
            />
            <input
              placeholder="Link"
              value={p.link || ""}
              onChange={(e) =>
                updateItem("projects", i, "link", e.target.value)
              }
            />
            <button onClick={() => removeItem("projects", i)}>Remove</button>
          </div>
        ))}
        <button onClick={() => addItem("projects", { title: "", description: "", link: "" })}>
          + Add Project
        </button>

        {/* EDUCATION */}
        <h3>Education</h3>
        <textarea
          placeholder="College, Degree, Year..."
          value={safeData.education}
          onChange={(e) => handleChange("education", e.target.value)}
        />

        {/* CERTIFICATIONS */}
        <h3>Certifications</h3>
        {safeData.certifications.map((c, i) => (
          <div key={i}>
            <input
              placeholder="Name"
              value={c.name || ""}
              onChange={(e) =>
                updateItem("certifications", i, "name", e.target.value)
              }
            />
            <input
              placeholder="Org"
              value={c.org || ""}
              onChange={(e) =>
                updateItem("certifications", i, "org", e.target.value)
              }
            />
            <input
              placeholder="Year"
              value={c.year || ""}
              onChange={(e) =>
                updateItem("certifications", i, "year", e.target.value)
              }
            />
            <button onClick={() => removeItem("certifications", i)}>×</button>
          </div>
        ))}
        <button onClick={() => addItem("certifications", { name: "", org: "", year: "" })}>
          + Add Certification
        </button>

        {/* LANGUAGES */}
        <h3>Languages</h3>
        {safeData.languages.map((l, i) => (
          <div key={i}>
            <input
              placeholder="Language"
              value={l.name || ""}
              onChange={(e) =>
                updateItem("languages", i, "name", e.target.value)
              }
            />
            <button onClick={() => removeItem("languages", i)}>×</button>
          </div>
        ))}
        <button onClick={() => addItem("languages", { name: "" })}>
          + Add Language
        </button>

        {/* EXPERIENCE */}
        {(safeData.template === "template3" || safeData.template === "template5") && (
          <>
            <h3>Experience</h3>
            {safeData.experience.map((e, i) => (
              <div key={i}>
                <input
                  placeholder="Role"
                  value={e.role || ""}
                  onChange={(ev) =>
                    updateItem("experience", i, "role", ev.target.value)
                  }
                />
                <button onClick={() => removeItem("experience", i)}>×</button>
              </div>
            ))}
            <button onClick={() => addItem("experience", { role: "" })}>
              + Add Experience
            </button>
          </>
        )}

        {/* AWARDS */}
        {safeData.template === "template3" && (
          <>
            <h3>Awards</h3>
            {safeData.awards.map((a, i) => (
              <div key={i}>
                <input
                  placeholder="Award"
                  value={a.title || ""}
                  onChange={(e) =>
                    updateItem("awards", i, "title", e.target.value)
                  }
                />
                <button onClick={() => removeItem("awards", i)}>×</button>
              </div>
            ))}
            <button onClick={() => addItem("awards", { title: "" })}>
              + Add Award
            </button>
          </>
        )}

        {/* CREATIVE */}
        {safeData.template === "template5" && (
          <>
            <h3>Interests</h3>
            {safeData.interests.map((i, index) => (
              <div key={index}>
                <input
                  placeholder="Interest"
                  value={i.name || ""}
                  onChange={(e) =>
                    updateItem("interests", index, "name", e.target.value)
                  }
                />
                <button onClick={() => removeItem("interests", index)}>×</button>
              </div>
            ))}
            <button onClick={() => addItem("interests", { name: "" })}>
              + Add Interest
            </button>

            <h3>Achievements</h3>
            {safeData.achievements.map((a, i) => (
              <div key={i}>
                <input
                  placeholder="Achievement"
                  value={a.title || ""}
                  onChange={(e) =>
                    updateItem("achievements", i, "title", e.target.value)
                  }
                />
                <button onClick={() => removeItem("achievements", i)}>×</button>
              </div>
            ))}
            <button onClick={() => addItem("achievements", { title: "" })}>
              + Add Achievement
            </button>
          </>
        )}

        {/* CONTACT */}
        <h3>Contact</h3>
        <input
          placeholder="Phone"
          value={safeData.contact.phone}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: { ...prev.contact, phone: e.target.value },
            }))
          }
        />
        <input
          placeholder="Email"
          value={safeData.contact.email}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: { ...prev.contact, email: e.target.value },
            }))
          }
        />

        {/* 🔥 ONLY CHANGE HERE */}
        <button
          onClick={() => {
            saveToBackend();   // backend save
            navigate("/preview");
          }}
        >
          Preview
        </button>

      </div>
    </div>
  );
}