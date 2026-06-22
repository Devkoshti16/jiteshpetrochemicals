// src/utils/api.js

// Base URL for backend API.
// On localhost → call Express server directly on port 5000
// On production → use the Vercel deployment URL
export const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://jiteshpetrochemicals.vercel.app';
