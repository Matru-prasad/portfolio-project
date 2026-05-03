import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>Build Your Portfolio</h1>
      <button onClick={() => navigate("/builder")}>
        Get Started
      </button>
    </div>
  );
}