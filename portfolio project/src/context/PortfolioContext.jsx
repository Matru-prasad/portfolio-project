import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// Create context
export const PortfolioContext = createContext();

// Provider component
export const PortfolioProvider = ({ children }) => {
 const [data, setData] = useLocalStorage("portfolioData", {
  name: "",
  about: "",

  contact: {
    phone: "",
    email: "",
    address: ""
  },

  skills: [
    { name: "", level: 80 }
  ],

  // ✅ ADD THIS
  languages: [
    { name: "", level: 3 }
  ],

  // ✅ ADD THIS
  certifications: [
    { name: "", org: "", year: "" }
  ],

  education: [
    { degree: "", institute: "", duration: "" }
  ],

  experience: [
    {
      title: "",
      company: "",
      duration: "",
      points: [""]
    }
  ],

  projects: [
    { title: "", description: "", link: "" }
  ],

  template: "template1"
});
  return (
    <PortfolioContext.Provider value={{ data, setData }}>
      {children}
  
    </PortfolioContext.Provider>
  );
};