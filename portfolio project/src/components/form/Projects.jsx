import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

export default function Projects() {
  const { data, setData } = useContext(PortfolioContext);

  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: "", description: "" }]
    });
  };

  return (
    <>
      <button onClick={addProject}>Add Project</button>

      {data.projects.map((p, i) => (
        <div key={i}>
          <input
            placeholder="Title"
            value={p.title}
            onChange={(e) => {
              const updated = [...data.projects];
              updated[i].title = e.target.value;
              setData({ ...data, projects: updated });
            }}
          />
          <input
            placeholder="Description"
            value={p.description}
            onChange={(e) => {
              const updated = [...data.projects];
              updated[i].description = e.target.value;
              setData({ ...data, projects: updated });
            }}
          />
        </div>
      ))}
    </>
  );
}