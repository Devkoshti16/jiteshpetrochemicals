import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jitesh_secret_key_123';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jitesh@123';

export default async function handler(req, res) {
  const { method } = req;

  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (method === 'POST') {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(200).json({ token, message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Handle GET for verification
  if (method === 'GET') {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ valid: false, message: 'Token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.status(200).json({ valid: true, username: decoded.username });
    } catch (err) {
      return res.status(403).json({ valid: false, message: 'Invalid token' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
