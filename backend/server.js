// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

const dataFile = path.join(__dirname, 'data.json');
// Initialize data file if not exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ products: [] }, null, 2));
}

function readData() {
  const raw = fs.readFileSync(dataFile);
  return JSON.parse(raw);
}
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Auth middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

// Routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Simple check – in real world validate against DB
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.get('/api/products', (req, res) => {
  const data = readData();
  res.json(data.products);
});

app.post('/api/products', verifyToken, (req, res) => {
  const data = readData();
  const product = { ...req.body, id: Date.now().toString() };
  data.products.push(product);
  writeData(data);
  res.status(201).json(product);
});

app.put('/api/products/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  data.products[index] = { ...data.products[index], ...req.body };
  writeData(data);
  res.json(data.products[index]);
});

app.delete('/api/products/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const data = readData();
  const newProducts = data.products.filter(p => p.id !== id);
  if (newProducts.length === data.products.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  data.products = newProducts;
  writeData(data);
  res.json({ message: 'Deleted' });
});

// Serve static frontend build
const clientDist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
