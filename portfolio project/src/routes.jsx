import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";

export default function RoutesComponent() {
  return (
    <div className="page fade-page">
      <Routes>
        <Route path="https://portfolio-project-xeff.onrender.com" element={<Landing />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}
