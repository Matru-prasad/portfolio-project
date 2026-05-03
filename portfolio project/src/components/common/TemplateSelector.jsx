// components/common/TemplateSelector.jsx
import React, { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import "./templateSelector.css";

export default function TemplateSelector() {
  const { data, setData } = useContext(PortfolioContext);

  return (
    <div className="template-selector">
      <h3>Select Template</h3>

      <div className="template-options">
        <div
          className={`template-card ${data.template === "template1" ? "active" : ""}`}
          onClick={() => setData({ ...data, template: "template1" })}
        >
          Template 1
        </div>

        <div
          className={`template-card ${data.template === "template2" ? "active" : ""}`}
          onClick={() => setData({ ...data, template: "template2" })}
        >
          Template 2
        </div>
      </div>
    </div>
  );
}