import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'jitesh_petrochemicals';
const JWT_SECRET = process.env.JWT_SECRET || 'jitesh_secret_key_123';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

// Authenticate token helper
function authenticate(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new Error('Unauthorized');

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Forbidden');
  }
}

// Fallback to local JSON if MongoDB is not configured
function getLocalProducts() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
}

function formatProduct(raw) {
  let id = raw.id;
  if (!id) {
    id = raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  let category = raw.category || 'OZONE INDUSTRIAL';
  if (!category.startsWith('OZONE ')) {
    category = 'OZONE ' + category.toUpperCase();
  }
  return {
    id,
    name: raw.name,
    category,
    price: raw.price || 'Contact for Price',
    priceUnit: raw.priceUnit || '/ Bulk Inquiry',
    image: raw.image,
    description: raw.description || '',
    specs: raw.specs || [],
    features: raw.features || []
  };
}

function saveLocalProducts(products) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
}

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

  // Determine if using MongoDB or Fallback
  const useMongo = !!MONGODB_URI;

  try {
    let db;
    if (useMongo) {
      const conn = await connectToDatabase();
      db = conn.db;
    }

    if (method === 'GET') {
      const productId = req.query.id || req.params?.id;
      if (useMongo) {
        if (productId) {
          // Single product lookup
          const product = await db.collection('products').findOne({ id: productId });
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          return res.status(200).json(product);
        }
        const products = await db.collection('products').find({}).toArray();
        return res.status(200).json(products);
      } else {
        // Fallback to bundled JSON file
        const products = getLocalProducts();
        if (productId) {
          // Single product lookup
          const product = products.find(p => p.id === productId);
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          return res.status(200).json(product);
        }
        return res.status(200).json(products);
      }
    }

    // Write operations require Authentication
    let user;
    try {
      user = authenticate(req);
    } catch (err) {
      return res.status(err.message === 'Unauthorized' ? 401 : 403).json({ message: err.message });
    }

    if (method === 'POST') {
      const rawProduct = req.body;
      const formatted = formatProduct(rawProduct);

      if (useMongo) {
        // Check uniqueness
        const existing = await db.collection('products').findOne({ id: formatted.id });
        if (existing) {
          return res.status(400).json({ message: 'Product already exists' });
        }
        await db.collection('products').insertOne(formatted);
        return res.status(201).json(formatted);
      } else {
        const products = getLocalProducts();
        const existing = products.find(p => p.id === formatted.id);
        if (existing) {
          return res.status(400).json({ message: 'Product already exists' });
        }
        products.push(formatted);
        saveLocalProducts(products);
        return res.status(201).json(formatted);
      }
    }

    if (method === 'PUT') {
      // Find by id (not mongo _id) - use params.id as fallback since req.query can be null-prototype
      const productId = req.query.id || req.params?.id;
      const rawProduct = req.body;
      const formatted = formatProduct({ ...rawProduct, id: productId });
      console.log('PUT request for productId:', productId);

      if (useMongo) {
        const result = await db.collection('products').findOneAndUpdate(
          { id: productId },
          { $set: formatted },
          { returnDocument: 'after' }
        );
        if (!result) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(result);
      } else {
        const products = getLocalProducts();
        const index = products.findIndex(p => p.id === productId);
        console.log('Found index:', index, 'Sample product IDs:', products.slice(0, 3).map(p => p.id));
        if (index === -1) {
          return res.status(404).json({ message: 'Product not found' });
        }
        products[index] = formatted;
        saveLocalProducts(products);
        return res.status(200).json(products[index]);
      }
    }

    if (method === 'DELETE') {
      // use params.id as fallback since req.query can be null-prototype
      const productId = req.query.id || req.params?.id;
      console.log('DELETE request for productId:', productId);

      if (useMongo) {
        const result = await db.collection('products').deleteOne({ id: productId });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted' });
      } else {
        const products = getLocalProducts();
        const filtered = products.filter(p => p.id !== productId);
        console.log('Original count:', products.length, 'Filtered count:', filtered.length);
        if (filtered.length === products.length) {
          return res.status(404).json({ message: 'Product not found' });
        }
        saveLocalProducts(filtered);
        return res.status(200).json({ message: 'Product deleted' });
      }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
