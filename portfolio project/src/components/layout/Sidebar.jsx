import React from "react";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Sections</h3>
      <ul>
        <li>Personal Info</li>
        <li>About</li>
        <li>Skills</li>
        <li>Projects</li>
        <li>Education</li>
        <li>Contact</li>
      </ul>
      <hr/>
      <div className="sidebar-actions">
        <p>Fill Details</p>
        <p>Preview</p>
      </div>
    </div>
  );
}