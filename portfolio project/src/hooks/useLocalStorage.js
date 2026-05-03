import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
}
