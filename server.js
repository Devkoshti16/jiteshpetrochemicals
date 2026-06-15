import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'jitesh_secret_key_123';

// Default credentials
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jitesh@123';

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');

// Helper to read products from JSON file
const readProductsFile = () => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products file:', err);
    return [];
  }
};

// Helper to write products to JSON file
const writeProductsFile = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing products file:', err);
    return false;
  }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authentication token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

// Verify token validity
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

// --- PRODUCT CRUD ROUTES ---

// GET all products
app.get('/api/products', (req, res) => {
  const products = readProductsFile();
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const products = readProductsFile();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST create product
app.post('/api/products', authenticateToken, (req, res) => {
  const products = readProductsFile();
  const newProduct = req.body;

  // Simple ID generation if not provided
  if (!newProduct.id) {
    newProduct.id = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  // Check uniqueness of ID
  if (products.some(p => p.id === newProduct.id)) {
    return res.status(400).json({ message: `Product with ID "${newProduct.id}" already exists` });
  }

  products.push(newProduct);
  if (writeProductsFile(products)) {
    res.status(201).json(newProduct);
  } else {
    res.status(500).json({ message: 'Failed to save product database' });
  }
});

// PUT update product
app.put('/api/products/:id', authenticateToken, (req, res) => {
  const products = readProductsFile();
  const productId = req.params.id;
  const updatedProduct = req.body;

  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  // Update item (preserving id)
  products[index] = { ...products[index], ...updatedProduct, id: productId };

  if (writeProductsFile(products)) {
    res.json(products[index]);
  } else {
    res.status(500).json({ message: 'Failed to update product database' });
  }
});

// DELETE product
app.delete('/api/products/:id', authenticateToken, (req, res) => {
  const products = readProductsFile();
  const productId = req.params.id;

  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);

  if (writeProductsFile(products)) {
    res.json({ message: 'Product deleted successfully', product: deleted[0] });
  } else {
    res.status(500).json({ message: 'Failed to delete product from database' });
  }
});

app.listen(PORT, () => {
  console.log(`Local Express Server running on http://localhost:${PORT}`);
});
