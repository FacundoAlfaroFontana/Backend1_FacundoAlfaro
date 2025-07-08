import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('src/carritos.json');

// POST /api/carts/ > Crea carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

// GET /api/carts/:cid > Trae carrito por ID
router.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);
  cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

// POST /api/carts/:cid/product/:pid > Agrega producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await cartManager.addProductToCart(cid, pid);
  res.json(result);
});

export default router;
