import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

export default function Contact() {
  const { data, setData } = useContext(PortfolioContext);

  return (
    <input
      placeholder="Contact"
      value={data.contact}
      onChange={(e) =>
        setData({ ...data, contact: e.target.value })
      }
    />
  );
}