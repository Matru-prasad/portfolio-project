import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

export default function Skills() {
  const { data, setData } = useContext(PortfolioContext);

  return (
    <input
      placeholder="Skills (comma separated)"
      value={data.skills.join(",")}
      onChange={(e) =>
        setData({ ...data, skills: e.target.value.split(",") })
      }
    />
  );
}