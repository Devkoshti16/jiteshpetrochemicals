// server.js - Local Express server (wraps Vercel serverless handlers)
import express from 'express';
import cors from 'cors';
import authHandler from './api/auth.js';
import productsHandler from './api/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://jiteshpetrochemicals.vercel.app'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Wrap a Vercel-style handler for all methods + all sub-paths
function wrap(handler) {
  return (req, res) => handler(req, res);
}

// Auth routes: POST /api/auth/login  and  GET /api/auth/verify
// The handler checks req.method internally, so mount it on all HTTP verbs
app.all('/api/auth/login', wrap(authHandler));
app.all('/api/auth/verify', (req, res) => {
  // Map "verify" path to the handler (which uses GET = verify)
  req.method = 'GET';
  authHandler(req, res);
});

// Products routes: GET /api/products, POST /api/products, PUT /api/products/:id, DELETE /api/products/:id
app.all('/api/products', wrap(productsHandler));
app.all('/api/products/:id', (req, res) => {
  // Pass the id as a query param so the handler can read req.query.id
  req.query.id = req.params.id;
  productsHandler(req, res);
});

app.get('/', (req, res) => {
  res.send('Jitesh Petrochemicals API server is running ✓');
});

app.listen(PORT, () => {
  console.log(`✓ Server listening on http://localhost:${PORT}`);
});
