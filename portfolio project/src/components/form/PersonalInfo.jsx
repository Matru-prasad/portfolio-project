import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

export default function PersonalInfo() {
  const { data, setData } = useContext(PortfolioContext);

  return (
    <>
      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <textarea
        placeholder="About"
        value={data.about}
        onChange={(e) => setData({ ...data, about: e.target.value })}
      />
    </>
  );
}