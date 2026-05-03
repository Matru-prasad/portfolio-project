import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

export default function Education() {
  const { data, setData } = useContext(PortfolioContext);

  return (
    <input
      placeholder="Education"
      value={data.education}
      onChange={(e) =>
        setData({ ...data, education: e.target.value })
      }
    />
  );
}