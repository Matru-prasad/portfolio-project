// Clean text (remove extra spaces)
export function formatText(text) {
  return text?.trim() || "";
}

// Capitalize first letter
export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Convert skills array to string
export function formatSkills(skills) {
  if (!skills || skills.length === 0) return "No skills added";
  return skills.join(", ");
}

// Format project link (ensure http/https)
export function formatLink(link) {
  if (!link) return "#";
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  return "https://" + link;
}

// Limit text length (useful for preview cards)
export function truncate(text, length = 100) {
  if (!text) return "";
  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
}

// Simple ID generator (for projects list)
export function generateId() {
  return Date.now() + Math.random().toString(16).slice(2);
}