// ─────────────────────────────────────────────────────────────────────────────
// userUtils.js  –  Single source of truth for the logged-in user
// Place at: src/utils/userUtils.js
// ─────────────────────────────────────────────────────────────────────────────

// The real default avatar image — no SVG hack, no pravatar, no random photos
import defaultAvatar from "../assets/images/default/defaultUser.jpg";

export const DEFAULT_AVATAR = defaultAvatar;

function loadStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("qriblikUser")) || null;
  } catch {
    return null;
  }
}

const storedUser = loadStoredUser();

export const currentUser = {
  name:         storedUser?.name         || "Neighbor",
  firstName:    storedUser?.firstName    || "",
  lastName:     storedUser?.lastName     || "",
  email:        storedUser?.email        || "",
  neighborhood: storedUser?.neighborhood || "Your Neighborhood",
  city:         storedUser?.city         || "Your City",
  // Only use a stored avatar if the user explicitly uploaded one.
  // Otherwise show the neutral silhouette from assets.
  avatar: storedUser?.avatar ? storedUser.avatar : defaultAvatar,
};

export default currentUser;