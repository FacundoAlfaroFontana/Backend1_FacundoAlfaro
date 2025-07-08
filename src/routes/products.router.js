import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('src/productos.json');

// GET /api/products/
router.get('/', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts(limit);
  res.json(products);
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  const id = req.params.pid;
  const product = await productManager.getProductById(id);
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

// POST /api/products/
router.post('/', async (req, res) => {
  const newProduct = req.body;
  const result = await productManager.addProduct(newProduct);
  res.json(result);
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  const id = req.params.pid;
  const updateData = req.body;
  const result = await productManager.updateProduct(id, updateData);
  res.json(result);
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  const id = req.params.pid;
  const result = await productManager.deleteProduct(id);
  res.json(result);
});

export default router;
